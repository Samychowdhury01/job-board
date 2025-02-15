"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { startTransition, useEffect, useCallback } from "react";

export function ClientSideFilter({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { pending } = useFormStatus();

  const handleSubmit = useCallback((event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const queryString = new URLSearchParams(formData as any).toString();
    startTransition(() => {
      router.push(`/?${queryString}`);
    });
  }, [router]);

  useEffect(() => {
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", handleSubmit);
    }
    return () => {
      if (form) {
        form.removeEventListener("submit", handleSubmit);
      }
    };
  }, [handleSubmit]);

  useEffect(() => {
    const form = document.querySelector("form");
    if (form) {
      searchParams.forEach((value, key) => {
        const input = form.elements.namedItem(key) as HTMLInputElement | HTMLSelectElement;
        if (input) {
          if (input.type === "checkbox") {
            (input as HTMLInputElement).checked = value === "true";
          } else {
            input.value = value;
          }
        }
      });
    }
  }, [searchParams]);

  return (
    <>
      {children}
      {pending && <div className="mt-4 text-center">Loading...</div>}
    </>
  );
}