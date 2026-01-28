import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  desc: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  desc,
  onConfirm,
  onCancel,
  isLoading,
}) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white rounded-[3rem] p-8 max-w-lg w-full shadow-2xl border border-slate-100"
        >
          <div className="w-20 h-20 rounded-[1.5rem] bg-rose-50 flex items-center justify-center text-rose-500 mb-8 mx-auto shadow-sm shadow-rose-100">
            <Trash2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-3 tracking-tighter">
            {title}
          </h3>
          <p className="text-slate-500 text-center font-medium text-sm mb-10 leading-relaxed px-4">
            {desc}
          </p>
          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-[1.5] py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-rose-900/20 transition-all disabled:opacity-50"
            >
              {isLoading ? "Processing..." : "Delete Permanently"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
