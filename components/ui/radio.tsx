import * as React from "react";
import { cn } from "./button";

interface RadioGroupContextType {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextType | undefined>(undefined);

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  children: React.ReactNode;
}

export function RadioGroup({ value, onChange, name, children, className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onChange, name }}>
      <div className={cn("flex flex-col gap-2", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, value: propsValue, checked: propsChecked, onChange: propsOnChange, name: propsName, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext);
    
    const isChecked = context 
      ? context.value === propsValue 
      : propsChecked;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      propsOnChange?.(e);
      if (context && propsValue !== undefined) {
        context.onChange?.(propsValue);
      }
    };

    return (
      <label className="flex items-center gap-3 cursor-pointer group w-fit">
        <div className="relative flex items-center justify-center">
          <input
            type="radio"
            className="peer sr-only"
            ref={ref}
            value={propsValue}
            checked={isChecked}
            onChange={handleChange}
            name={context?.name || propsName}
            {...props}
          />
          <div className={cn(
            "w-5 h-5 rounded-full border-2 border-muted-foreground/30 bg-accent/40 transition-all duration-200",
            "peer-checked:bg-primary peer-checked:border-primary peer-focus-visible:ring-4 peer-focus-visible:ring-primary/20",
            "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
            "group-hover:border-primary/50 peer-checked:group-hover:border-primary",
            className
          )} />
          <div className="absolute w-2 h-2 bg-primary-foreground rounded-full opacity-0 scale-50 transition-all duration-300 peer-checked:opacity-100 peer-checked:scale-100" />
        </div>
        {label && <span className="text-sm font-bold text-foreground select-none">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = "Radio";
