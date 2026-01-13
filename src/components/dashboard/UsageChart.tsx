'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UsageChartProps {
    title: string;
    data?: { name: string; tokens: number; cost: number }[];
}

export function UsageChart({ title, data }: UsageChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="card h-[400px] flex items-center justify-center">
                <p className="text-gray-500">데이터가 없습니다</p>
            </div>
        );
    }

    return (
        <div className="card animate-fade-in-up">
            <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#9ca3af"
                            tick={{ fill: '#9ca3af' }}
                            axisLine={false}
                            tickLine={false}
                            tickMargin={10}
                        />
                        <YAxis
                            stroke="#9ca3af"
                            tick={{ fill: '#9ca3af' }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `${value / 1000}K`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#111827',
                                borderColor: '#374151',
                                borderRadius: '0.5rem',
                                color: '#f3f4f6'
                            }}
                            itemStyle={{ color: '#e5e7eb' }}
                            formatter={(value) => [
                                `${(Number(value) / 1000).toFixed(1)}K 토큰`,
                                '토큰 사용량'
                            ]}
                        />
                        <Area
                            type="monotone"
                            dataKey="tokens"
                            stroke="#6366f1"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorTokens)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
