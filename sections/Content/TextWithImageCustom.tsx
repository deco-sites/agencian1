import type { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "$store/sdk/clx.ts";
// import BlueBall from "$store/components/ui/BlueBall.tsx";

interface Props {
  /**@title Imagem */
  image?: ImageWidget;
  /**@title Largura da imagem */
  width?: number;
  /**@title Altura da imagem */
  height?: number;
  /**@title Texto maior */
  textLarge?: string;
  /**@title Texto circulo maior */
  textCircleLg?: string;
  /**@title Texto circulo menor */
  textCircleSm?: string;
}

function TextWithImageCustom(
  { image, width, height, textLarge, textCircleLg, textCircleSm }: Props,
) {
  function handleMouseMove(e: MouseEvent) {
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
        class={clx(
          `mobile:flex-col mobile:mb-[115px] mobile:mt-[80px] text-[#ffffff] md:n1-container 
        md:px-[120px] relative flex items-center justify-between md:h-[540px]`,
        )}
      >
        {textLarge && (
          <div
            class={clx(
              `n1-text-width-custom__title mobile:text-[44px] mobile:leading-[56px] mobile:w-[80%]
            tablet:text-[60px] md:text-[90px] md:max-w-[60%] font-archimoto-medium font-black`,
            )}
          >
            {textLarge}
          </div>
        )}
        {image && width && height && (
          <img
            src={image}
            class={clx(
              `mobile:w-[30%] mobile:-rotate-[70deg] mobile:[bottom:initial] mobile:top-[130px] mobile:[left:initial] mobile:right-[20px]
            absolute left-[50%] -bottom-[30px]`,
            )}
            width={width}
            height={height}
          />
        )}
        {textCircleLg && textCircleSm && (
          <div
            class="ball mobile:mt-[60px] relative group hover:cursor-none"
            onMouseMove={handleMouseMove}
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
          </div>
        )}
      </div>
    </>
  );
}

export default TextWithImageCustom;
