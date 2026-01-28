import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Save,
  Package,
  MapPin,
  Calendar,
  Scale,
  DollarSign,
  Info,
  AlertTriangle,
} from "lucide-react";
import { Shipment } from "../types";
import { CustomSelect } from "./CustomSelect";

const INITIAL_FORM_STATE = {
  shipper_name: "",
  shipper_email: "",
  shipper_phone: "",
  carrier_name: "",
  carrier_contact: "",
  pickup_location: "",
  pickup_date: "",
  delivery_location: "",
  estimated_delivery: "",
  status: "pending",
  weight_kg: "",
  dimensions: "",
  cargo_type: "",
  rate_amount: "",
  currency: "USD",
  priority: "normal",
  notes: "",
};

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in_transit", label: "In Transit" },
  { value: "delivered", label: "Delivered" },
  { value: "delayed", label: "Delayed" },
  { value: "cancelled", label: "Cancelled" },
];

const PRIORITY_OPTIONS = [
  { value: "low", label: "Standard (Low)" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "Priority (High)" },
  { value: "urgent", label: "Critical (Urgent)" },
];

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "INR", label: "INR - Indian Rupee" },
];

interface ShipmentFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  shipment?: Shipment | null;
}

export const ShipmentFormDrawer: React.FC<ShipmentFormDrawerProps> = ({
  isOpen,
  onClose,
  onSubmit,
  shipment,
}) => {
  const [formData, setFormData] = useState<any>(INITIAL_FORM_STATE);

  useEffect(() => {
    if (shipment) {
      setFormData({
        shipper_name: shipment.shipper_name || "",
        shipper_email: shipment.shipper_email || "",
        shipper_phone: shipment.shipper_phone || "",
        carrier_name: shipment.carrier_name || "",
        carrier_contact: shipment.carrier_contact || "",
        pickup_location: shipment.pickup_location || "",
        pickup_date:
          shipment.pickup_date &&
          !isNaN(new Date(shipment.pickup_date).getTime())
            ? new Date(shipment.pickup_date).toISOString().split("T")[0]
            : "",
        delivery_location: shipment.delivery_location || "",
        estimated_delivery:
          shipment.estimated_delivery &&
          !isNaN(new Date(shipment.estimated_delivery).getTime())
            ? new Date(shipment.estimated_delivery).toISOString().split("T")[0]
            : "",
        status: shipment.status || "pending",
        weight_kg: shipment.weight_kg || "",
        dimensions: shipment.dimensions || "",
        cargo_type: shipment.cargo_type || "",
        rate_amount: shipment.rate_amount || "",
        currency: shipment.currency || "USD",
        priority: shipment.priority || "normal",
        notes: shipment.notes || "",
      });
    } else {
      setFormData(INITIAL_FORM_STATE);
    }
  }, [shipment, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value, type } = e.target;
      setFormData((prev: any) => ({
        ...prev,
        [name]:
          type === "number" ? (value === "" ? "" : parseFloat(value)) : value,
      }));
    },
    [],
  );

  const handleCustomChange = useCallback((name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clean up numerical values
    const submissionData = {
      ...formData,
      weight_kg:
        formData.weight_kg !== "" ? parseFloat(formData.weight_kg) : undefined,
      rate_amount:
        formData.rate_amount !== "" ? parseFloat(formData.rate_amount) : 0,
    };

    onSubmit(submissionData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[150]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-[600px] bg-white z-[200] shadow-2xl flex flex-col"
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-600 text-white rounded-2xl shadow-lg shadow-primary-900/20">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-none">
                    {shipment ? "Edit Shipment" : "New Shipment"}
                  </h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">
                    {shipment
                      ? `Registry ID: ${shipment.tracking_number || shipment.id}`
                      : "Enterprise Asset Registration"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              id="shipment-form"
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-primary-500 rounded-full" />
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Stakeholder Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                      Shipper Name *
                    </label>
                    <input
                      name="shipper_name"
                      required
                      value={formData.shipper_name}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Principal Shipper"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                      Carrier Entity *
                    </label>
                    <input
                      name="carrier_name"
                      required
                      value={formData.carrier_name}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Logistics Provider"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                      Shipper Email
                    </label>
                    <input
                      name="shipper_email"
                      type="email"
                      value={formData.shipper_email}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="shipper@domain.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                      Carrier Contact
                    </label>
                    <input
                      name="carrier_contact"
                      value={formData.carrier_contact}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Dispatch Hotline"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-primary-500 rounded-full" />
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Logistics & Route
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-primary-500" /> Origin
                      Point *
                    </label>
                    <input
                      name="pickup_location"
                      required
                      value={formData.pickup_location}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Loading Dock / City"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />{" "}
                      Destination *
                    </label>
                    <input
                      name="delivery_location"
                      required
                      value={formData.delivery_location}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Receiver Address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> Pickup
                      Date *
                    </label>
                    <input
                      name="pickup_date"
                      type="date"
                      required
                      value={formData.pickup_date}
                      onChange={handleChange}
                      className="input w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> ETD
                      Estimate
                    </label>
                    <input
                      name="estimated_delivery"
                      type="date"
                      value={formData.estimated_delivery}
                      onChange={handleChange}
                      className="input w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-primary-500 rounded-full" />
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Payload & Valuation
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                      <Scale className="w-3.5 h-3.5 text-slate-400" /> Net
                      Weight (KG)
                    </label>
                    <input
                      name="weight_kg"
                      type="number"
                      step="0.01"
                      value={formData.weight_kg}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                      <Package className="w-3.5 h-3.5 text-slate-400" /> Cargo
                      Type
                    </label>
                    <input
                      name="cargo_type"
                      value={formData.cargo_type}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="General / Hazmat / Fragile"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-primary-500" />{" "}
                      Agreed Rate *
                    </label>
                    <input
                      name="rate_amount"
                      type="number"
                      required
                      step="0.01"
                      value={formData.rate_amount}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="0.00"
                    />
                  </div>
                  <CustomSelect
                    label="Currency"
                    value={formData.currency}
                    onChange={(val) => handleCustomChange("currency", val)}
                    options={CURRENCY_OPTIONS}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-primary-500 rounded-full" />
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Operational Status
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomSelect
                    label="Current State"
                    value={formData.status}
                    onChange={(val) => handleCustomChange("status", val)}
                    options={STATUS_OPTIONS}
                  />
                  <CustomSelect
                    label="Priority Index"
                    value={formData.priority}
                    onChange={(val) => handleCustomChange("priority", val)}
                    options={PRIORITY_OPTIONS}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-slate-400" /> Terminal
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="input w-full resize-none h-32"
                    placeholder="Technical specifications, handling instructions, or route alerts..."
                  />
                </div>
              </div>

              {shipment && (
                <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl flex gap-4">
                  <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-amber-900 uppercase tracking-tight">
                      Updating Live Record
                    </p>
                    <p className="text-[11px] text-amber-700 leading-relaxed mt-1">
                      You are modifying a registered asset. Any changes to the
                      logistics route will trigger system-wide re-calculation of
                      ETAs and carrier performance logs.
                    </p>
                  </div>
                </div>
              )}
            </form>

            <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex gap-4 mt-auto">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1 max-h-[42px] p-2"
              >
                Cancel
              </button>
              <button
                form="shipment-form"
                type="submit"
                className="btn-primary flex-[2] max-h-[42px] p-2"
              >
                <Save className="w-5 h-5" />
                {shipment ? "Update Shipment" : "Register Shipment"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
