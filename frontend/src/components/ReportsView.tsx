import React, { useState } from "react";
import {
  FileText,
  Download,
  Filter,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from "lucide-react";

export const ReportsView: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      window.dispatchEvent(
        new CustomEvent("app:toast", {
          detail: {
            message: "ENTERPRISE REPORT SYNCHRONIZED",
            type: "success",
          },
        }),
      );
    }, 2000);
  };

  const recentReports = [
    {
      id: "1",
      name: "Q4 Logistics Performance",
      date: "2026-01-20",
      type: "PDF",
      status: "ready",
    },
    {
      id: "2",
      name: "Carrier Compliance Audit",
      date: "2026-01-18",
      type: "CSV",
      status: "ready",
    },
    {
      id: "3",
      name: "Regional Revenue Analysis",
      date: "2026-01-15",
      type: "XLSX",
      status: "ready",
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 leading-none">
            Reporting Terminal
          </h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">
            Intelligence Extraction Console
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
              showFilters
                ? "bg-slate-900 text-white border-slate-900 shadow-xl"
                : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "Hide Parameters" : "Filter Streams"}
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary py-3 px-6 text-xs tracking-widest uppercase font-bold"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
            {isGenerating ? "Compiling Output..." : "Generate New Extract"}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="main-card p-8 flex flex-wrap gap-10 animate-slide-down">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Data Dimension
            </label>
            <select className="bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold p-3 outline-none focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500/30 transition-all min-w-[240px]">
              <option>Global Revenue by Region</option>
              <option>Carrier Efficiency Matrix</option>
              <option>Operational Delay Registry</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Temporal Range
            </label>
            <div className="flex items-center gap-4">
              <input
                type="date"
                className="bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold p-3 outline-none focus:ring-4 focus:ring-primary-500/5 transition-all"
              />
              <span className="text-slate-300 font-bold">TO</span>
              <input
                type="date"
                className="bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold p-3 outline-none focus:ring-4 focus:ring-primary-500/5 transition-all"
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
          <p className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.3em] mb-6">
            Pipeline Health
          </p>
          <div className="flex items-end justify-between">
            <div>
              <h4 className="text-4xl font-bold text-slate-900 mb-2 tracking-tighter">
                99.8%
              </h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Accuracy Threshold
              </p>
            </div>
            <div className="p-4 bg-primary-50 rounded-[1.5rem] border border-primary-100">
              <CheckCircle2 className="w-8 h-8 text-primary-600" />
            </div>
          </div>
        </div>
        <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">
            Total Extracts
          </p>
          <div className="flex items-end justify-between">
            <div>
              <h4 className="text-4xl font-bold text-slate-900 mb-2 tracking-tighter">
                1,240
              </h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Fiscal Cycle 2026
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-[1.5rem] border border-blue-100">
              <ArrowUpRight className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">
            Processing KPI
          </p>
          <div className="flex items-end justify-between">
            <div>
              <h4 className="text-4xl font-bold text-slate-900 mb-2 tracking-tighter">
                1.2s
              </h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Compute Duration
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-[1.5rem] border border-orange-100">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="main-card overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em]">
              Generated Artifacts
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
              Audit Trail Archive
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input
              type="text"
              placeholder="Registry Query..."
              className="pl-11 pr-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-primary-500/5 transition-all text-slate-900 w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                <th className="px-8 py-5">Identity Pointer</th>
                <th className="px-8 py-5">Sync Timestamp</th>
                <th className="px-8 py-5">Protocol</th>
                <th className="px-8 py-5 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentReports.map((report) => (
                <tr
                  key={report.id}
                  className="group hover:bg-slate-50/50 transition-all"
                >
                  <td className="px-8 py-6 flex items-center gap-5">
                    <div className="p-3 bg-primary-50 text-primary-600 rounded-2xl border border-primary-100 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-lg transition-all">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-900 tracking-tight">
                      {report.name}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-500 font-mono tracking-tighter">
                    {report.date}
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-lg uppercase tracking-widest">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-3 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all shadow-sm active:scale-95">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
