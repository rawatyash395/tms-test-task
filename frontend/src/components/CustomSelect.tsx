import React, { useState, useRef, useEffect, memo } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  icon?: React.ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = memo(
  ({ label, options, value, onChange, className = "", icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const selectedOption =
      options.find((opt) => opt.value === value) || options[0];

    return (
      <div className={`space-y-2 relative ${className}`} ref={containerRef}>
        {label && (
          <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
            {icon} {label}
          </label>
        )}

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 flex items-center justify-between text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-sm text-left shadow-sm hover:border-slate-400 group"
        >
          <span className="truncate">{selectedOption?.label}</span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Simplified CSS-based Dropdown for better performance */}
        <div
          className={`absolute z-[300] w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden py-2 transition-all duration-200 origin-top
          ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }`}
        >
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-sm font-medium text-left flex items-center justify-between transition-colors
                ${
                  option.value === value
                    ? "bg-primary-50 text-primary-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{option.label}</span>
                {option.value === value && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

CustomSelect.displayName = "CustomSelect";
