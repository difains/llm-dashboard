'use client';

import { useState } from 'react';
import { Bell, Mail, MessageSquare, Webhook, Save, Plus, Trash2 } from 'lucide-react';

interface BudgetAlert {
    id: string;
    type: 'daily' | 'weekly' | 'monthly';
    threshold: number;
    enabled: boolean;
}

const initialAlerts: BudgetAlert[] = [
    { id: '1', type: 'daily', threshold: 50, enabled: true },
    { id: '2', type: 'monthly', threshold: 500, enabled: true },
];

export default function AlertsPage() {
    const [alerts, setAlerts] = useState<BudgetAlert[]>(initialAlerts);
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [slackEnabled, setSlackEnabled] = useState(false);
    const [webhookEnabled, setWebhookEnabled] = useState(false);
    const [webhookUrl, setWebhookUrl] = useState('');
    const [email, setEmail] = useState('user@example.com');

    const addAlert = () => {
        const newAlert: BudgetAlert = {
            id: Date.now().toString(),
            type: 'daily',
            threshold: 100,
            enabled: true,
        };
        setAlerts([...alerts, newAlert]);
    };

    const removeAlert = (id: string) => {
        setAlerts(alerts.filter(a => a.id !== id));
    };

    const updateAlert = (id: string, updates: Partial<BudgetAlert>) => {
        setAlerts(alerts.map(a => a.id === id ? { ...a, ...updates } : a));
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'daily': return '일일';
            case 'weekly': return '주간';
            case 'monthly': return '월간';
            default: return type;
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">알림 설정</h1>
                <p className="text-gray-400">예산 임계치 도달 시 알림을 받으세요</p>
            </div>

            {/* Budget Alerts */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/20">
                            <Bell className="w-5 h-5 text-amber-400" />
                        </div>
                        <h2 className="text-lg font-semibold text-white">예산 알림</h2>
                    </div>
                    <button onClick={addAlert} className="btn-secondary flex items-center gap-2 text-sm">
                        <Plus className="w-4 h-4" />
                        알림 추가
                    </button>
                </div>

                <div className="space-y-4">
                    {alerts.map((alert) => (
                        <div key={alert.id} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={alert.enabled}
                                    onChange={(e) => updateAlert(alert.id, { enabled: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                            </label>

                            <select
                                value={alert.type}
                                onChange={(e) => updateAlert(alert.id, { type: e.target.value as BudgetAlert['type'] })}
                                className="input w-32"
                            >
                                <option value="daily">일일</option>
                                <option value="weekly">주간</option>
                                <option value="monthly">월간</option>
                            </select>

                            <span className="text-gray-400">예산이</span>

                            <div className="flex items-center gap-1">
                                <span className="text-gray-400">$</span>
                                <input
                                    type="number"
                                    value={alert.threshold}
                                    onChange={(e) => updateAlert(alert.id, { threshold: Number(e.target.value) })}
                                    className="input w-24"
                                />
                            </div>

                            <span className="text-gray-400">초과 시 알림</span>

                            <button
                                onClick={() => removeAlert(alert.id)}
                                className="ml-auto text-red-400 hover:text-red-300 p-2"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}

                    {alerts.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            설정된 알림이 없습니다
                        </div>
                    )}
                </div>
            </div>

            {/* Notification Channels */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-indigo-500/20">
                        <MessageSquare className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">알림 채널</h2>
                </div>

                <div className="space-y-6">
                    {/* Email */}
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <span className="text-white font-medium">이메일</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={emailEnabled}
                                    onChange={(e) => setEmailEnabled(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                            </label>
                        </div>
                        {emailEnabled && (
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="알림 받을 이메일 주소"
                                className="input"
                            />
                        )}
                    </div>

                    {/* Slack */}
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="w-5 h-5 text-gray-400" />
                                <span className="text-white font-medium">Slack</span>
                                <span className="badge badge-warning">Coming Soon</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={slackEnabled}
                                    onChange={(e) => setSlackEnabled(e.target.checked)}
                                    disabled
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-600 rounded-full peer opacity-50 cursor-not-allowed"></div>
                            </label>
                        </div>
                    </div>

                    {/* Webhook */}
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Webhook className="w-5 h-5 text-gray-400" />
                                <span className="text-white font-medium">Webhook</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={webhookEnabled}
                                    onChange={(e) => setWebhookEnabled(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                            </label>
                        </div>
                        {webhookEnabled && (
                            <input
                                type="url"
                                value={webhookUrl}
                                onChange={(e) => setWebhookUrl(e.target.value)}
                                placeholder="https://your-webhook-url.com/alerts"
                                className="input"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button className="btn-primary flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    설정 저장
                </button>
            </div>
        </div>
    );
}
