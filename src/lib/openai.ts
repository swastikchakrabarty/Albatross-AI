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
