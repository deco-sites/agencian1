import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { clx } from "$store/sdk/clx.ts";
import { FnContext, SectionProps } from "deco/mod.ts";
import EllipseSnippet from "../../components/ui/EllipseSnippet.tsx";

/**@titleBy alt */
interface ImageGeneric {
  /**@title Nome da Imagem */
  alt?: string;
  /**@title Imagem */
  src?: ImageWidget;
  /**@title Largura da Imagem */
  width?: number;
  /**@title Altura da Imagem */
  height?: number;
}

interface ImageDevice {
  /**@title Desktop */
  desktop?: ImageGeneric;
  /**@title Mobile */
  mobile?: ImageGeneric;
}

/**@titleBy textLink */
interface Link {
  /**@title URL */
  /**@description (ex: https://agencian1.com.br/) */
  url?: string;
  /**@title Texto do botão */
  textLink?: string;
}

interface EllipseProps {
  desktop?: boolean;
  mobile?: boolean;
}

interface Ellipse {
  /**@title Ellipse 01 */
  ellipse01?: EllipseProps;
  /**@title Ellipse 02 */
  ellipse02?: EllipseProps;
  /**@title Ellipse 03 */
  ellipse03?: EllipseProps;
  /**@title Ellipse 04 */
  ellipse04?: EllipseProps;
}

interface Props {
  /**@title Espaço entre Bloco de texto e imagem (somente números) */
  /** @description (ex: 50 - somente números, o resultado é pixel) */
  spaceTextAndImage?: number;
  /**@title Largura do Bloco de Texto (somente números) */
  /** @description (ex: 50 - somente números, o resultado é porcentagem) */
  widthBlock?: number;
  /**@title Máximo de largura da descrição (somente números)*/
  /** @description (ex: 50 - somente números, o resultado é porcentagem) */
  maxWidthText?: number;
  /**@title Título */
  /**@format html */
  title?: string;
  /**@title Descrição */
  /**@format html */
  description?: string;
  /**@title Ícone */
  /**@maxItems 4 */
  iconWidthText?: ImageGeneric[];
  /**@title Fonte dos textos dos ícones */
  fontIconText?: "Noto Sans" | "Archimoto V01";
  /**@title Habilitar Negrito para fonte dos textos dos ícones? */
  activeBold?: boolean;
  /**@title Habilitar grid para os ícones? */
  gridActive?: boolean;
  /**@title Quantidade de colunas do grid */
  /**@description (opção somente se habilitar o grid) */
  gridColCustom?: 2 | 3 | 4;
  /**@title Imagem */
  image?: ImageDevice;
  /**@title Habilitar posição manual da imagem */
  activePositionManualImage?: boolean;
  /**@title Posição Horizontal (somente números) */
  /**@description (obs: somente se habilitar posição manual, o resultado é pixel) */
  positionImageX?: number;
  /**@title Posição Vertical (somente números) */
  /**@description (obs: somente se habilitar posição manual, o resultado é pixel) */
  positionImageY?: number;
  /**@title Link */
  link?: Link;
  /**@title Inverter Imagem */
  /**@description (Desktop) */
  flexRow: "Esquerdo" | "Direito";
  /**@title Inverter Imagem */
  /**@description (Mobile) */
  flexCol?: "Superior" | "Inferior";
  /**@title Desativar imagem de fundo? */
  ellipse?: Ellipse;
}

const FONTICONTEXT = {
  "Noto Sans": "font-noto-sans",
  "Archimoto V01": "font-archimoto-medium",
};

const GRIDCOLCUSTOM = {
  2: "xl:grid-cols-2-auto",
  3: "xl:grid-cols-3-auto",
  4: "xl:grid-cols-4-auto",
};

const FLEXROW = {
  "Esquerdo": "xl:flex-row-reverse",
  "Direito": "xl:flex-row",
};

const FLEXCOL = {
  "Inferior": "mobile:flex-col",
  "Superior": "mobile:flex-col-reverse",
};

function TitleTextIconsAndImage(
  props: SectionProps<ReturnType<typeof loader>>,
) {
  const {
    title,
    description,
    iconWidthText,
    fontIconText,
    activeBold,
    gridActive,
    gridColCustom,
    image,
    activePositionManualImage,
    positionImageX,
    positionImageY,
    link,
    spaceTextAndImage,
    widthBlock,
    maxWidthText,
    flexRow,
    flexCol,
    ellipse,
    device,
  } = props;

  return (
    <>
      <div class="relative xl:py-[80px] xl:mb-[32px] mobile:px-[20px]">
        <EllipseSnippet ellipse={ellipse} />

        <div class="md:n1-container md:px-[120px] relative">
          <div
            class={clx(
              `${flexRow ? FLEXROW[flexRow] : ""} ${
                flexCol ? FLEXCOL[flexCol] : "flex-col-reverse"
              }
                        text-[#ffffff] flex items-center portatil:flex-col portatil:my-[34px] mobile:gap-y-[50px]`,
            )}
            style={{
              columnGap: device === "desktop" && spaceTextAndImage
                ? spaceTextAndImage + "px"
                : "30px",
            }}
          >
            <div
              class="mobile:w-full"
              style={{
                width: device === "desktop" && widthBlock
                  ? widthBlock + "%"
                  : "",
              }}
            >
              <div class="">
                <div class="md:ml-[20px]">
                  {title && title !== '<p><br data-mce-bogus="1"></p>' && (
                    <div
                      class={clx(`[&_*]:font-archimoto-medium [&_*]:font-black
                                            mobile:[&_*]:text-24 [&_*]:tablet:text-34 [&_*]:md:text-48`)}
                      dangerouslySetInnerHTML={{ __html: title }}
                    >
                    </div>
                  )}
                  {description &&
                    description !== '<p><br data-mce-bogus="1"></p>' && (
                    <div
                      class={clx(
                        `[&_*]:font-noto-sans [&_*]:text-16 [&_*]:mobile:text-14 
                                                md:mt-[43px] md:mb-[50px] mobile:mt-[20px] mobile:mb-[30px]`,
                      )}
                      style={{
                        maxWidth: device === "desktop" && maxWidthText
                          ? maxWidthText + "%"
                          : "",
                      }}
                      dangerouslySetInnerHTML={{ __html: description }}
                    >
                    </div>
                  )}
                </div>

                <ul
                  class={clx(`${
                    gridActive && gridColCustom
                      ? "grid " + GRIDCOLCUSTOM[gridColCustom]
                      : ""
                  } 
                                    items-center flex flex-col xl:flex-wrap xl:flex-row`)}
                >
                  {iconWidthText &&
                    iconWidthText?.map(({ alt, src, width, height }) => {
                      return (
                        <>
                          {alt && src && width && height && (
                            <li
                              class={clx(
                                `w-full xl:w-auto justify-start rounded-[20px] 
                                                        flex items-center xl:justify-center py-[14px] px-[20px] md:mx-[16px] my-[9px]
                                                        bg-[linear-gradient(161deg,_rgba(255,_255,_255,_0.10)_0%,_rgba(255,_255,_255,_0.05)_101.7%)] 
                                                        [box-shadow:0px_20.64px_30px_0px_rgba(0,_0,_0,_0.10)] 
                                                        backdrop-filter backdrop-blur-[17px]`,
                              )}
                            >
                              <img
                                src={src}
                                width={width}
                                height={height}
                                alt={alt}
                              />
                              <span
                                class={clx(`text-16 ${
                                  fontIconText
                                    ? FONTICONTEXT[fontIconText]
                                    : "font-noto-sans"
                                } 
                                                                ${
                                  activeBold ? "font-black" : "font-normal"
                                } ml-[20px]`)}
                              >
                                {alt}
                              </span>
                            </li>
                          )}
                        </>
                      );
                    })}
                </ul>
                {link && (
                  <div class="flex md:mt-[50px] mobile:mt-[30px] mobile:justify-center">
                    <a
                      href={`${link?.url ? link.url : "javascript:void(0)"}`}
                      class={clx(
                        `bg-secondary mobile:py-[10px] mobile:px-[20px] py-[20px] px-[30px] rounded-[100px] hover:bg-[#63D5E1] duration-300`,
                      )}
                      style={{
                        pointerEvents: `${link?.url ? "all" : "none"}`,
                      }}
                    >
                      <span class="mobile:text-14 text-16 text-primary font-archimoto-medium font-black">
                        {link?.textLink}
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </div>
            {image && (
              <div
                class={clx(`${
                  activePositionManualImage
                    ? "xl:absolute portatil:min-w-[50%]"
                    : ""
                }
                                tablet:mb-[50px]`)}
                style={{
                  right: `${
                    device === "desktop" && activePositionManualImage
                      ? positionImageX + "px"
                      : 0
                  }`,
                  top: `${
                    device === "desktop" && activePositionManualImage
                      ? positionImageY + "px"
                      : 0
                  }`,
                }}
              >
                <Picture>
                  {image?.mobile?.src && (
                    <Source
                      media="(max-width: 767px)"
                      src={image.mobile.src}
                      width={Number(image.mobile?.width)}
                      height={Number(image.mobile?.height)}
                    />
                  )}
                  {image?.desktop?.src && (
                    <Source
                      media="(min-width: 768px)"
                      src={image.desktop.src}
                      width={Number(image.desktop?.width)}
                      height={Number(image.desktop?.height)}
                    />
                  )}
                  <img
                    src={image.desktop?.src}
                    width={image.desktop?.width}
                    height={image.desktop?.height}
                  />
                </Picture>
              </div>
            )}
          </div>
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

export default TitleTextIconsAndImage;
