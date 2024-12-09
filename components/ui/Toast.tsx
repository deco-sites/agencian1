import { useEffect } from "preact/hooks";
import { useComputed, useSignal } from "@preact/signals";
import { JSX } from "preact";
import { clx } from "site/sdk/clx.ts";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
}

const positionClasses = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-[50%] -translate-x-[50%] transform fixed",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-[50%] -translate-x-[50%] transform fixed",
  "bottom-right": "bottom-4 right-4",
} as const;

const typeClasses = {
  success: "text-success border border-success",
  error: "text-error border border-error",
  warning: "text-warning border border-warning",
  info: "text-info border border-info",
} as const;

export default function Toast({
  message,
  type = "info",
  duration = 5000,
  position = "top-center",
}: ToastProps): JSX.Element | null {
  const isVisible = useSignal(true);
  const shouldRender = useSignal(true);

  const computedClasses = useComputed(() =>
    clx(
      "bg-white",
      "fixed z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-sm transition-all duration-300",
      "sm:w-auto w-[90vw] md:max-w-xl",
      positionClasses[position],
      typeClasses[type],
      isVisible.value ? "opacity-100" : "opacity-0 pointer-events-none",
    )
  );

  useEffect(() => {
    let unmountTimer: ReturnType<typeof globalThis.setTimeout>;

    isVisible.value = true;
    const fadeOutTimer = globalThis.setTimeout(() => {
      isVisible.value = false;
      unmountTimer = globalThis.setTimeout(() => {
        shouldRender.value = false;
      }, 300);
    }, duration);

    return () => {
      globalThis.clearTimeout(fadeOutTimer);
      globalThis.clearTimeout(unmountTimer);
    };
  }, [duration, message]);

  if (!shouldRender.value) return null;

  const handleClose = () => {
    isVisible.value = false;
    globalThis.setTimeout(() => {
      shouldRender.value = false;
    }, 300);
  };

  return (
    <div
      class={computedClasses.value}
      role="alert"
    >
      <p class="text-sm font-medium">{message}</p>
      <button
        onClick={handleClose}
        class="ml-auto hover:opacity-80"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}
