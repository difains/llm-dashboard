'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ModelUsageChartProps {
    data?: { name: string; tokens: number; cost: number; provider: string }[];
}

export function ModelUsageChart({ data }: ModelUsageChartProps) {
    if (!data || data.length === 0) return null;

    return (
        <div className="card h-[400px]">
            <h3 className="text-lg font-semibold text-white mb-6">모델별 사용량</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#1f2937" />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            width={100}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: '#1f2937' }}
                            contentStyle={{
                                backgroundColor: '#111827',
                                borderColor: '#374151',
                                borderRadius: '0.5rem'
                            }}
                            formatter={(value) => [`${(Number(value) / 1000).toFixed(1)}K 토큰`, '사용량']}
                        />
                        <Bar dataKey="tokens" radius={[0, 4, 4, 0]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        entry.provider.includes('Google') ? '#6366f1' :
                                            entry.provider.includes('OpenAI') ? '#22c55e' :
                                                entry.provider.includes('Anthropic') ? '#f59e0b' : '#3b82f6'
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
