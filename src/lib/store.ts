import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message } from './openai';

export interface User {
    id: string;
    email: string;
}

export interface Conversation {
    id: string;
    userId?: string;
    title: string;
    messages: Message[];
    createdAt: number;
    updatedAt: number;
}

interface ChatStore {
    // Auth State
    user: User | null;
    isAuthenticated: boolean;
    authLoading: boolean;

    // Chat State
    conversations: Conversation[];
    activeConversationId: string | null;

    // Auth Actions
    loginManual: (email: string, passwordHash: string) => boolean;
    signUpManual: (email: string, passwordHash: string) => boolean;
    logoutManual: () => void;

    // Chat Actions
    createConversation: () => string;
    deleteConversation: (id: string) => void;
    setActiveConversation: (id: string) => void;
    addMessage: (conversationId: string, message: Message) => void;
    updateLastMessage: (conversationId: string, updates: string | Partial<Message>) => void;
    updateConversationTitle: (conversationId: string, title: string) => void;
    getActiveConversation: () => Conversation | null;
    getUserConversations: () => Conversation[];
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            // Initial Auth State
            user: null,
            isAuthenticated: false,
            authLoading: false,

            // Initial Chat State
            conversations: [],
            activeConversationId: null,

            // Auth Actions
            loginManual: (email, passwordHash) => {
                try {
                    const usersJson = localStorage.getItem('local_users');
                    const users = usersJson ? JSON.parse(usersJson) : [];
                    const user = users.find((u: any) => u.email === email && u.passwordHash === passwordHash);
                    
                    if (user) {
                        set({ user: { id: user.id, email: user.email }, isAuthenticated: true, activeConversationId: null });
                        return true;
                    }
                    return false;
                } catch (e) {
                    console.error("Login failed", e);
                    return false;
                }
            },

            signUpManual: (email, passwordHash) => {
                try {
                    const usersJson = localStorage.getItem('local_users');
                    const users = usersJson ? JSON.parse(usersJson) : [];
                    
                    if (users.find((u: any) => u.email === email)) {
                        return false; // Email already exists
                    }
                    
                    const newUser = { id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, email, passwordHash };
                    users.push(newUser);
                    localStorage.setItem('local_users', JSON.stringify(users));
                    
                    set({ user: { id: newUser.id, email: newUser.email }, isAuthenticated: true, activeConversationId: null });
                    return true;
                } catch (e) {
                    console.error("Signup failed", e);
                    return false;
                }
            },

            logoutManual: () => {
                set({ user: null, isAuthenticated: false, activeConversationId: null });
            },

            // Chat Actions
            createConversation: () => {
                const currentUser = get().user;
                const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                const newConversation: Conversation = {
                    id,
                    userId: currentUser?.id,
                    title: 'New Chat',
                    messages: [],
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                };

                set((state) => ({
                    conversations: [newConversation, ...state.conversations],
                    activeConversationId: id,
                }));

                return id;
            },

            deleteConversation: (id) => {
                set((state) => {
                    const newConversations = state.conversations.filter((c) => c.id !== id);
                    const userConversations = newConversations.filter(c => c.userId === state.user?.id);
                    const newActiveId = state.activeConversationId === id
                        ? (userConversations[0]?.id || null)
                        : state.activeConversationId;

                    return {
                        conversations: newConversations,
                        activeConversationId: newActiveId,
                    };
                });
            },

            setActiveConversation: (id) => {
                set({ activeConversationId: id });
            },

            addMessage: (conversationId, message) => {
                set((state) => ({
                    conversations: state.conversations.map((conv) =>
                        conv.id === conversationId
                            ? {
                                ...conv,
                                messages: [...conv.messages, message],
                                updatedAt: Date.now(),
                            }
                            : conv
                    ),
                }));
            },

            updateLastMessage: (conversationId, updates) => {
                set((state) => ({
                    conversations: state.conversations.map((conv) =>
                        conv.id === conversationId
                            ? {
                                ...conv,
                                messages: conv.messages.map((msg, idx) =>
                                    idx === conv.messages.length - 1
                                        ? { ...msg, ...(typeof updates === 'string' ? { content: updates } : updates) }
                                        : msg
                                ),
                                updatedAt: Date.now(),
                            }
                            : conv
                    ),
                }));
            },

            updateConversationTitle: (conversationId, title) => {
                set((state) => ({
                    conversations: state.conversations.map((conv) =>
                        conv.id === conversationId
                            ? { ...conv, title, updatedAt: Date.now() }
                            : conv
                    ),
                }));
            },

            getActiveConversation: () => {
                const state = get();
                return state.conversations.find((c) => c.id === state.activeConversationId) || null;
            },
            
            getUserConversations: () => {
                const state = get();
                if (!state.user) return [];
                return state.conversations.filter(c => c.userId === state.user?.id).sort((a, b) => b.updatedAt - a.updatedAt);
            }
        }),
        {
            name: 'chat-storage',
            partialize: (state) => ({ 
                conversations: state.conversations,
                activeConversationId: state.activeConversationId,
                user: state.user,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);
