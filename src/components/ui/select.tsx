"use client";

import * as React from "react";
import { isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";

// Create a Context for `indicatorPosition` and `indicator` control
const SelectContext = React.createContext<{
  indicatorPosition: "left" | "right";
  indicatorVisibility: boolean;
  indicator: ReactNode;
}>({ indicatorPosition: "left", indicator: null, indicatorVisibility: true });

// Root Component
const Select = ({
  indicatorPosition = "left",
  indicatorVisibility = true,
  indicator,
  ...props
}: {
  indicatorPosition?: "left" | "right";
  indicatorVisibility?: boolean;
  indicator?: ReactNode;
} & React.ComponentProps<typeof SelectPrimitive.Root>) => {
  return (
    <SelectContext.Provider
      value={{ indicatorPosition, indicatorVisibility, indicator }}
    >
      <SelectPrimitive.Root {...props} />
    </SelectContext.Provider>
  );
};

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

// Define size variants for SelectTrigger
const selectTriggerVariants = cva(
  `
    flex w-full items-center justify-between border border-amber-300/70 bg-white text-zinc-950 shadow-[0_0_18px_rgba(245,158,11,0.08)]
    outline-none transition-all data-placeholder:text-zinc-400 focus-visible:border-amber-300 focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-amber-300/70 disabled:cursor-not-allowed disabled:opacity-50
    dark:bg-black dark:text-zinc-100 dark:shadow-[0_0_20px_rgba(250,204,21,0.08)] [&>span]:line-clamp-1
    aria-invalid:border-red-400 aria-invalid:ring-red-400/20
    [[data-invalid=true]_&]:border-red-400 [[data-invalid=true]_&]:ring-red-400/20
  `,
  {
    variants: {
      size: {
        sm: "h-9 gap-1 rounded-xl px-3 text-xs",
        md: "h-11 gap-1.5 rounded-2xl px-3 text-sm",
        lg: "h-12 gap-2 rounded-2xl px-4 text-sm",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

export interface SelectTriggerProps
  extends
    React.ComponentProps<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

function SelectTrigger({
  className,
  children,
  size,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(selectTriggerVariants({ size }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="-me-0.5 size-4 text-amber-600 opacity-90 dark:text-yellow-300" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-amber-600 dark:text-yellow-300",
        className,
      )}
      {...props}
    >
      <ChevronUp className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-amber-600 dark:text-yellow-300",
        className,
      )}
      {...props}
    >
      <ChevronDown className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-2xl border border-amber-300/70 bg-white text-zinc-950 shadow-[0_0_30px_rgba(245,158,11,0.18)] dark:bg-black dark:text-zinc-100 dark:shadow-[0_0_34px_rgba(250,204,21,0.18)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1.5 data-[side=left]:-translate-x-1.5 data-[side=right]:translate-x-1.5 data-[side=top]:-translate-y-1.5",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1.5",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "py-1.5 ps-8 pe-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-yellow-300",
        className,
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  const { indicatorPosition, indicatorVisibility, indicator } =
    React.useContext(SelectContext);

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-xl py-2 text-sm font-bold text-zinc-800 outline-hidden transition hover:bg-amber-100 focus:bg-amber-300 focus:text-black data-disabled:pointer-events-none data-disabled:opacity-50 dark:text-zinc-200 dark:hover:bg-yellow-400/10 dark:focus:bg-yellow-400 dark:focus:text-black",
        indicatorPosition === "left" ? "ps-8 pe-2" : "pe-8 ps-2",
        className,
      )}
      {...props}
    >
      {indicatorVisibility &&
        (indicator && isValidElement(indicator) ? (
          indicator
        ) : (
          <span
            className={cn(
              "absolute flex size-3.5 items-center justify-center",
              indicatorPosition === "left" ? "start-2" : "end-2",
            )}
          >
            <SelectPrimitive.ItemIndicator>
              <Check className="size-4 text-amber-700 dark:text-yellow-300" />
            </SelectPrimitive.ItemIndicator>
          </span>
        ))}
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectIndicator({
  children,
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ItemIndicator>) {
  const { indicatorPosition } = React.useContext(SelectContext);

  return (
    <span
      data-slot="select-indicator"
      className={cn(
        "absolute flex top-1/2 -translate-y-1/2 items-center justify-center",
        indicatorPosition === "left" ? "start-2" : "end-2",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator>{children}</SelectPrimitive.ItemIndicator>
    </span>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1.5 my-1.5 h-px bg-amber-300/50", className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectIndicator,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
