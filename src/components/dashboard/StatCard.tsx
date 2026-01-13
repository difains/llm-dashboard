'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface StatCardProps {
    title: string;
    value: string;
    change?: number;
    changeLabel?: string;
    icon: ReactNode;
    gradient?: boolean;
    href?: string;
}

export function StatCard({ title, value, change, changeLabel, icon, gradient, href }: StatCardProps) {
    const getTrendIcon = () => {
        if (change === undefined) return null;
        if (change > 0) return <TrendingUp className="w-4 h-4" />;
        if (change < 0) return <TrendingDown className="w-4 h-4" />;
        return <Minus className="w-4 h-4" />;
    };

    const getTrendColor = () => {
        if (change === undefined) return 'text-gray-400';
        if (change > 0) return 'text-green-400';
        if (change < 0) return 'text-red-400';
        return 'text-gray-400';
    };

    const Content = (
        <div className={`${gradient ? 'card-gradient' : 'card'} group hover:border-indigo-500/50 transition-all duration-300 h-full`}>
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                {change !== undefined && (
                    <div className={`flex items-center gap-1 ${getTrendColor()}`}>
                        {getTrendIcon()}
                        <span className="text-sm font-medium">{Math.abs(change)}%</span>
                    </div>
                )}
                {href && !change && (
                    <span className="text-xs text-indigo-400 font-medium group-hover:underline">관리 &rarr;</span>
                )}
            </div>
            <div>
                <p className="text-sm text-gray-400 mb-1">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
                {changeLabel && (
                    <p className="text-xs text-gray-500 mt-1">{changeLabel}</p>
                )}
            </div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block h-full">
                {Content}
            </Link>
        );
    }

    return Content;
}
