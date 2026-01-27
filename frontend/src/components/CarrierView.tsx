import React from "react";
import {
  Truck,
  Star,
  MapPin,
  Phone,
  MoreVertical,
  Activity,
  ShieldCheck,
  Zap,
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
    <div className="space-y-10 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 leading-none">
            Carrier Registry
          </h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">
            Verified Partner Network
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={onAdd}
            className="btn-primary py-3 px-6 text-xs tracking-widest uppercase font-bold"
          >
            <Truck className="w-4 h-4" />
            Register New Carrier
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {carriers.map((carrier) => (
          <div
            key={carrier.id}
            className="main-card p-8 group hover:border-primary-500/20 transition-all relative overflow-hidden"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="flex gap-6">
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
                  <div className="flex items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
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
              <button className="p-2.5 text-slate-300 hover:text-slate-900 rounded-2xl transition-all">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-500">
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold">{carrier.region}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold">{carrier.contact}</span>
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

            <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between relative z-10">
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
  );
};
