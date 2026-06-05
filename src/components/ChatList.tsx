import { ChatMessage } from './ChatMessage';
import type { Message } from '@/lib/openai';

interface ChatListProps {
    messages: Message[];
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
    onSend?: (message: string) => void;
}

export function ChatList({ messages, messagesEndRef, onSend }: ChatListProps) {
    if (messages.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
                <div className="text-center space-y-4 max-w-xl w-full">
                    <h1 className="text-2xl md:text-3xl font-light tracking-widest text-foreground/80 uppercase">
                        What do you want to know?
                    </h1>
                    <p className="text-sm text-muted-foreground/60 tracking-wider font-light">
                        Search the web with AI-powered answers
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, index) => (
                <ChatMessage
                    key={index}
                    message={message}
                    isFirst={index === 0}
                    onRelatedSelect={onSend}
                />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

