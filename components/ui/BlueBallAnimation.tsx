import { clx } from "$store/sdk/clx.ts";

interface Props {
  textCircleLg?: string;
  textCircleSm?: string;
  phone?: string;
}

function BlueBall({ textCircleLg, textCircleSm, phone }: Props) {
  function handlePointerMove(e: PointerEvent) {
    const { target } = e;
    if (!target) return;

    if (target && target instanceof HTMLElement) {
      const smBall = target?.querySelector<HTMLElement>("#ball-sm");
      const horizontal = e?.layerX;
      const vertical = e?.layerY;

      if (horizontal && vertical && smBall) {
        smBall?.setAttribute(
          "style",
          `position:absolute; left: ${horizontal + "px"}; top:${
            vertical + "px"
          }`,
        );
      }
    }
  }

  return (
    <>
      <div
        class="ball mobile:mt-[60px] relative group hover:cursor-none"
        onPointerMove={handlePointerMove}
      >
        <a
          href={phone
            ? `https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`
            : "javascript:void(0)"}
          style={{ cursor: phone ? "pointer" : "default" }}
          target={phone ? "_blank" : ""}
        >
          <div
            id="ball-xg"
            class={clx(
              `relative overflow-hidden group-hover:bg-transparent duration-500 group-hover:border-[#ffffff] mobile:w-[222px] border-2 border-transparent 
              mobile:h-[222px] bg-accent w-[300px] h-[300px] rounded-full flex items-center justify-center`,
            )}
          >
            <span class="group-hover:text-[#ffffff] mobile:text-[22px] text-[28px] text-primary font-archimoto-medium font-black leading-normal">
              {textCircleLg}
            </span>
            <div
              id="ball-sm"
              class={clx(
                `ball-sm mobile:w-[100px] mobile:h-[100px] mobile:bottom-[30px] mobile:right-[40px] group-hover:visible group-hover:opacity-100 
              invisible opacity-0 bg-secondary  w-[130px] h-[130px] absolute bottom-[40px] right-[50px] rounded-full flex items-center justify-center`,
              )}
            >
              <span class="mobile:text-[18px] text-[22px] font-archimoto-medium font-black leading-normal">
                {textCircleSm}
              </span>
            </div>
          </div>
        </a>
      </div>
    </>
  );
}

export default BlueBall;
