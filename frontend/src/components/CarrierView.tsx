import React from "react";
import {
  Truck,
  Star,
  MapPin,
  Phone,
  Activity,
  ShieldCheck,
  Zap,
  Search,
  Plus,
} from "lucide-react";

interface CarrierViewProps {
  onAdd: () => void;
  isAdmin: boolean;
}

const carriers = [
  {
    id: "c1",
    name: "Swift Transportation",
    rating: 4.8,
    fleetSize: 124,
    region: "North America",
    status: "active",
    contact: "+1 (555) 123-4567",
    email: "ops@swift.com",
  },
  {
    id: "c2",
    name: "Global Logix",
    rating: 4.5,
    fleetSize: 85,
    region: "European Union",
    status: "active",
    contact: "+44 20 7123 4567",
    email: "contact@globallogix.io",
  },
  {
    id: "c3",
    name: "Titan Freight",
    rating: 4.9,
    fleetSize: 210,
    region: "Asia Pacific",
    status: "pending",
    contact: "+81 3 1234 5678",
    email: "verification@titan.com",
  },
];

export const CarrierView: React.FC<CarrierViewProps> = ({ onAdd, isAdmin }) => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="main-card overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input
              type="text"
              placeholder="Query Registry..."
              className="pl-11 pr-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-primary-500/5 transition-all text-slate-900 w-64 md:w-80 font-bold"
            />
          </div>
          {isAdmin && (
            <button
              onClick={onAdd}
              className="btn-primary py-3 px-6 text-[10px] tracking-widest uppercase font-bold"
            >
              <Plus className="w-4 h-4" />
              Register Partner
            </button>
          )}
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {carriers.map((carrier) => (
              <div
                key={carrier.id}
                className="main-card p-6 group hover:border-primary-500/20 transition-all relative overflow-hidden"
              >
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
                      <Truck className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                          {carrier.name}
                        </h3>
                        {carrier.status === "active" && (
                          <div className="p-1 px-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <span className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />{" "}
                          {carrier.rating} Rating
                        </span>
                        <span className="flex items-center gap-2 text-primary-500">
                          <Zap className="w-4 h-4" /> {carrier.fleetSize} Units
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-500">
                      <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold">
                        {carrier.region}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500">
                      <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold">
                        {carrier.contact}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3 text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Network Status
                    </p>
                    <div
                      className={`text-xs font-bold uppercase tracking-widest inline-flex px-3 py-1 rounded-full ${carrier.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
                    >
                      {carrier.status}
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-50 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3 text-slate-400">
                    <Activity className="w-4 h-4 text-primary-600" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Performance KPI • 98%
                    </span>
                  </div>
                  <button className="text-xs font-bold text-primary-600 uppercase tracking-widest hover:translate-x-1 transition-all">
                    View Analytics →
                  </button>
                </div>

                <div className="absolute top-0 right-0 w-48 h-48 bg-primary-50/30 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-primary-500/10 transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
