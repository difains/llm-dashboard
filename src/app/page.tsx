import { Activity, Coins, Database, Key } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { UsageChart } from '@/components/dashboard/UsageChart';
import { ProviderDistribution } from '@/components/dashboard/ProviderDistribution';
import { ModelUsageChart } from '@/components/dashboard/ModelUsageChart';

export default function Dashboard() {
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
          value="12,453"
          change={12}
          changeLabel="전일 대비"
          icon={<Activity className="w-6 h-6 text-indigo-400" />}
          gradient
        />
        <StatCard
          title="총 토큰"
          value="3.47M"
          change={8}
          changeLabel="전일 대비"
          icon={<Database className="w-6 h-6 text-purple-400" />}
        />
        <StatCard
          title="예상 비용"
          value="$127.50"
          change={-5}
          changeLabel="전일 대비"
          icon={<Coins className="w-6 h-6 text-amber-400" />}
        />
        <StatCard
          title="활성 API 키"
          value="3 / 5"
          icon={<Key className="w-6 h-6 text-green-400" />}
          href="/keys"
        />
      </div>

      {/* Usage Chart */}
      <UsageChart title="일별 토큰 사용량 (최근 13일)" />

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProviderDistribution />
        <ModelUsageChart />
      </div>
    </div>
  );
}
