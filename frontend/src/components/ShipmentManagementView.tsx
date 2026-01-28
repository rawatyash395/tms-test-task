import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Search,
  Plus,
  Grid3x3,
  LayoutGrid,
} from "lucide-react";
import { Shipment, ViewMode } from "../types";
import { ShipmentGrid } from "./ShipmentGrid";
import { ShipmentTileView } from "./ShipmentTileView";

interface ShipmentManagementViewProps {
  shipments: Shipment[];
  viewMode: ViewMode;
  isLoading: boolean;
  error: any;
  isAdmin: boolean;
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onEdit: (shipment: Shipment) => void;
  onDelete: (shipment: Shipment) => void;
  onShipmentClick: (shipment: Shipment) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNewShipment: () => void;
  setViewMode: (mode: ViewMode) => void;
}

export const ShipmentManagementView: React.FC<ShipmentManagementViewProps> = ({
  shipments,
  viewMode,
  isLoading,
  error,
  isAdmin,
  page,
  totalPages,
  setPage,
  onEdit,
  onDelete,
  onShipmentClick,
  searchQuery,
  setSearchQuery,
  onNewShipment,
  setViewMode,
}) => {
  return (
    <div className="h-full flex flex-col space-y-6 animate-fade-in">
      <div className="main-card overflow-hidden flex flex-col flex-1 h-[calc(100vh-128px)]">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-30">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input
              type="text"
              placeholder="Query Registry ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-primary-500/5 transition-all text-slate-900 w-64 md:w-80 font-bold"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-primary-600 shadow-sm ring-1 ring-slate-100"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("tile")}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === "tile"
                    ? "bg-white text-primary-600 shadow-sm ring-1 ring-slate-100"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
            {isAdmin && (
              <button
                onClick={onNewShipment}
                className="btn-primary py-3 px-6 text-[10px] tracking-widest uppercase font-bold"
              >
                <Plus className="w-4 h-4" />
                Register Shipment
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="py-40 text-center">
              <div className="w-12 h-12 border-4 border-[#14b8a6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-400 font-bold tracking-widest uppercase">
                Syncing Node...
              </p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-slate-900 font-bold uppercase tracking-tighter">
                Access Terminal Fault
              </p>
              <p className="text-slate-400 text-[10px] font-mono mt-1">
                ERROR CODE: 0xDATA_NODE_UNREACHABLE
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {viewMode === "grid" ? (
                <ShipmentGrid
                  shipments={shipments}
                  onShipmentClick={onShipmentClick}
                  isAdmin={isAdmin}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ) : (
                <div className="p-6">
                  <ShipmentTileView
                    shipments={shipments}
                    onShipmentClick={onShipmentClick}
                    onDelete={isAdmin ? onDelete : undefined}
                    onEdit={isAdmin ? onEdit : undefined}
                    isAdmin={isAdmin}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && !error && shipments.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white/80 backdrop-blur-md sticky bottom-0 z-30">
            <p className="text-[10px] font-bold font-mono tracking-widest text-xs text-slate-500">
              Total {shipments.length} shipments
            </p>
            <div className="flex items-center gap-2">
              <p className="text-[10px] text-slate-400 font-bold font-mono tracking-widest">
                REGISTER PAGE {page} / {Math.max(1, totalPages)}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-100 transition-all shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-100 transition-all shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
