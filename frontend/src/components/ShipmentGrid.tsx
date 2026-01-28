import React from "react";
import { Shipment } from "../types";
import { Calendar, Edit2, Trash2 } from "lucide-react";

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
  return (
    <tr
      className="group hover:bg-slate-50/50 transition-all cursor-pointer"
      onClick={() => onShipmentClick(shipment)}
    >
      <td className="px-8 py-6">
        <span className="text-sm font-bold text-slate-900 tracking-tight font-mono">
          #{shipment.tracking_number || shipment.id}
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
      <td className="px-8 py-6 text-right">
        <div className="flex items-center justify-end gap-2 transition-opacity">
          {isAdmin && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(shipment);
                }}
                className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
                title="Edit Record"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(shipment);
                }}
                className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95"
                title="Delete Asset"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
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
        <thead className="sticky top-0 z-20">
          <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            <th className="px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-10">
              Registry ID
            </th>
            <th className="px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-10">
              Stakeholder
            </th>
            <th className="px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-10">
              Lifecycle
            </th>
            <th className="px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-10">
              Logistics Route
            </th>
            <th className="px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-10">
              Scheduled
            </th>
            <th className="px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-10 text-right">
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
