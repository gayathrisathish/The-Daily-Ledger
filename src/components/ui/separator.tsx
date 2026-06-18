import * as React from "react";

import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <hr
      className={cn(
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        "border-0 bg-border",
        className
      )}
      {...props}
    />
  );
}