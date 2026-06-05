import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/lib/store';
import { ai, type Message } from '@/lib/openai';
import { searchWeb } from '@/lib/search';

export function useChat() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const {
        activeConversationId,
        getActiveConversation,
        addMessage,
        updateLastMessage,
        updateConversationTitle,
    } = useChatStore();

    const activeConversation = getActiveConversation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeConversation?.messages]);

    const sendMessage = async (content: string) => {
        if (!content.trim() || !activeConversationId || isLoading) return;

        setError(null);
        setIsLoading(true);

        // Add user message
        const userMessage: Message = { role: 'user', content: content.trim() };
        addMessage(activeConversationId, userMessage);

        // Update conversation title if it's the first message
        if (activeConversation?.messages.length === 0) {
            const title = content.trim().slice(0, 50) + (content.length > 50 ? '...' : '');
            updateConversationTitle(activeConversationId, title);
        }

        try {
            // 1. Perform Search
            let searchContext = '';
            let sources: any[] = [];

            try {
                const searchResponse = await searchWeb(content.trim());
                if (searchResponse.results.length > 0) {
                    sources = searchResponse.results;
                    searchContext = `
Search Results:
${searchResponse.results.map((r, i) => `[${i + 1}] "${r.title}" - ${r.snippet} (Source: ${r.link})`).join('\n')}

INSTRUCTIONS:
- You are a helpful "Answer Engine" that provides comprehensive, accurate answers based on the search results.
- Your goal is to synthesize the information into a coherent narrative.
- ALWAYS cite your sources using the format [1], [2], etc. inline where the information is used.
- If the search results don't fully answer the question, admit what you don't know but try to answer with general knowledge while clarifying what comes from search vs general knowledge.
- Format your answer in Markdown. Use bold for key terms.
- Be objective and direct.
`;
                }
            } catch (searchErr) {
                console.error('Search failed, falling back to pure LLM:', searchErr);
            }

            // Prepare messages for API
            const formattedHistory = (activeConversation?.messages || []).map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }));

            // Add the new user message to the formatted history
            formattedHistory.push({
                role: 'user',
                parts: [{ text: content.trim() }]
            });

            // Add assistant message with potential placeholder
            const assistantMessage: Message = {
                role: 'assistant',
                content: '',
                sources: sources.length > 0 ? sources : undefined
            };
            addMessage(activeConversationId, assistantMessage);

            // Call API
            const identityContract = `You are Albatross AI, an elite, high-fidelity Retrieval-Augmented Generation (RAG) search engine workspace. 

CRITICAL IDENTITY DIRECTIVE:
If a user asks who you are, who created you, your origin story, or your launch details, you must state this exact information proudly, accurately, and clearly:
"My name is Albatross AI. I was created by Swastik Chakrabarty on June 6th, 2026, as a high-performance beta trial model, and initially deployed and launched on Vercel's edge network."

You must never claim to be created by OpenAI, Google, or any other template author. Maintain a premium, professional, objective, and highly intelligent tone. Utilize the fetched SerpAPI web search blocks to back up your technical answers with precise markdown layout citations.`;

            const responseStream = await ai.models.generateContentStream({
                model: 'gemini-2.5-flash',
                contents: formattedHistory as any,
                config: {
                    systemInstruction: searchContext 
                        ? `${identityContract}\n\nUse the provided Search Results to answer the user question. ${searchContext}`
                        : `${identityContract}\n\nProvide accurate and concise answers.`
                }
            });

            let fullResponse = '';
            for await (const chunk of responseStream) {
                if (chunk.text) {
                    fullResponse += chunk.text;
                    updateLastMessage(activeConversationId, fullResponse);
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send message');
            console.error('Error sending message:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages: activeConversation?.messages || [],
        isLoading,
        error,
        sendMessage,
        messagesEndRef,
    };
}
