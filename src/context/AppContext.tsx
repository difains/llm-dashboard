'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- Types ---

export interface ApiKey {
    id: string;
    provider: 'openai' | 'anthropic' | 'google' | 'mistral' | 'cohere';
    name: string;
    maskedKey: string;
    status: 'connected' | 'error' | 'pending';
    lastChecked: string;
    addedAt: number;
}

export interface DashboardData {
    totalRequests: string;
    totalTokens: string;
    estimatedCost: string;
    keyCount: string;
    usageHistory: { name: string; tokens: number; cost: number }[];
    providerDistribution: { name: string; value: number; color: string }[];
    modelUsage: { name: string; tokens: number; cost: number; provider: string }[];
}

interface AppContextType {
    apiKeys: ApiKey[];
    addKey: (provider: string, key: string, name: string) => void;
    deleteKey: (id: string) => void;
    resetKeys: () => void;
    dashboardData: DashboardData;
    isLoading: boolean;
}

// --- Context ---

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedKeys = localStorage.getItem('llm_dashboard_keys');
        if (savedKeys) {
            try {
                setApiKeys(JSON.parse(savedKeys));
            } catch (e) {
                console.error('Failed to parse keys', e);
            }
        }
        setIsLoading(false);
    }, []);

    // Save to LocalStorage whenever keys change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('llm_dashboard_keys', JSON.stringify(apiKeys));
        }
    }, [apiKeys, isLoading]);

    const addKey = (provider: string, keyString: string, name: string) => {
        // Simple Validation Simulation
        let isValid = keyString.length > 5;
        if (provider === 'google' && !keyString.startsWith('AIza')) isValid = false;
        if (provider === 'openai' && !keyString.startsWith('sk-')) isValid = false;
        if (provider === 'anthropic' && !keyString.startsWith('sk-ant-')) isValid = false;

        const newKey: ApiKey = {
            id: Date.now().toString(),
            provider: provider as ApiKey['provider'],
            name: name || `${provider.charAt(0).toUpperCase() + provider.slice(1)} Key`,
            maskedKey: `${keyString.slice(0, 7)}****${keyString.slice(-4)}`,
            status: isValid ? 'connected' : 'error',
            lastChecked: '방금 전',
            addedAt: Date.now(),
        };
        setApiKeys((prev) => [...prev, newKey]);
    };

    const deleteKey = (id: string) => {
        setApiKeys((prev) => prev.filter((k) => k.id !== id));
    };

    const resetKeys = () => {
        setApiKeys([]);
        localStorage.removeItem('llm_dashboard_keys');
    };

    // --- Data Generation Logic ---
    // Generate mock data based on connected providers
    const getDashboardData = (): DashboardData => {
        if (apiKeys.length === 0) {
            return {
                totalRequests: '-',
                totalTokens: '-',
                estimatedCost: '-',
                keyCount: '0 / 5',
                usageHistory: [],
                providerDistribution: [],
                modelUsage: [],
            };
        }

        const providers = new Set(apiKeys.map(k => k.provider));
        let totalReq = 0;
        let totalTok = 0;
        let totalCost = 0;

        // Base stats per provider (Simulation)
        // If Google is connected, add Gemini stats
        // If OpenAI is connected, add GPT stats

        const history: { [date: string]: { tokens: number; cost: number } } = {};
        const models: { name: string; tokens: number; cost: number; provider: string }[] = [];
        const dist: { [provider: string]: number } = {};

        // Helper to add data
        const addData = (provider: string, modelName: string, reqs: number, toks: number, cost: number) => {
            totalReq += reqs;
            totalTok += toks;
            totalCost += cost;

            // Model usage
            models.push({ name: modelName, tokens: toks, cost, provider });

            // Distribution
            dist[provider] = (dist[provider] || 0) + reqs;

            // History (randomize over last 7 days)
            for (let i = 6; i >= 0; i--) {
                const day = new Date();
                day.setDate(day.getDate() - i);
                const dateStr = day.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });

                if (!history[dateStr]) history[dateStr] = { tokens: 0, cost: 0 };
                // Random daily fluctuation
                history[dateStr].tokens += toks / 7 * (0.8 + Math.random() * 0.4);
                history[dateStr].cost += cost / 7 * (0.8 + Math.random() * 0.4);
            }
        };

        if (providers.has('google')) {
            addData('Google AI', 'Gemini Pro', 5400, 1500000, 12.5); // Cheap
        }
        if (providers.has('openai')) {
            addData('OpenAI', 'GPT-4 Turbo', 1200, 800000, 45.0); // Expensive
            addData('OpenAI', 'GPT-3.5 Turbo', 8000, 2000000, 3.0);
        }
        if (providers.has('anthropic')) {
            addData('Anthropic', 'Claude 3 Opus', 500, 600000, 35.0);
            addData('Anthropic', 'Claude 3 Haiku', 3000, 1200000, 5.0);
        }

        // Others...

        // Format Data
        const usageHistory = Object.entries(history).map(([name, val]) => ({
            name,
            tokens: Math.round(val.tokens),
            cost: Number(val.cost.toFixed(2))
        }));

        const providerDistribution = Object.entries(dist).map(([name, val]) => {
            let color = '#94a3b8';
            if (name.includes('Google')) color = '#6366f1'; // Indigo
            if (name.includes('OpenAI')) color = '#22c55e'; // Green
            if (name.includes('Anthropic')) color = '#f59e0b'; // Amber
            return { name, value: val, color };
        });

        // Format Numbers
        const formatNum = (n: number) => n.toLocaleString();
        const formatTok = (n: number) => n > 1000000 ? `${(n / 1000000).toFixed(2)}M` : `${(n / 1000).toFixed(0)}K`;

        return {
            totalRequests: formatNum(totalReq),
            totalTokens: formatTok(totalTok),
            estimatedCost: `$${totalCost.toFixed(2)}`,
            keyCount: `${apiKeys.length} / 5`,
            usageHistory,
            providerDistribution,
            modelUsage: models,
        };
    };

    return (
        <AppContext.Provider value={{
            apiKeys,
            addKey,
            deleteKey,
            resetKeys,
            dashboardData: getDashboardData(),
            isLoading
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}
