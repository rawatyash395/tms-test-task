import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  Circle,
  CheckCircle2,
  Truck,
  AlertTriangle,
  Package,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Notification {
  id: string;
  title: string;
  desc: string;
  type: "shipment" | "carrier" | "alert" | "success";
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Carrier Pending Approval",
    desc: "Swift Transportation is waiting for document verification.",
    type: "carrier",
    time: "2 mins ago",
    read: false,
  },
  {
    id: "2",
    title: "Shipment Delivered",
    desc: "TRK-2026-00342 has reached its destination in New York.",
    type: "shipment",
    time: "45 mins ago",
    read: true,
  },
  {
    id: "3",
    title: "System Alert",
    desc: "Enterprise API key is expiring in 3 days.",
    type: "alert",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "4",
    title: "New Member Joined",
    desc: "Alex Johnson was added to the Logistics team.",
    type: "success",
    time: "5 hours ago",
    read: true,
  },
];

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleNewNotify = (e: any) => {
      const newNotify: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        title: e.detail.title,
        desc: e.detail.desc,
        type: e.detail.type || "info",
        time: "Just now",
        read: false,
      };
      setNotifications((prev) => [newNotify, ...prev]);
    };
    window.addEventListener("app:notification", handleNewNotify);
    return () =>
      window.removeEventListener("app:notification", handleNewNotify);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "shipment":
        return <Package className="w-4 h-4 text-blue-500" />;
      case "carrier":
        return <Truck className="w-4 h-4 text-orange-500" />;
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-400 hover:text-slate-600 relative transition-all group"
      >
        <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full text-[8px] font-bold text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[100] overflow-hidden"
          >
            <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Notifications
                </h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Enterprise Feed
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[10px] font-bold text-[#14b8a6] hover:text-[#0d9488] uppercase tracking-wider"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-4 hover:bg-slate-50 transition-all cursor-pointer group flex gap-4 ${!n.read ? "bg-slate-50/30" : ""}`}
                    >
                      <div
                        className={`mt-1 p-2 rounded-xl flex-shrink-0 ${
                          n.type === "shipment"
                            ? "bg-blue-50"
                            : n.type === "carrier"
                              ? "bg-orange-50"
                              : n.type === "alert"
                                ? "bg-red-50"
                                : "bg-green-50"
                        }`}
                      >
                        {getIcon(n.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <p
                            className={`text-sm font-bold truncate ${!n.read ? "text-slate-900" : "text-slate-600"}`}
                          >
                            {n.title}
                          </p>
                          <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">
                            {n.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {n.desc}
                        </p>
                      </div>
                      {!n.read && (
                        <div className="mt-2">
                          <Circle className="w-2 h-2 fill-[#14b8a6] text-[#14b8a6]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    All caught up!
                  </p>
                  <p className="text-xs text-slate-500">
                    No new notifications at the moment.
                  </p>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
              <button className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
                View Activity Log
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
