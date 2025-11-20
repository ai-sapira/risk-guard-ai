
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: (Option | string)[];
  placeholder?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  className = "", 
  label,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const normalizedOptions: Option[] = options.map(opt => 
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  );

  const selectedOption = normalizedOptions.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
          {label}
        </label>
      )}
      <button
        type="button"
        disabled={disabled}
        className={`w-full h-10 px-3 bg-white border rounded-md text-[13px] flex items-center justify-between transition-all ${
          isOpen 
            ? 'border-blue-500 ring-1 ring-blue-500 shadow-sm' 
            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`font-medium truncate mr-2 ${selectedOption ? 'text-slate-900' : 'text-slate-400'}`}>
          {selectedOption ? selectedOption.label : placeholder || 'Select...'}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-xl z-[100] max-h-60 overflow-y-auto animate-enter origin-top p-1">
          {normalizedOptions.map((option) => (
            <div
              key={option.value}
              className={`px-3 py-2 rounded-sm text-[13px] font-medium cursor-pointer flex items-center justify-between transition-colors ${
                option.value === value 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <span className="truncate">{option.label}</span>
              {option.value === value && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-2" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
