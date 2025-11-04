import type React from "react";
import { cn } from "@/lib/utils";

export const LogoIcon = (props: React.ComponentProps<"h1">) => {
  const { className, ...rest } = props;
  return (
    <h1 {...rest} className={cn("text-2xl font-bold", className)}>ddettaa</h1>
  );
};

export const WordmarkIcon = (props: React.ComponentProps<"h1">) => {
  const { className, ...rest } = props;
  return (
    <h1 {...rest} className={cn("text-2xl font-bold", className)}>ddettaa</h1>
  );
};