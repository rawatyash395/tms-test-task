import React from "react";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Shipment, ViewMode } from "../types";
import { ShipmentGrid } from "./ShipmentGrid";
import { ShipmentTileView } from "./ShipmentTileView";

interface ShipmentManagementViewProps {
  activeNavItem: string;
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
}

export const ShipmentManagementView: React.FC<ShipmentManagementViewProps> = ({
  activeNavItem,
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
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="main-card overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {activeNavItem === "all-shipments"
                ? "All Shipments"
                : activeNavItem.replace("_", " ").toUpperCase()}
            </h3>
            <p className="text-xs text-slate-500">
              Showing {shipments.length} shipments • Enterprise Registry
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="py-40 text-center">
            <div className="w-12 h-12 border-4 border-[#14b8a6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 font-bold tracking-widest uppercase">
              Syncing Node...
            </p>
          </div>
        ) : error ? (
          <div className="p-10 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-slate-900 font-bold uppercase tracking-tighter">
              Access Terminal Fault
            </p>
            <p className="text-slate-400 text-[10px] font-mono mt-1">
              ERROR CODE: 0xDATA_NODE_UNREACHABLE
            </p>
          </div>
        ) : (
          <>
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white">
                <p className="text-[10px] text-slate-400 font-bold font-mono tracking-widest">
                  REGISTER PAGE {page} / {totalPages}
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
                    disabled={page === totalPages}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-100 transition-all shadow-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
