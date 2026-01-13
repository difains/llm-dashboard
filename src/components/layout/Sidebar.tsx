'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Key,
    BarChart3,
    Bell,
    Settings,
    Zap
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const navItems = [
    { href: '/', label: '대시보드', icon: LayoutDashboard },
    { href: '/analytics', label: '상세 분석', icon: BarChart3 },
    { href: '/keys', label: 'API 키 관리', icon: Key },
    { href: '/alerts', label: '알림 설정', icon: Bell },
    { href: '/settings', label: '설정', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { apiKeys } = useAppContext();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col z-20">
            {/* Logo */}
            <div className="p-6 border-b border-gray-800">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-white">LLM Dashboard</h1>
                        <p className="text-xs text-gray-400">Antigravity</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/30'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800">
                <div className="card-gradient text-center py-4">
                    <p className="text-xs text-gray-400 mb-2">현재 사용 중</p>
                    <p className="text-lg font-bold text-white">{apiKeys.length}개 API 연결</p>
                </div>
            </div>
        </aside>
    );
}
