import React, { useState, useRef, useEffect } from "react";
import { Shipment } from "../types";
import {
  MoreVertical,
  Calendar,
  Edit2,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ShipmentGridProps {
  shipments: Shipment[];
  onShipmentClick: (shipment: Shipment) => void;
  isAdmin: boolean;
  onEdit?: (shipment: Shipment) => void;
  onDelete?: (shipment: Shipment) => void;
}

const ShipmentRow: React.FC<{
  shipment: Shipment;
  onShipmentClick: (shipment: Shipment) => void;
  isAdmin: boolean;
  onEdit?: (shipment: Shipment) => void;
  onDelete?: (shipment: Shipment) => void;
}> = ({ shipment, onShipmentClick, isAdmin, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <tr
      className="group hover:bg-slate-50/50 transition-all cursor-pointer"
      onClick={() => onShipmentClick(shipment)}
    >
      <td className="px-8 py-6">
        <span className="text-sm font-bold text-slate-900 tracking-tight font-mono">
          #
          {shipment.tracking_number ||
            shipment.id.substring(0, 8).toUpperCase()}
        </span>
      </td>
      <td className="px-8 py-6">
        <div>
          <p className="text-sm font-bold text-slate-700 leading-tight">
            {shipment.shipper_name}
          </p>
          <p
            className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 truncate max-w-[120px]"
            title={shipment.carrier_name}
          >
            {shipment.carrier_name}
          </p>
        </div>
      </td>
      <td className="px-8 py-6">
        <span className={`badge badge-${shipment.status.replace("_", "-")}`}>
          {shipment.status.replace("_", " ")}
        </span>
      </td>
      <td className="px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200"></div>
            <div className="w-px h-3 bg-slate-200"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-200"></div>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-slate-600 truncate max-w-[140px] leading-none">
              {shipment.pickup_location}
            </p>
            <p className="text-[11px] font-bold text-slate-400 truncate max-w-[140px] leading-none pt-2">
              {shipment.delivery_location}
            </p>
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="flex items-center gap-2 text-slate-500 font-bold text-[11px]">
          <Calendar className="w-3.5 h-3.5 text-slate-300" />
          {isNaN(new Date(shipment.pickup_date).getTime())
            ? "No Date Set"
            : new Date(shipment.pickup_date).toLocaleDateString()}
        </div>
      </td>
      <td className="px-8 py-6 text-right relative">
        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className={`p-2 rounded-xl transition-all ${isMenuOpen ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"}`}
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                style={{ originX: 1, originY: 0 }}
                className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-[100] overflow-hidden text-left"
              >
                <div className="p-2.5 space-y-1">
                  {isAdmin && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMenuOpen(false);
                          onEdit?.(shipment);
                        }}
                        className="w-full flex items-center gap-3.5 px-4 py-3 text-[11px] font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors group/item"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-white transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </div>
                        <span className="flex-1 uppercase tracking-wider">
                          Edit Record
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMenuOpen(false);
                          onDelete?.(shipment);
                        }}
                        className="w-full flex items-center gap-3.5 px-4 py-3 text-[11px] font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors group/item"
                      >
                        <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center group-hover/item:bg-white transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </div>
                        <span className="flex-1 uppercase tracking-wider">
                          Delete Asset
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </td>
    </tr>
  );
};

export const ShipmentGrid: React.FC<ShipmentGridProps> = ({
  shipments,
  onShipmentClick,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto min-h-[400px]">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            <th className="px-8 py-5 border-b border-slate-100">Registry ID</th>
            <th className="px-8 py-5 border-b border-slate-100">Stakeholder</th>
            <th className="px-8 py-5 border-b border-slate-100">Lifecycle</th>
            <th className="px-8 py-5 border-b border-slate-100">
              Logistics Route
            </th>
            <th className="px-8 py-5 border-b border-slate-100">Scheduled</th>
            <th className="px-8 py-5 border-b border-slate-100 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {shipments.map((shipment) => (
            <ShipmentRow
              key={shipment.id}
              shipment={shipment}
              onShipmentClick={onShipmentClick}
              isAdmin={isAdmin}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
