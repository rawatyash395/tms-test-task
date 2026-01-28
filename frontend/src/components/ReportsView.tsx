import React, { useState } from "react";
import {
  FileText,
  Download,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from "lucide-react";

export const ReportsView: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

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

  const handleDownload = (reportName: string) => {
    window.dispatchEvent(
      new CustomEvent("app:toast", {
        detail: {
          message: `PROTOCOL "${reportName}" DOWNLOAD INITIATED`,
          type: "success",
        },
      }),
    );
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
    <div className="space-y-10 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="main-card p-5 group flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Pipeline Health
            </p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tighter">
              99.8%
            </h3>
            <p className="text-xs font-bold text-primary-600 mt-2 flex items-center gap-1 uppercase">
              Accuracy{" "}
              <span className="text-slate-400 font-medium lowercase">
                threshold
              </span>
            </p>
          </div>
          <div className="p-3 bg-slate-100 rounded-xl text-slate-700 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="main-card p-5 group flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Total Extracts
            </p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tighter">
              1,240
            </h3>
            <p className="text-xs font-bold text-blue-600 mt-2 flex items-center gap-1 uppercase">
              Fiscal{" "}
              <span className="text-slate-400 font-medium lowercase">
                cycle 2026
              </span>
            </p>
          </div>
          <div className="p-3 bg-slate-100 rounded-xl text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>

        <div className="main-card p-5 group flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Processing KPI
            </p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tighter">
              1.2s
            </h3>
            <p className="text-xs font-bold text-orange-600 mt-2 flex items-center gap-1 uppercase">
              Compute{" "}
              <span className="text-slate-400 font-medium lowercase">
                duration
              </span>
            </p>
          </div>
          <div className="p-3 bg-slate-100 rounded-xl text-slate-700 group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="main-card overflow-hidden flex flex-col max-h-[calc(100vh-340px)]">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input
                type="text"
                placeholder="Registry Query..."
                className="pl-11 pr-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold font-bold outline-none focus:ring-4 focus:ring-primary-500/5 transition-all text-slate-900 w-64 md:w-80"
              />
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary py-3 px-6 text-[10px] tracking-widest uppercase font-bold"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
            {isGenerating ? "Compiling..." : "Generate New Extract"}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="sticky top-0 z-20">
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                <th className="px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-10">
                  Identity Pointer
                </th>
                <th className="px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-10">
                  Sync Timestamp
                </th>
                <th className="px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-10">
                  Protocol
                </th>
                <th className="px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-10 text-right">
                  Download
                </th>
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
                    <button
                      onClick={() => handleDownload(report.name)}
                      className="p-3 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all shadow-sm active:scale-95"
                    >
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
