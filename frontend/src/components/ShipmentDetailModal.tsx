import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Truck, 
  Package, 
  Scale, 
  DollarSign, 
  Clock,
  ExternalLink,
  Shield,
  FileText
} from 'lucide-react';
import { Shipment } from '../types';

interface ShipmentDetailModalProps {
  shipment: Shipment;
  onClose: () => void;
}

export const ShipmentDetailModal: React.FC<ShipmentDetailModalProps> = ({ shipment, onClose }) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white border border-slate-100 rounded-[3rem] shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Action Header for Mobile */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-all z-20 shadow-sm md:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Sidebar - Key Info */}
          <div className="md:w-1/3 bg-slate-50 p-10 border-r border-slate-100 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-12">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-primary-600 rounded-2xl shadow-lg shadow-primary-900/20 text-white">
                    <Package className="w-6 h-6" />
                 </div>
                 <div>
                    <h2 className="text-sm font-bold text-primary-600 uppercase tracking-[0.2em] mb-1">Asset ID</h2>
                    <p className="text-xl font-bold font-mono tracking-tighter text-slate-900">
                      #{shipment.tracking_number || shipment.id.substring(0, 8).toUpperCase()}
                    </p>
                 </div>
              </div>

              <div className="space-y-10">
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Operational State</p>
                    <span className={`px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest border ${
                      shipment.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      shipment.status === 'in_transit' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {shipment.status.replace('_', ' ')}
                    </span>
                 </div>

                 <div className="space-y-4 pt-6 mt-6 border-t border-slate-200">
                    <div className="flex items-center gap-4 text-slate-400">
                       <Clock className="w-4 h-4 text-slate-300" />
                       <div className="text-[10px] font-bold uppercase tracking-widest">Modified: {new Date(shipment.updated_at).toLocaleDateString()}</div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400">
                       <Shield className="w-4 h-4 text-slate-300" />
                       <div className="text-[10px] font-bold uppercase tracking-widest">Enterprise Secured</div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="pt-10">
               <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Priority Index</p>
                  <p className="text-sm font-bold uppercase text-slate-900">{shipment.priority || 'NORMAL'}</p>
               </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 p-12 overflow-y-auto custom-scrollbar bg-white relative">
             <button
               onClick={onClose}
               className="absolute top-8 right-8 p-2 text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all hidden md:block"
             >
               <X className="w-6 h-6" />
             </button>

             {/* Header Section */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                <div>
                   <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                     <FileText className="w-3.5 h-3.5" /> Registry Entry
                   </h3>
                   <div className="space-y-1">
                      <p className="text-lg font-bold text-slate-900 tracking-tight">{shipment.shipper_name}</p>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest">{shipment.shipper_email || 'No Primary Contact'}</p>
                   </div>
                </div>
                <div>
                   <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                     <Truck className="w-3.5 h-3.5" /> Carrier Assigned
                   </h3>
                   <div className="space-y-1">
                      <p className="text-lg font-bold text-slate-900 tracking-tight">{shipment.carrier_name}</p>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest">LSP Partner Profile</p>
                   </div>
                </div>
             </div>

             {/* Route Visualization */}
             <div className="relative mb-12 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden group">
                <div className="relative z-10 flex items-start gap-8">
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-xl shadow-emerald-200 ring-4 ring-white"></div>
                      <div className="w-px h-16 border-l-2 border-dashed border-slate-300"></div>
                      <div className="w-4 h-4 rounded-full bg-blue-500 shadow-xl shadow-blue-200 ring-4 ring-white"></div>
                   </div>
                   <div className="flex-1 space-y-10">
                      <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Origin & Dispatch</p>
                         <p className="text-sm font-bold text-slate-900 tracking-tight">{shipment.pickup_location}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Final Destination</p>
                         <p className="text-sm font-bold text-slate-900 tracking-tight">{shipment.delivery_location}</p>
                      </div>
                   </div>
                </div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -mr-24 -mt-24 blur-3xl opacity-50"></div>
             </div>

             {/* Logistics Data Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
                   <div className="flex items-center gap-3 mb-3 text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Sync Date</span>
                   </div>
                   <p className="text-xs font-bold text-slate-900">{new Date(shipment.pickup_date).toLocaleDateString()}</p>
                </div>
                <div className="bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
                   <div className="flex items-center gap-3 mb-3 text-slate-400">
                      <Scale className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Net Mass</span>
                   </div>
                   <p className="text-xs font-bold text-slate-900">{shipment.weight_kg ? `${shipment.weight_kg} KG` : 'N/A'}</p>
                </div>
                <div className="bg-slate-100 p-5 rounded-3xl border border-slate-200">
                   <div className="flex items-center gap-3 mb-3 text-primary-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Valuation</span>
                   </div>
                   <p className="text-xs font-bold text-slate-900">{shipment.rate_amount || '0.00'} {shipment.currency || 'USD'}</p>
                </div>
             </div>

             {/* Notes / Technical Spec */}
             <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Terminal Execution Remarks</h4>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 italic text-sm text-slate-500 leading-relaxed">
                   {shipment.notes || "System record currently awaiting additional operational data inputs for specified registry artifact."}
                </div>
             </div>

             {/* Actions */}
             <div className="mt-12 flex gap-4">
               <button className="flex-1 py-4 bg-primary-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-primary-900/20 hover:bg-primary-500 transition-all flex items-center justify-center gap-3">
                 <ExternalLink className="w-4 h-4" />
                 Open Terminal View
               </button>
               <button onClick={onClose} className="px-10 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all">
                 Terminate
               </button>
             </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
