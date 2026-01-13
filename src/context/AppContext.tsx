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
        // Simple Validation
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
    // 실제 데이터 연동 전이므로 기본값(0) 반환
    const getDashboardData = (): DashboardData => {
        return {
            totalRequests: '0',
            totalTokens: '0',
            estimatedCost: '$0.00',
            keyCount: `${apiKeys.length} / 5`,
            usageHistory: [],
            providerDistribution: [],
            modelUsage: [],
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
