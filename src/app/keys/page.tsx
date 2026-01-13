'use client';

import { useState } from 'react';
import { Plus, Trash2, RefreshCw, Eye, EyeOff, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface ApiKey {
    id: string;
    provider: 'openai' | 'anthropic' | 'google' | 'mistral' | 'cohere';
    name: string;
    maskedKey: string;
    status: 'connected' | 'error' | 'pending';
    lastChecked: string;
}

const providerInfo = {
    openai: { name: 'OpenAI', color: '#22c55e', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30' },
    anthropic: { name: 'Anthropic', color: '#f59e0b', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/30' },
    google: { name: 'Google AI', color: '#6366f1', bgColor: 'bg-indigo-500/10', borderColor: 'border-indigo-500/30' },
    mistral: { name: 'Mistral AI', color: '#ec4899', bgColor: 'bg-pink-500/10', borderColor: 'border-pink-500/30' },
    cohere: { name: 'Cohere', color: '#06b6d4', bgColor: 'bg-cyan-500/10', borderColor: 'border-cyan-500/30' },
};

const mockKeys: ApiKey[] = [
    { id: '1', provider: 'openai', name: 'Production Key', maskedKey: 'sk-****************************7x2n', status: 'connected', lastChecked: '2분 전' },
    { id: '2', provider: 'anthropic', name: 'Claude API', maskedKey: 'sk-ant-**********************3kf8', status: 'connected', lastChecked: '5분 전' },
    { id: '3', provider: 'google', name: 'Gemini Key', maskedKey: 'AIza****************************Xk9', status: 'error', lastChecked: '1시간 전' },
];

interface ApiKeyCardProps {
    apiKey: ApiKey;
    onDelete: (id: string) => void;
    onTest: (id: string) => void;
}

function ApiKeyCard({ apiKey, onDelete, onTest }: ApiKeyCardProps) {
    const [showKey, setShowKey] = useState(false);
    const provider = providerInfo[apiKey.provider];

    const getStatusIcon = () => {
        switch (apiKey.status) {
            case 'connected':
                return <CheckCircle2 className="w-4 h-4 text-green-400" />;
            case 'error':
                return <XCircle className="w-4 h-4 text-red-400" />;
            case 'pending':
                return <AlertCircle className="w-4 h-4 text-yellow-400" />;
        }
    };

    const getStatusText = () => {
        switch (apiKey.status) {
            case 'connected':
                return '연결됨';
            case 'error':
                return '오류';
            case 'pending':
                return '대기 중';
        }
    };

    return (
        <div className={`card ${provider.bgColor} ${provider.borderColor} border hover:border-opacity-60 transition-all duration-300`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
                        style={{ backgroundColor: `${provider.color}20`, color: provider.color }}
                    >
                        {provider.name.slice(0, 2)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">{provider.name}</h3>
                        <p className="text-sm text-gray-400">{apiKey.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {getStatusIcon()}
                    <span className={`text-sm ${apiKey.status === 'connected' ? 'text-green-400' : apiKey.status === 'error' ? 'text-red-400' : 'text-yellow-400'}`}>
                        {getStatusText()}
                    </span>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-4 py-3">
                    <code className="flex-1 text-sm text-gray-300 font-mono">
                        {showKey ? 'sk-proj-abcdefg1234567890...' : apiKey.maskedKey}
                    </code>
                    <button
                        onClick={() => setShowKey(!showKey)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">마지막 확인: {apiKey.lastChecked}</p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onTest(apiKey.id)}
                    className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm"
                >
                    <RefreshCw className="w-4 h-4" />
                    연결 테스트
                </button>
                <button
                    onClick={() => onDelete(apiKey.id)}
                    className="btn-secondary px-4 text-red-400 hover:bg-red-500/10 hover:border-red-500/30"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

interface AddKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (provider: string, key: string, name: string) => void;
}

function AddKeyModal({ isOpen, onClose, onAdd }: AddKeyModalProps) {
    const [provider, setProvider] = useState('openai');
    const [apiKey, setApiKey] = useState('');
    const [name, setName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(provider, apiKey, name);
        setApiKey('');
        setName('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="card w-full max-w-md mx-4 animate-fade-in">
                <h2 className="text-xl font-bold text-white mb-6">새 API 키 등록</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">서비스 선택</label>
                        <select
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                            className="input"
                        >
                            {Object.entries(providerInfo).map(([key, info]) => (
                                <option key={key} value={key}>{info.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">별칭 (선택)</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="예: Production Key"
                            className="input"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">API 키</label>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="sk-..."
                            className="input"
                            required
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="btn-secondary flex-1">
                            취소
                        </button>
                        <button type="submit" className="btn-primary flex-1">
                            등록하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function KeysPage() {
    const [keys, setKeys] = useState<ApiKey[]>(mockKeys);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (id: string) => {
        if (confirm('정말로 이 API 키를 삭제하시겠습니까?')) {
            setKeys(keys.filter(key => key.id !== id));
        }
    };

    const handleTest = (id: string) => {
        // TODO: Implement actual connection test
        alert('연결 테스트 중...');
    };

    const handleAdd = (provider: string, apiKey: string, name: string) => {
        const newKey: ApiKey = {
            id: Date.now().toString(),
            provider: provider as ApiKey['provider'],
            name: name || 'New Key',
            maskedKey: `${apiKey.slice(0, 7)}****${apiKey.slice(-4)}`,
            status: 'pending',
            lastChecked: '방금 전',
        };
        setKeys([...keys, newKey]);
    };

    const handleResetAll = () => {
        if (confirm('⚠️ 모든 API 키와 사용량 데이터가 삭제됩니다. 계속하시겠습니까?')) {
            setKeys([]);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">API 키 관리</h1>
                    <p className="text-gray-400">LLM 서비스 API 키를 등록하고 관리하세요</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleResetAll} className="btn-secondary text-red-400 hover:bg-red-500/10">
                        모든 데이터 초기화
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        새 API 키 등록
                    </button>
                </div>
            </div>

            {/* Keys Grid */}
            {keys.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {keys.map((key) => (
                        <ApiKeyCard
                            key={key.id}
                            apiKey={key}
                            onDelete={handleDelete}
                            onTest={handleTest}
                        />
                    ))}
                </div>
            ) : (
                <div className="card text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">등록된 API 키가 없습니다</h3>
                    <p className="text-gray-400 mb-6">새 API 키를 등록하여 사용량 추적을 시작하세요</p>
                    <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                        첫 번째 API 키 등록하기
                    </button>
                </div>
            )}

            {/* Add Key Modal */}
            <AddKeyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAdd}
            />
        </div>
    );
}
