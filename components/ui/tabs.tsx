import { HTMLAttributes, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {}

const Tabs = ({ className, children, ...props }: TabsProps) => {
  return (
    <div
      className={twMerge(
        "flex w-full rounded-full bg-surface-container-high p-1 font-medium has-[:disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface TabProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  group: string;
}

const Tab = ({ name, group, className, children, ...props }: TabProps) => {
  return (
    <div
      className={twMerge(
        "relative flex w-1/3 items-center justify-center rounded-full py-2 capitalize has-[:checked]:interactive-bg-primary-container disabled:pointer-events-none",
        className,
      )}
    >
      <input
        type="radio"
        name={group}
        id={name}
        className="absolute left-0 top-0 size-full opacity-0"
        {...props}
      />
      <label htmlFor={name}>
        {name} {children}
      </label>
    </div>
  );
};

export { Tabs, Tab };
