import { clx } from "$store/sdk/clx.ts";

interface Props {
  textCircleSm?: string;
}

function BlueBall({ textCircleSm }: Props) {
  function handleMouseMove(e: MouseEvent) {
    const { target } = e;
    if (!target) return;
  }

  return (
    <>
      <div
        id="blue-ball"
        onMouseMove={handleMouseMove}
        class={clx(
          `mobile:w-[100px] mobile:h-[100px] mobile:bottom-[30px] mobile:right-[40px] group-hover:visible duration-500 group-hover:opacity-100 
                invisible opacity-0 bg-secondary  w-[130px] h-[130px] absolute bottom-[40px] right-[50px] rounded-full flex items-center justify-center`,
        )}
      >
        <span class="mobile:text-[18px] text-[22px] font-archimoto-medium font-black leading-normal">
          {textCircleSm}
        </span>
      </div>
    </>
  );
}

export default BlueBall;
