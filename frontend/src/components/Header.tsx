import React from "react";
import { Menu } from "lucide-react";
import { NotificationCenter } from "./NotificationCenter";

interface HorizontalMenuProps {
  activeItem?: string;
  onSetIsOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<HorizontalMenuProps> = ({
  onSetIsOpen,
  activeItem,
}) => {
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
              {activeNavItemTitle(
                activeItem === "reports" ? "reporting_terminal" : activeItem,
              )}
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5">
              FleetFlow Central
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
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
  if (activeItem === "all-shipments") return "ALL SHIPMENTS";
  return activeItem.replace("_", " ").toUpperCase();
}
