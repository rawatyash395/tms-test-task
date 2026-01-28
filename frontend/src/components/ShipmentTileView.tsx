import React from "react";
import { Shipment } from "../types";
import { Calendar, Truck, Package, Edit2, Trash2 } from "lucide-react";

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
  return (
    <div
      className="main-card p-6 group hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer relative"
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

        {isAdmin && (
          <div className="flex items-center gap-2 relative z-30 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(shipment);
              }}
              className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95 border border-blue-100/50"
              title="Edit Record"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(shipment);
              }}
              className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95 border border-rose-100/50"
              title="Delete Asset"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
