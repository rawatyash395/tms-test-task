import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { createGraphQLClient } from "../lib/graphql-client";
import { SYSTEM_STATS_QUERY } from "../graphql/queries";
import { Activity, TrendingUp, Users, Package } from "lucide-react";

const COLORS = ["#14b8a6", "#3b82f6", "#f59e0b", "#ef4444", "#6366f1"];

const generateHistoricalData = (total: number) => {
  const data = [];
  const baseValue = Math.floor(total / 10) || 5;
  for (let i = 0; i < 7; i++) {
    data.push({
      name: `Day ${i + 1}`,
      shipments: baseValue + Math.floor(Math.random() * 10),
      revenue: (baseValue + Math.floor(Math.random() * 10)) * 150,
    });
  }
  return data;
};

export const AnalyticsCharts: React.FC = () => {
  const { token } = useAuth();

  const { data: statsData, isLoading } = useQuery({
    queryKey: ["systemStats"],
    queryFn: async () => {
      const client = createGraphQLClient(token!);
      const result: any = await client.request(SYSTEM_STATS_QUERY);
      return result.systemStats;
    },
    enabled: !!token,
    refetchInterval: 5000,
  });

  const pieData = useMemo(() => {
    if (!statsData) return [];
    return [
      { name: "Delivered", value: statsData.deliveredShipments },
      { name: "In Transit", value: statsData.inTransitShipments },
      { name: "Pending", value: statsData.pendingShipments },
    ].filter((item) => item.value > 0);
  }, [statsData]);

  const historicalData = useMemo(() => {
    return generateHistoricalData(statsData?.totalShipments || 50);
  }, [statsData?.totalShipments]);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#14b8a6] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 leading-none">
            Intelligence Engine
          </h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">
            Enterprise Analytics Terminal
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 main-card p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary-50 rounded-xl text-primary-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">
                Transactional Velocity
              </h3>
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData}>
                <defs>
                  <linearGradient
                    id="colorShipments"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "24px",
                    border: "none",
                    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.1)",
                    padding: "16px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="shipments"
                  stroke="#14b8a6"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorShipments)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="main-card p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">
              Operational Load
            </h3>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-4">
            {pieData.map((item, idx) => (
              <div
                key={item.name}
                className="flex justify-between items-center bg-slate-50/50 p-3 rounded-2xl border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  ></div>
                  <span className="text-xs font-bold text-slate-500">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-900">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="main-card p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">
              Revenue Projections
            </h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historicalData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip />
                <Bar dataKey="revenue" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="main-card p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-orange-50 rounded-xl text-orange-600">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">
              Node Integrity
            </h3>
          </div>
          <div className="space-y-8 pt-4">
            {[
              {
                label: "Active Data Streams",
                value: 87,
                color: "bg-primary-500",
              },
              { label: "Cloud Database Load", value: 42, color: "bg-blue-500" },
              {
                label: "Carrier Network Sync",
                value: 98,
                color: "bg-emerald-500",
              },
            ].map((stat) => (
              <div key={stat.label} className="space-y-3">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  <span>{stat.label}</span>
                  <span className="text-slate-900">{stat.value}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stat.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${stat.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
