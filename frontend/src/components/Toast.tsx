import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
  type?: "success" | "error" | "info";
}

export const Toast: React.FC<ToastProps> = ({
  message,
  onClose,
  type = "success",
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-4 px-8 py-5 rounded-[2rem] shadow-2xl border backdrop-blur-xl ${
        type === "success"
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-rose-500 border-rose-600 text-white"
      }`}
    >
      {type === "success" ? (
        <CheckCircle2 className="w-6 h-6 text-primary-500" />
      ) : (
        <AlertCircle className="w-6 h-6" />
      )}
      <span className="text-xs font-bold tracking-[0.1em] uppercase">
        {message}
      </span>
      <button
        onClick={onClose}
        className="p-2 hover:bg-white/10 rounded-xl transition-colors ml-4"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
