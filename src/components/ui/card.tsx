import * as React from "react";

import { cn } from "@/lib/utils";

// 얇은 선은 50대 화면에서 잘 안 보인다 → border-2 기본.
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-2xl border-2 border-border bg-card text-card-foreground",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6 pt-6", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-xl font-bold tracking-tight sm:text-2xl", className)}
      {...props}
    />
  );
}

function CardBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6 py-6", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardBody };
