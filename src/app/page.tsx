'use client';

import { Activity, Coins, Database, Key, Plus } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { UsageChart } from '@/components/dashboard/UsageChart';
import { ProviderDistribution } from '@/components/dashboard/ProviderDistribution';
import { ModelUsageChart } from '@/components/dashboard/ModelUsageChart';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';

export default function Dashboard() {
  const { apiKeys, dashboardData, isLoading } = useAppContext();

  if (isLoading) return null; // Or skeleton

  if (apiKeys.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6">
          <Activity className="w-10 h-10 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">대시보드 시작하기</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          LLM API 키를 등록하면 실시간 사용량과 비용 분석 데이터를<br />
          이 곳에서 한눈에 확인하실 수 있습니다.
        </p>
        <Link href="/keys" className="btn-primary flex items-center gap-2 text-lg px-8 py-3">
          <Plus className="w-5 h-5" />
          첫 번째 API 키 등록
        </Link>
      </div>
    );
  }

  // Parse values for trend calculation (simulated)
  // In a real app, we would calculate this based on historical data

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">대시보드</h1>
        <p className="text-gray-400">LLM API 사용량 및 비용을 한눈에 확인하세요</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="총 요청 수"
          value={dashboardData.totalRequests}
          change={12}
          changeLabel="전일 대비"
          icon={<Activity className="w-6 h-6 text-indigo-400" />}
          gradient
        />
        <StatCard
          title="총 토큰"
          value={dashboardData.totalTokens}
          change={8}
          changeLabel="전일 대비"
          icon={<Database className="w-6 h-6 text-purple-400" />}
        />
        <StatCard
          title="예상 비용"
          value={dashboardData.estimatedCost}
          change={-5}
          changeLabel="전일 대비"
          icon={<Coins className="w-6 h-6 text-amber-400" />}
        />
        <StatCard
          title="활성 API 키"
          value={dashboardData.keyCount}
          icon={<Key className="w-6 h-6 text-green-400" />}
          href="/keys"
        />
      </div>

      {/* Usage Chart */}
      <UsageChart
        title="일별 토큰 사용량 (최근 7일)"
        data={dashboardData.usageHistory}
      />

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProviderDistribution data={dashboardData.providerDistribution} />
        <ModelUsageChart data={dashboardData.modelUsage} />
      </div>
    </div>
  );
}
