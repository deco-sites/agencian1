import { clx } from "site/sdk/clx.ts";

interface Props extends preact.JSX.HTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function SidebarInput(
  { placeholder, className, ...props }: Props,
) {
  return (
    <input
      {...props}
      placeholder={placeholder}
      class={clx(
        "rounded-[100px] py-[14px] pr-[20px] max-h-[48px] pl-4",
        "w-full bg-white font-normal text-primary text-[14px]",
        "leading-[18.2px] font-noto-sans outline-none",
        className,
      )}
    />
  );
}
