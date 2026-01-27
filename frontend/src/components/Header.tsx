import React from "react";
import { Menu, Grid3x3, LayoutGrid, Search, Plus } from "lucide-react";
import { NotificationCenter } from "./NotificationCenter";

interface HorizontalMenuProps {
  onItemClick?: (id: string) => void;
  activeItem?: string;
  onSetIsOpen: (isOpen: boolean) => void;
  viewMode: "grid" | "tile";
  setViewMode: (mode: "grid" | "tile") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isAdmin: boolean;
  onNewShipment: () => void;
}

export const Header: React.FC<HorizontalMenuProps> = ({
  onSetIsOpen,
  activeItem,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  isAdmin,
  onNewShipment,
}) => {
  const isShipmentView = [
    "all-shipments",
    "in_transit",
    "delivered",
    "pending",
  ].includes(activeItem || "");

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40">
      <div className="h-20 flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <button
            onClick={() => onSetIsOpen(true)}
            className="lg:hidden p-3 text-slate-500 hover:bg-slate-50 rounded-2xl transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div>
            <h2 className="text-xl font-bold text-slate-900 leading-none">
              {activeNavItemTitle(activeItem)}
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5">
              FleetFlow Central
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {isShipmentView && (
            <>
              <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-2.5 focus-within:ring-4 focus-within:ring-primary-600/5 focus-within:border-primary-600/30 transition-all group">
                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Query Registry ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm text-slate-900 placeholder-slate-300 w-48 lg:w-72 font-bold"
                />
              </div>

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
                  className="btn-primary py-2.5 px-6 text-xs tracking-widest uppercase font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Register Asset</span>
                </button>
              )}
            </>
          )}

          <div className="h-10 w-px bg-slate-100 hidden sm:block"></div>
          <NotificationCenter />
        </div>
      </div>
    </div>
  );
};

function activeNavItemTitle(activeItem: string | undefined) {
  if (!activeItem) return "MANAGEMENT";
  if (activeItem === "dashboard") return "COMMAND CENTER";
  if (activeItem === "all-shipments") return "REGISTRY";
  return activeItem.replace("_", " ").toUpperCase();
}
