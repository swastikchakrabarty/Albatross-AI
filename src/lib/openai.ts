import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export interface Source {
    title: string;
    link: string;
    source: string;
    position: number;
    favicon?: string;
}

export interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
    sources?: Source[];
}

export const ai = new GoogleGenAI({ 
    apiKey: GEMINI_API_KEY 
});

export async function expandSearchQuery(rawQuery: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [{
                        text: `You are a search engine optimization backend utility. Your sole job is to take a conversational, messy user prompt and rewrite it into a highly efficient, concise string of keywords and search operators optimized for Google/SerpAPI.

Constraints:
1. Strip out conversational filler (e.g., "look up", "can you tell me", "what is", "search for").
2. Group exact phrases in quotes if necessary.
3. Output ONLY the optimized search string. Do not include any explanations, introduction, markdown, or punctuation outside the query itself.

User Prompt: "${rawQuery}"
Optimized Search Query:`
                    }]
                }
            ]
        });
        
        return response.text?.trim() || rawQuery;
    } catch (error) {
        console.error("Query expansion failed, falling back to raw query:", error);
        return rawQuery;
    }
}
