"use client";
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

const FormSubmitButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const {className, ...restProps} = props
  const { pending } = useFormStatus();
  return (
    <Button
      {...restProps}
      type="submit"
      className={cn("w-full", className)}
      disabled={restProps.disabled || pending}
    >
      <span className="flex items-center justify-center gap-1">
        {pending && <Loader size={16} className="animate-spin" />}
        {restProps.children}
      </span>
    </Button>
  );
};

export default FormSubmitButton;
