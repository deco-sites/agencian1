import { clx } from "site/sdk/clx.ts";

export default function PostButton(
  { link, text }: { link: string; text: string },
) {
  return (
    <a
      href={link}
      class={clx(
        "w-fit px-[20px] pt-[4px] border border-white rounded-[100px]",
        "text-14 text-white font-archimoto-medium font-black duration-300",
        "leading-[34px] hover:bg-white hover:text-[#585858]",
        "mt-auto",
      )}
    >
      {text}
    </a>
  );
}
