import React from "react";
import { Package, Truck, CheckCircle2, AlertTriangle } from "lucide-react";

interface StatsGridProps {
  stats: {
    totalShipments: number;
    inTransitShipments: number;
    deliveredShipments: number;
    pendingShipments: number;
  } | null;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="main-card p-5 group flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Total Payload
          </p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tighter">
            {stats?.totalShipments || 0}
          </h3>
          <p className="text-xs font-bold text-green-600 mt-2 flex items-center gap-1">
            +12%{" "}
            <span className="text-slate-400 font-medium">volume shift</span>
          </p>
        </div>
        <div className="p-3 bg-slate-100 rounded-xl text-slate-700 group-hover:bg-[#14b8a6]/10 group-hover:text-[#14b8a6] transition-all">
          <Package className="w-6 h-6" />
        </div>
      </div>

      <div className="main-card p-5 group flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Live Transit
          </p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tighter">
            {stats?.inTransitShipments || 0}
          </h3>
          <p className="text-xs font-bold text-blue-600 mt-2 flex items-center gap-1 uppercase">
            Active{" "}
            <span className="text-slate-400 font-medium lowercase">
              operations
            </span>
          </p>
        </div>
        <div className="p-3 bg-slate-100 rounded-xl text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
          <Truck className="w-6 h-6" />
        </div>
      </div>

      <div className="main-card p-5 group flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Finalized
          </p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tighter">
            {stats?.deliveredShipments || 0}
          </h3>
          <p className="text-xs font-bold text-green-600 mt-2 flex items-center gap-1 uppercase">
            Secured{" "}
            <span className="text-slate-400 font-medium lowercase">
              delivery
            </span>
          </p>
        </div>
        <div className="p-3 bg-slate-100 rounded-xl text-slate-700 group-hover:bg-green-100 group-hover:text-green-600 transition-all">
          <CheckCircle2 className="w-6 h-6" />
        </div>
      </div>

      <div className="main-card p-5 group flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Attention Eq.
          </p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tighter">
            {stats?.pendingShipments || 0}
          </h3>
          <p className="text-xs font-bold text-red-600 mt-2 flex items-center gap-1 uppercase">
            Priority{" "}
            <span className="text-slate-400 font-medium lowercase">
              flagged
            </span>
          </p>
        </div>
        <div className="p-3 bg-slate-100 rounded-xl text-slate-700 group-hover:bg-red-50 group-hover:text-red-600 transition-all">
          <AlertTriangle className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
