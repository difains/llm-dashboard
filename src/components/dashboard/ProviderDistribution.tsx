'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ProviderDistributionProps {
    data?: { name: string; value: number; color: string }[];
}

export function ProviderDistribution({ data }: ProviderDistributionProps) {
    if (!data || data.length === 0) return null;

    return (
        <div className="card h-[400px]">
            <h3 className="text-lg font-semibold text-white mb-6">서비스별 사용 비율</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#111827',
                                borderColor: '#374151',
                                borderRadius: '0.5rem'
                            }}
                            formatter={(value) => [`${value}회`, '요청 수']}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
