'use client';

import { useState } from 'react';
import { Calendar, Filter, Download } from 'lucide-react';
import { UsageChart } from '@/components/dashboard/UsageChart';
import { ModelUsageChart } from '@/components/dashboard/ModelUsageChart';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';

export default function AnalyticsPage() {
    const { apiKeys, dashboardData } = useAppContext();
    const [dateRange, setDateRange] = useState('7d');

    if (apiKeys.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-2">데이터가 없습니다</h2>
                <p className="text-gray-400 mb-6">
                    상세 분석을 보려면 API 키를 먼저 등록해주세요.
                </p>
                <Link href="/keys" className="btn-primary">
                    API 키 등록하러 가기
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">상세 분석</h1>
                    <p className="text-gray-400">모델별, 서비스별 심층 분석 데이터</p>
                </div>

                <div className="flex gap-3">
                    <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-800">
                        {['24h', '7d', '30d'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setDateRange(range)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${dateRange === range
                                        ? 'bg-indigo-500/20 text-indigo-400 shadow-sm'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {range === '24h' ? '24시간' : range === '7d' ? '7일' : '30일'}
                            </button>
                        ))}
                    </div>

                    <button className="btn-secondary flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>날짜 선택</span>
                    </button>

                    <button className="btn-secondary flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        <span>필터</span>
                    </button>

                    <button className="btn-secondary flex items-center gap-2 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/10">
                        <Download className="w-4 h-4" />
                        <span>내보내기</span>
                    </button>
                </div>
            </div>

            {/* Main Charts */}
            <UsageChart
                title="통합 토큰 사용량 추이"
                data={dashboardData.usageHistory}
            />

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Cost Analysis - Reusing ModelUsageChart for demo */}
                <div className="card h-[400px]">
                    <h3 className="text-lg font-semibold text-white mb-6">비용 효율성 분석</h3>
                    <div className="h-[300px] w-full flex items-center justify-center text-gray-500">
                        <p>비용 분석 차트 (활성화된 키 데이터 기반)</p>
                    </div>
                </div>

                <ModelUsageChart data={dashboardData.modelUsage} />
            </div>

            {/* Detailed Table */}
            <div className="card overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">모델별 상세 지표</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-sm">
                                <th className="py-3 px-4">모델명</th>
                                <th className="py-3 px-4">제공사</th>
                                <th className="py-3 px-4 text-right">총 요청</th>
                                <th className="py-3 px-4 text-right">평균 토큰</th>
                                <th className="py-3 px-4 text-right">비용 ($)</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-300">
                            {dashboardData.modelUsage.map((model, idx) => (
                                <tr key={idx} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                                    <td className="py-3 px-4 font-medium text-white">{model.name}</td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium 
                                            ${model.provider === 'OpenAI' ? 'bg-green-500/10 text-green-400' :
                                                model.provider === 'Google AI' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                            {model.provider}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">{Math.floor(model.tokens / 500).toLocaleString()}</td>
                                    <td className="py-3 px-4 text-right">~500</td>
                                    <td className="py-3 px-4 text-right font-medium text-white">${model.cost.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
