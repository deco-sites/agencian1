import type { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "$store/sdk/clx.ts";
import BlueBall from "$store/components/ui/BlueBallAnimation.tsx";

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
  /**@title Número do WhatsApp */  
  phone?:string;
}

function TextWithImageCustom(
  { image, width, height, textLarge, textCircleLg, textCircleSm, phone }: Props,
) {
  return (
    <>
      <div
        class={clx(
          `mobile:flex-col mobile:mb-[115px] mobile:mt-[80px] text-[#ffffff] md:n1-container 
        md:px-[120px] relative flex items-center justify-between md:h-[540px]`,
        )}
      >
        {textLarge && (
          <h3
            class={clx(
              `n1-text-width-custom__title mobile:text-[44px] mobile:leading-[56px] mobile:w-[80%]
            tablet:text-[60px] md:text-[90px] md:max-w-[60%] font-archimoto-medium font-black`,
            )}
          >
            {textLarge}
          </h3>
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
          <BlueBall textCircleLg={textCircleLg} textCircleSm={textCircleSm} phone={phone} />
        )}
      </div>
    </>
  );
}

export default TextWithImageCustom;
