import { FnContext, SectionProps } from "deco/mod.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

/**@titleBy alt */
interface ImageGeneric {
  /**@title Imagem */
  src?: ImageWidget;
  /**@title Largura da Imagem */
  width?: number;
  /**@title Altura da Imagem */
  height?: number;
}

interface ImageDevice {
  /**@title Nome da Imagem */
  alt?: string;
  /**@title Imagem Desktop */
  desktop?: ImageGeneric;
  /**@title Imagem Mobile */
  mobile?: ImageGeneric;
}

interface Props {
  /**@title Icon */
  /** @maxItems 1 */
  icon?: ImageDevice;
  /**@title Título */
  /**@format textarea */
  title?: string;
  /**@title Texto */
  /**@format textarea */
  paragraph?: string;
  /**@title Imagem de fundo */
  backgroundImage?: ImageGeneric;
  /**@title Ativar imagem de fundo? */
  activeBackground?: boolean;

  button?: {
    textButton: string;
    link: string;
  };

  layout?: {
    /** @tilte Margin top */
    /** @description Espaçamento entre uma section e outra ex:10px*/
    marginTop?: string;

    /** @tilte Margin Bottom*/
    /** @description espaçamento entre uma section e outra ex:10px*/
    marginBottom?: string;

    /** @description espaçamento entre uma section e outra ex:10px*/
    marginTopMobile?: string;

    /** @description espaçamento entre uma section e outra ex:10px*/
    marginBottomMobile?: string;
  };
}

function IconTitleAndTex(props: SectionProps<ReturnType<typeof loader>>) {
  const {
    icon,
    title,
    paragraph,
    backgroundImage,
    activeBackground,
    device,
    button,
    layout,
  } = props;
  const validBackground = device == "desktop" && activeBackground &&
    backgroundImage && backgroundImage?.src && backgroundImage?.width &&
    backgroundImage?.height;

  const isDesktop = device === "desktop";

  const { marginBottom, marginTop, marginBottomMobile, marginTopMobile } =
    layout ?? {};

  return (
    <>
      <div
        class="text-[#ffffff]"
        style={isDesktop
          ? { marginTop: `${marginTop}`, marginBottom: `${marginBottom}` }
          : {
            marginTop: `${marginTopMobile || marginTop}`,
            marginBottom: `${marginBottomMobile || marginBottom}`,
          }}
      >
        {validBackground && (
          <div class="relative">
            <div
              class="absolute top-0 left-0"
              style={{
                backgroundImage: "url(" + backgroundImage.src + ")",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: backgroundImage.height + "px",
              }}
            >
            </div>
          </div>
        )}
        <div
          class="md:n1-container md:px-[120px] relative z-1 flex flex-col justify-center items-center"
          style={{
            height: `${
              validBackground ? backgroundImage.height + "px" : "initial"
            }`,
            zIndex: `${validBackground ? 0 : "initial"}`,
          }}
        >
          <div class="flex justify-center items-center">
            {icon && (
              <Picture>
                {icon?.desktop && icon.desktop?.src && icon.desktop?.width &&
                  icon?.desktop?.height && (
                  <Source
                    src={icon.desktop.src}
                    width={Number(icon.desktop.width)}
                    height={Number(icon.desktop.height)}
                    media="(min-width: 768px)"
                  />
                )}

                {icon?.mobile && icon.mobile?.src && icon.mobile?.width &&
                  icon?.mobile?.height && (
                  <Source
                    src={icon.mobile.src}
                    width={Number(icon.mobile.width)}
                    height={Number(icon.mobile.height)}
                    media="(max-width: 767px)"
                  />
                )}
                {icon?.desktop && icon.desktop?.src && icon.desktop?.width &&
                  icon?.desktop?.height && (
                  <img
                    src={icon.desktop.src}
                    alt={icon?.alt ?? "Ícone Top"}
                    loading="lazy"
                  />
                )}
              </Picture>
            )}
          </div>
          <div class="mobile:px-[20px]">
            {title && (
              <h1 class="md:text-32 mobile:text-20 md:max-w-[70%] my-0 mx-auto font-archimoto-medium font-black text-center md:mb-[16px]">
                {title}
              </h1>
            )}
            {paragraph && (
              <p class="text-[16px] mobile:text-14 mobile:max-w-[95%] mobile:leading-[22.4px] mobile:mt-[10px] 
                                leading-[25.6px] font-normal text-center md:max-w-[70%] my-0 mx-auto">
                {paragraph}
              </p>
            )}
          </div>

          {button && (
            <a
              href={button.link}
              aria-label={`link fale conosco`}
              class="rounded-[100px] w-[316px] lg:w-[313px] h-[51px] flex items-center justify-center text-center mt-5 hover:brightness-90 bg-[#F6AB00] mb-20 lg:mb-0 "
            >
              <span class="text-[#0C1F59] lg:text-16 font-archimoto-black pt-[1px] font-black">
                {button.textButton}
              </span>
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};

export default IconTitleAndTex;
