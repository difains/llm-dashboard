'use client';

import { useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend
} from 'recharts';
import { Calendar, TrendingUp, DollarSign, Clock } from 'lucide-react';

const dailyData = [
    { date: '1/1', openai: 80000, anthropic: 45000, google: 25000 },
    { date: '1/2', openai: 120000, anthropic: 55000, google: 30000 },
    { date: '1/3', openai: 95000, anthropic: 60000, google: 28000 },
    { date: '1/4', openai: 140000, anthropic: 70000, google: 35000 },
    { date: '1/5', openai: 180000, anthropic: 85000, google: 42000 },
    { date: '1/6', openai: 160000, anthropic: 75000, google: 38000 },
    { date: '1/7', openai: 200000, anthropic: 95000, google: 50000 },
];

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}시`,
    requests: Math.floor(Math.random() * 500) + 100,
    tokens: Math.floor(Math.random() * 50000) + 10000,
}));

const modelData = [
    { model: 'GPT-5.2', input: 800000, output: 400000, cost: 15.40 },
    { model: 'GPT-5 mini', input: 300000, output: 180000, cost: 0.85 },
    { model: 'Claude Sonnet 4.5', input: 450000, output: 220000, cost: 4.65 },
    { model: 'Claude Haiku 4.5', input: 200000, output: 120000, cost: 0.80 },
    { model: 'Gemini 3 Pro', input: 350000, output: 150000, cost: 2.50 },
];

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState('7d');

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">상세 분석</h1>
                    <p className="text-gray-400">기간별, 모델별 사용량을 상세히 분석합니다</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                    {['24h', '7d', '30d', '90d'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setDateRange(range)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${dateRange === range
                                ? 'bg-indigo-500 text-white'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {range === '24h' ? '24시간' : range === '7d' ? '7일' : range === '30d' ? '30일' : '90일'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card">
                    <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-indigo-400" />
                        <span className="text-gray-400">기간</span>
                    </div>
                    <p className="text-xl font-bold text-white">2026.01.07 - 01.13</p>
                </div>
                <div className="card">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <span className="text-gray-400">총 요청</span>
                    </div>
                    <p className="text-xl font-bold text-white">87,245</p>
                </div>
                <div className="card">
                    <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-purple-400" />
                        <span className="text-gray-400">총 토큰</span>
                    </div>
                    <p className="text-xl font-bold text-white">24.7M</p>
                </div>
                <div className="card">
                    <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-5 h-5 text-amber-400" />
                        <span className="text-gray-400">총 비용</span>
                    </div>
                    <p className="text-xl font-bold text-white">$892.45</p>
                </div>
            </div>

            {/* Provider Comparison Chart */}
            <div className="card">
                <h3 className="text-lg font-semibold text-white mb-6">서비스별 일별 사용량</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dailyData}>
                            <defs>
                                <linearGradient id="openaiGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="anthropicGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="googleGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                            <XAxis dataKey="date" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                                formatter={(value) => [`${(Number(value) / 1000).toFixed(1)}K`, '']}
                            />
                            <Legend />
                            <Area type="monotone" dataKey="openai" name="OpenAI" stroke="#22c55e" fill="url(#openaiGrad)" />
                            <Area type="monotone" dataKey="anthropic" name="Anthropic" stroke="#f59e0b" fill="url(#anthropicGrad)" />
                            <Area type="monotone" dataKey="google" name="Google AI" stroke="#6366f1" fill="url(#googleGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Model Breakdown Table */}
            <div className="card">
                <h3 className="text-lg font-semibold text-white mb-6">모델별 상세 사용량</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">모델</th>
                                <th className="text-right py-3 px-4 text-gray-400 font-medium">Input 토큰</th>
                                <th className="text-right py-3 px-4 text-gray-400 font-medium">Output 토큰</th>
                                <th className="text-right py-3 px-4 text-gray-400 font-medium">총 토큰</th>
                                <th className="text-right py-3 px-4 text-gray-400 font-medium">비용</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modelData.map((row) => (
                                <tr key={row.model} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                                    <td className="py-4 px-4 text-white font-medium">{row.model}</td>
                                    <td className="py-4 px-4 text-right text-gray-300">{(row.input / 1000).toFixed(1)}K</td>
                                    <td className="py-4 px-4 text-right text-gray-300">{(row.output / 1000).toFixed(1)}K</td>
                                    <td className="py-4 px-4 text-right text-gray-300">{((row.input + row.output) / 1000).toFixed(1)}K</td>
                                    <td className="py-4 px-4 text-right text-green-400 font-semibold">${row.cost.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-800/30">
                                <td className="py-4 px-4 text-white font-bold">합계</td>
                                <td className="py-4 px-4 text-right text-white font-bold">2.1M</td>
                                <td className="py-4 px-4 text-right text-white font-bold">1.07M</td>
                                <td className="py-4 px-4 text-right text-white font-bold">3.17M</td>
                                <td className="py-4 px-4 text-right text-green-400 font-bold">$24.20</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
