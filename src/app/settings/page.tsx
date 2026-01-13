'use client';

import { useState } from 'react';
import { User, Moon, Globe, Shield, Save } from 'lucide-react';

export default function SettingsPage() {
    const [theme, setTheme] = useState('dark');
    const [language, setLanguage] = useState('ko');
    const [currency, setCurrency] = useState('USD');
    const [autoRefresh, setAutoRefresh] = useState(true);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">설정</h1>
                <p className="text-gray-400">대시보드 환경을 설정하세요</p>
            </div>

            {/* Profile */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-indigo-500/20">
                        <User className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">프로필</h2>
                </div>
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                        AG
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">Antigravity User</h3>
                        <p className="text-gray-400">user@antigravity.dev</p>
                    </div>
                </div>
            </div>

            {/* Appearance */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                        <Moon className="w-5 h-5 text-purple-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">외관</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <span className="text-white">테마</span>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="input w-40"
                        >
                            <option value="dark">다크 모드</option>
                            <option value="light">라이트 모드 (준비중)</option>
                            <option value="system">시스템 설정</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <span className="text-white">자동 새로고침</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={autoRefresh}
                                onChange={(e) => setAutoRefresh(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Regional */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-green-500/20">
                        <Globe className="w-5 h-5 text-green-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">지역 설정</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <label className="block text-gray-400 text-sm mb-2">언어</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="input"
                        >
                            <option value="ko">한국어</option>
                            <option value="en">English</option>
                            <option value="ja">日本語</option>
                        </select>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <label className="block text-gray-400 text-sm mb-2">통화</label>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="input"
                        >
                            <option value="USD">USD ($)</option>
                            <option value="KRW">KRW (₩)</option>
                            <option value="EUR">EUR (€)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Security */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-red-500/20">
                        <Shield className="w-5 h-5 text-red-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">보안</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div>
                            <p className="text-white font-medium">2단계 인증</p>
                            <p className="text-gray-400 text-sm">추가 보안을 위한 2FA 설정</p>
                        </div>
                        <button className="btn-secondary">설정</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div>
                            <p className="text-white font-medium">세션 관리</p>
                            <p className="text-gray-400 text-sm">활성 세션 확인 및 관리</p>
                        </div>
                        <button className="btn-secondary">관리</button>
                    </div>
                </div>
            </div>

            {/* Save */}
            <div className="flex justify-end">
                <button className="btn-primary flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    설정 저장
                </button>
            </div>
        </div>
    );
}
