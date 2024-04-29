import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {}

const Tabs = ({ className, children, ...props }: TabsProps) => {
  return (
    <div
      className={twMerge(
        "flex w-full rounded-full bg-surface-container-high p-1 font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface TabProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  group: string;
}

const Tab = ({ name, group, className, children, ...props }: TabProps) => {
  return (
    <div
      className={twMerge(
        "relative flex w-1/3 items-center justify-center rounded-full py-2 capitalize has-[:checked]:interactive-bg-primary-container",
        className,
      )}
      {...props}
    >
      <input
        type="radio"
        name={group}
        id={name}
        className="absolute left-0 top-0 size-full opacity-0"
      />
      <label htmlFor={name}>
        {name} {children}
      </label>
    </div>
  );
};

export { Tabs, Tab };
