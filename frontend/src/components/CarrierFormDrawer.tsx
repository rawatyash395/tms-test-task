import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Truck, Phone, Mail } from "lucide-react";

interface CarrierFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const CarrierFormDrawer: React.FC<CarrierFormDrawerProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    onSubmit({
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      rating: parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
      activeShipments: 0,
      status: "Active",
    });
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
            className="fixed inset-y-0 right-0 w-full max-w-[500px] bg-white z-[200] shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-600 text-white rounded-2xl shadow-lg shadow-primary-900/20">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-none">
                    Add Carrier
                  </h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">
                    New Partner Registration
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
              id="carrier-form"
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-primary-500 rounded-full" />
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Business Identity
                  </h3>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Company Name *
                  </label>
                  <input
                    name="name"
                    required
                    className="input w-full"
                    placeholder="e.g. Global Logistics Corp"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Phone className="w-3 h-3 text-primary-500" /> Dispatch
                      Phone *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="input w-full"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Mail className="w-3 h-3 text-primary-500" /> Carrier
                      Email *
                    </label>
                    <input
                      name="contact"
                      type="email"
                      required
                      className="input w-full"
                      placeholder="ops@carrier.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Fleet Capacity
                  </label>
                  <input
                    name="fleetSize"
                    type="number"
                    min="1"
                    className="input w-full"
                    placeholder="Approximate units"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Operational Region
                  </label>
                  <select
                    name="region"
                    className="input w-full appearance-none"
                  >
                    <option value="North America">NORTH AMERICA</option>
                    <option value="Europe">EUROPE</option>
                    <option value="Asia Pacific">ASIA PACIFIC</option>
                    <option value="Global">GLOBAL NETWORK</option>
                  </select>
                </div>
              </div>
            </form>

            <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex gap-4 mt-auto">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                form="carrier-form"
                type="submit"
                className="btn-primary flex-[2]"
              >
                <Save className="w-5 h-5" />
                Register Partner
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
