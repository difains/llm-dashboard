'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const mockData = [
    { name: 'OpenAI', value: 45, color: '#22c55e' },
    { name: 'Anthropic', value: 35, color: '#f59e0b' },
    { name: 'Google AI', value: 20, color: '#6366f1' },
];

interface ProviderDistributionProps {
    title?: string;
}

export function ProviderDistribution({ title = '서비스별 사용 비율' }: ProviderDistributionProps) {
    return (
        <div className="card">
            <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
            <div className="flex items-center gap-6">
                <div className="w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={mockData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={4}
                                dataKey="value"
                            >
                                {mockData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        stroke="transparent"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: '1px solid #374151',
                                    borderRadius: '8px',
                                    color: '#f9fafb',
                                }}
                                formatter={(value: number) => [`${value}%`, '사용 비율']}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3">
                    {mockData.map((provider) => (
                        <div key={provider.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: provider.color }}
                                />
                                <span className="text-gray-300">{provider.name}</span>
                            </div>
                            <span className="text-white font-semibold">{provider.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
