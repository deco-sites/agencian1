import { type Signal } from "@preact/signals";
import { clx } from "site/sdk/clx.ts";

export default function Button(
  { submitButtonText, isLoading }: {
    submitButtonText: string;
    isLoading: Signal<boolean>;
  },
) {
  return (
    <button
      type="submit"
      disabled={isLoading.value}
      class={clx(
        "w-fit px-[20px] pt-[4px] rounded-[100px] leading-[36px]",
        "bg-accent hover:bg-accent-hover text-primary duration-300",
        "text-14 font-archimoto-medium font-black",
        "flex items-center justify-center gap-2",
        isLoading.value && "opacity-50 cursor-not-allowed",
      )}
    >
      {submitButtonText}
    </button>
  );
}
