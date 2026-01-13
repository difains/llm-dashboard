'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
    { model: 'GPT-5.2', tokens: 1200000, color: '#22c55e' },
    { model: 'Claude Sonnet 4.5', tokens: 850000, color: '#f59e0b' },
    { model: 'Gemini 3 Pro', tokens: 620000, color: '#6366f1' },
    { model: 'GPT-5 mini', tokens: 480000, color: '#22c55e' },
    { model: 'Claude Haiku 4.5', tokens: 320000, color: '#f59e0b' },
];

interface ModelUsageChartProps {
    title?: string;
}

export function ModelUsageChart({ title = '모델별 사용량' }: ModelUsageChartProps) {
    return (
        <div className="card">
            <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={mockData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={true} vertical={false} />
                        <XAxis
                            type="number"
                            stroke="#6b7280"
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                        />
                        <YAxis
                            type="category"
                            dataKey="model"
                            stroke="#6b7280"
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            width={95}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#f9fafb',
                            }}
                            formatter={(value) => [`${(Number(value) / 1000000).toFixed(2)}M 토큰`, '사용량']}
                        />
                        <Bar
                            dataKey="tokens"
                            radius={[0, 4, 4, 0]}
                            fill="#6366f1"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
