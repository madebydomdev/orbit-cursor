import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export function availableVariants<T extends readonly string[]>(
  ...keys: T
): Record<T[number], string> {
  return Object.fromEntries(keys.map((key) => [key, ""])) as Record<
    T[number],
    string
  >;
}

export const focusStyles =
  "outline-none ring-content-fg ring-offset-1 ring-offset-content data-[focus-visible]:ring-1";
