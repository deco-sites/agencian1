import { clx } from "site/sdk/clx.ts";

export default function PostLoadMoreButton({
  buttonText,
}: {
  buttonText: string;
}) {
  // TODO: Add the functionality to load more posts
  return (
    <button
      class={clx(
        "m-auto rounded-[100px] px-[30px] pt-[2px] leading-[48px] mobile:leading-[38px] bg-accent",
        "text-primary font-archimoto-medium text-16 mobile:text-14 font-black",
        "hover:bg-accent-hover duration-300",
      )}
    >
      {buttonText}
    </button>
  );
}
