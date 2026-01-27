import React, { useState, useRef, useEffect } from "react";
import { Shipment } from "../types";
import {
  Calendar,
  Truck,
  Package,
  MoreVertical,
  Edit2,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ShipmentTileViewProps {
  shipments: Shipment[];
  onShipmentClick: (shipment: Shipment) => void;
  isAdmin: boolean;
  onEdit?: (shipment: Shipment) => void;
  onDelete?: (shipment: Shipment) => void;
}

const ShipmentTile: React.FC<{
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
    <div
      className="main-card p-8 group hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer relative"
      onClick={() => onShipmentClick(shipment)}
    >
      {/* Decorative Gradient Overlay - Moved inside a clipped container */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      </div>

      <div className="flex justify-between items-start mb-8 relative z-20">
        <div className={`badge badge-${shipment.status.replace("_", "-")}`}>
          {shipment.status.replace("_", " ")}
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className={`p-2 rounded-xl transition-all ${isMenuOpen ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"}`}
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                style={{ originX: 1, originY: 0 }}
                className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-[100] overflow-hidden"
              >
                <div className="p-2.5 space-y-1">
                  {isAdmin && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMenuOpen(false);
                          // Delay slightly to allow menu close animation before parent state change
                          onEdit?.(shipment);
                        }}
                        className="w-full flex items-center gap-3.5 px-4 py-3 text-[11px] font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors group/item"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-white transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </div>
                        <span className="flex-1 text-left uppercase tracking-wider">
                          Modify Record
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMenuOpen(false);
                          setTimeout(() => onDelete?.(shipment), 50);
                        }}
                        className="w-full flex items-center gap-3.5 px-4 py-3 text-[11px] font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors group/item"
                      >
                        <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center group-hover/item:bg-white transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </div>
                        <span className="flex-1 text-left uppercase tracking-wider">
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
      </div>

      <div className="space-y-6 relative z-10">
        <div>
          <p className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2">
            <span className="w-1 h-3 bg-primary-600 rounded-full"></span>
            Registry Pointer
          </p>
          <h4 className="text-xl font-bold text-slate-900 tracking-tighter">
            #
            {shipment.tracking_number ||
              shipment.id.substring(0, 8).toUpperCase()}
          </h4>
        </div>

        <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Principal
            </p>
            <p
              className="text-xs font-bold text-slate-700 truncate"
              title={shipment.shipper_name}
            >
              {shipment.shipper_name}
            </p>
          </div>
          <div className="w-px h-8 bg-slate-200 shrink-0"></div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Carrier
            </p>
            <p
              className="text-xs font-bold text-slate-700 truncate"
              title={shipment.carrier_name}
            >
              {shipment.carrier_name}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex flex-col items-center gap-1 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200"></div>
              <div className="w-px h-6 bg-slate-200"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-lg shadow-blue-200"></div>
            </div>
            <div className="flex-1 min-w-0 space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                  Origin Point
                </p>
                <p
                  className="text-xs font-bold text-slate-600 truncate"
                  title={shipment.pickup_location}
                >
                  {shipment.pickup_location}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                  Final Destination
                </p>
                <p
                  className="text-xs font-bold text-slate-600 truncate"
                  title={shipment.delivery_location}
                >
                  {shipment.delivery_location}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <div className="flex items-center gap-2 text-slate-500">
              <Calendar className="w-4 h-4 text-primary-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {isNaN(new Date(shipment.pickup_date).getTime())
                  ? "No Date Set"
                  : new Date(shipment.pickup_date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {shipment.weight_kg && (
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                  <Package className="w-3.5 h-3.5" /> {shipment.weight_kg}KG
                </span>
              )}
              <Truck className="w-4 h-4 text-slate-200 group-hover:text-primary-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ShipmentTileView: React.FC<ShipmentTileViewProps> = ({
  shipments,
  onShipmentClick,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {shipments.map((shipment) => (
        <ShipmentTile
          key={shipment.id}
          shipment={shipment}
          onShipmentClick={onShipmentClick}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
