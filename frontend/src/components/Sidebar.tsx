import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Package,
  Truck,
  BarChart3,
  Settings,
  ChevronDown,
  LogOut,
  Hexagon,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems?: { id: string; label: string }[];
  roles?: string[];
}

interface HamburgerMenuProps {
  onFilterChange?: (filter: any) => void;
  activeItem?: string;
  onItemClick?: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<HamburgerMenuProps> = ({
  onFilterChange,
  activeItem = "dashboard",
  onItemClick,
  isOpen,
  setIsOpen,
}) => {
  const [expandedMenu, setExpandedMenu] = useState<string | null>("shipments");
  const { user, logout } = useAuth();

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: "shipments",
      label: "Shipments",
      icon: <Package className="w-5 h-5" />,
      subItems: [
        { id: "all-shipments", label: "All Shipments" },
        { id: "in_transit", label: "In Transit" },
        { id: "delivered", label: "Delivered" },
      ],
    },
    {
      id: "carriers",
      label: "Carriers",
      icon: <Truck className="w-5 h-5" />,
    },
    {
      id: "reports",
      label: "Reports",
      icon: <BarChart3 className="w-5 h-5" />,
      roles: ["admin"],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      roles: ["admin"],
    },
  ];

  const filteredItems = menuItems.filter(
    (item) => !item.roles || (user?.role && item.roles.includes(user.role)),
  );

  const toggleSubmenu = (id: string) => {
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 w-[280px] bg-white border-r border-slate-100 z-[100] transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-8 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-900/20">
              <Hexagon className="w-7 h-7 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                FleetFlow
              </h1>
              <p className="text-[10px] text-primary-600 font-bold uppercase tracking-[0.2em] mt-1.5">
                Management
              </p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto custom-scrollbar">
            {filteredItems.map((item) => (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => {
                    if (item.subItems) {
                      toggleSubmenu(item.id);
                    } else {
                      onItemClick?.(item.id);
                      if (!(window.innerWidth >= 1024)) setIsOpen(false);
                    }
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                    activeItem === item.id
                      ? "bg-primary-600 text-white shadow-lg shadow-primary-900/20"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`${activeItem === item.id ? "text-white" : "text-slate-400 group-hover:text-primary-500"} transition-colors`}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1 text-left font-bold text-sm tracking-tight">
                    {item.label}
                  </span>
                  {item.subItems && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${expandedMenu === item.id ? "rotate-180" : ""} ${activeItem === item.id ? "text-white/70" : "text-slate-300"}`}
                    />
                  )}
                </button>

                {/* Submenu */}
                {item.subItems && expandedMenu === item.id && (
                  <div className="ml-6 pl-6 border-l-2 border-slate-100 space-y-1 py-2">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          onItemClick?.(subItem.id);
                          if (subItem.id === "all-shipments")
                            onFilterChange?.({});
                          if (
                            ["in_transit", "delivered", "pending"].includes(
                              subItem.id,
                            )
                          ) {
                            onFilterChange?.({ status: subItem.id });
                          }
                          if (window.innerWidth < 1024) setIsOpen(false);
                        }}
                        className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
                          activeItem === subItem.id
                            ? "text-primary-600 bg-primary-50"
                            : "text-slate-400 hover:text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="p-6 border-t border-slate-50">
            <div className="flex items-center gap-4 p-3 bg-slate-50/50 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-primary-600 font-bold shadow-sm">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "JD"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate tracking-tight">
                  {user?.name || "John Doe"}
                </p>
                <p className="text-[10px] text-slate-400 truncate uppercase font-bold tracking-widest">
                  {user?.role || "Operator"}
                </p>
              </div>
              <button
                onClick={logout}
                className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
