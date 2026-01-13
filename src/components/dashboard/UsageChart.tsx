'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const mockData = [
    { date: '1/1', tokens: 120000, cost: 2.4 },
    { date: '1/2', tokens: 180000, cost: 3.6 },
    { date: '1/3', tokens: 150000, cost: 3.0 },
    { date: '1/4', tokens: 220000, cost: 4.4 },
    { date: '1/5', tokens: 280000, cost: 5.6 },
    { date: '1/6', tokens: 250000, cost: 5.0 },
    { date: '1/7', tokens: 310000, cost: 6.2 },
    { date: '1/8', tokens: 290000, cost: 5.8 },
    { date: '1/9', tokens: 350000, cost: 7.0 },
    { date: '1/10', tokens: 420000, cost: 8.4 },
    { date: '1/11', tokens: 380000, cost: 7.6 },
    { date: '1/12', tokens: 450000, cost: 9.0 },
    { date: '1/13', tokens: 520000, cost: 10.4 },
];

interface UsageChartProps {
    title?: string;
}

export function UsageChart({ title = '일별 사용량 추이' }: UsageChartProps) {
    return (
        <div className="card">
            <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="tokenGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#6b7280"
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            axisLine={{ stroke: '#374151' }}
                        />
                        <YAxis
                            stroke="#6b7280"
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            axisLine={{ stroke: '#374151' }}
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#f9fafb',
                            }}
                            labelStyle={{ color: '#9ca3af' }}
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
                            fill="url(#tokenGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
