import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/** asChild 용 최소 Slot — 자식 엘리먼트에 props/className 을 합쳐 넘긴다. */
function Slot({
  children,
  className,
  ...props
}: React.ComponentProps<"button"> & { children?: React.ReactNode }) {
  if (!React.isValidElement(children)) return null;
  const child = children as React.ReactElement<{ className?: string }>;
  return React.cloneElement(child, {
    ...props,
    className: cn(className, child.props.className),
  } as Record<string, unknown>);
}

// 50대 수강생 기준: 터치 타깃 48px 이상, 아이콘 옆에 항상 한글 라벨.
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border-2 border-transparent font-semibold whitespace-nowrap transition-colors outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        dark: "bg-foreground text-background hover:bg-foreground/90",
        outline:
          "border-border bg-background text-foreground hover:bg-muted hover:border-foreground/40",
        soft: "bg-muted text-foreground hover:bg-border/60",
        ghost: "text-foreground hover:bg-muted",
        link: "text-primary underline underline-offset-4 hover:decoration-2",
      },
      size: {
        sm: "h-10 px-4 text-base [&_svg]:size-4",
        default: "h-12 px-5 text-base [&_svg]:size-5",
        lg: "h-14 px-6 text-lg [&_svg]:size-5",
        xl: "h-16 px-7 text-xl [&_svg]:size-6",
        icon: "size-12 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
