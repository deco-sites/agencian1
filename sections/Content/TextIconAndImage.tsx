import { FnContext, SectionProps } from "deco/mod.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import LinkWithOptionArrow from "$store/components/ui/LinkWithOptionArrow.tsx";
import { clx } from "$store/sdk/clx.ts";

interface CtaProps {
  /** @title link */
  href?: string;
  /** @title Texto do link */
  text?: string;
  /** @title Cor do botão transparent */
  colorLink?: boolean;
}

/** @titleBy name */
interface ImageGeneric {
  /** @title Imagem */
  src?: ImageWidget;
  /** @title Largura da imagem */
  width?: string;
  /** @title Altura da imagem */
  height?: string;
}

/** @titleBy name */
interface SubtitleWithTag {
  /** @title Nome da Tag */
  name?: string;
  /** @title Tags */
  tag: {
    /** @title Desktop */
    desktop?: ImageGeneric;
    /** @title Mobile */
    mobile?: ImageGeneric;
  };
}

/** @titleBy name */
interface MiniImage {
  /** @title Nome da mini imagem */
  name?: string;
  /** @title Mini imagem */
  image: {
    /** @title Desktop */
    desktop?: ImageGeneric;
    /** @title Mobile */
    mobile?: ImageGeneric;
  };
}

interface ImagemDeskAndMobile {
  desktop?: ImageGeneric;
  mobile?: ImageGeneric;
  /** @title Ativar eclipse na imagem de fundo? */
  activeEclipse?: boolean;
}

interface BlockTextProps {
  /** @title Largura do bloco */
  /** @description (ex: 50 - somente números, o resultado é porcentagem) */
  widthBlock: number;
  /** @title Icon */
  icon?: ImageWidget;
  /** @title Nome do ícon */
  nameIcon?: string;
  /** @title Subtítulo */
  /** @format html */
  subtitle: string;
  /** @title Descrição */
  /** @format html */
  description: string;
  /** @title Tags */
  /** @maxItems 2 */
  subtitleWithTags?: SubtitleWithTag[];
  /** @title Mini imagens */
  /** @maxItems 3 */
  miniImage?: MiniImage[];
  /** @title Links? */
  cta?: CtaProps;

  /** @title Ativar eclipse no texto? */
  activeEclipseText?: boolean;
}

interface DisabledProps {
  /** @title Ícones */
  icon?: boolean;
  /** @title Tags */
  tags?: boolean;
  /** @title Mini imagens */
  miniImage?: boolean;
}

export interface Props {
  /** @title Bloco de Textos, Tags, icons, links e mini imagens */
  blockText: BlockTextProps;

  /** @title Título */
  /** @format html */
  titleCenter?: string;

  /** @title Imagem */
  image: ImagemDeskAndMobile;

  /** @title Imagem espiral de fundo? */
  bgSpital?:boolean;

  /** @title Posicionamento */
  placement: "esquerdo" | "direito";
  /** @title Desabilitar espaçamento? */
  disableSpacing?: {
    top?: boolean;
    bottom?: boolean;
  };

  /** @title Desabilitar? */
  disabledProps?: DisabledProps;
}

const PLACEMENT = {
  esquerdo: "flex-col lg:flex-row-reverse",
  direito: "flex-col lg:flex-row",
};

export default function ImageSection(
  props: SectionProps<ReturnType<typeof loader>>,
) {
  const {
    titleCenter,
    blockText,
    image,
    placement,
    bgSpital,
    disableSpacing,
    disabledProps,
    device,
  } = props;
  const {
    subtitle,
    icon,
    nameIcon,
    subtitleWithTags,
    description,
    miniImage,
    cta,
    widthBlock,
    activeEclipseText,
  } = blockText;

  return (
    <div class="relative">
      {bgSpital && (
        <div class="hidden md:flex absolute top-0 left-0 w-full h-full z-0">
          <img 
            width={282}
            height={396}
            src="image/image-espiral-21deg.png"
            class="hidden md:flex absolute right-0 -bottom-[140px]"
            loading="lazy"/>
        </div>
      )}

      <div
        class={clx(
          `relative z-10 w-full text-[#ffffff] mobile:px-[20px] md:n1-container md:px-[120px]
              ${disableSpacing?.top ? "" : "md:pt-[80px] mobile:mt-[40px]"} 
              ${disableSpacing?.bottom ? "" : "md:pb-[80px] mobile:mb-[60px]"}`,
        )}
      >
        {titleCenter && (
          <div
            class={clx(
              `n1-text-icon-image__titleCenter [&_*]:mobile:!text-24 font-archimoto-medium mb-[60px] [&_*]:!text-48 text-center 
                      md:leading-[57.6px] font-black`,
            )}
            dangerouslySetInnerHTML={{ __html: titleCenter }}
          >
          </div>
        )}
        <div
          class={clx(
            `n1-text-icon-image__container flex justify-between md:gap-x-[60px] mobile:mt-[60px] relative 
                      ${PLACEMENT[placement]} text-left items-center z-10 ${
              activeEclipseText && device === "desktop" ? "is-active" : ""
            }
                      ${placement === "direito" ? "is-active--rigth-0" : ""}
                  `,
          )}
        >
          {image && (
            <div class="flex justify-center mobile:mb-[40px] relative max-w-[50%]">
              <Picture>
                {image?.desktop && image.desktop?.src && image.desktop?.width &&
                  image?.desktop?.height && (
                  <Source
                    src={image.desktop.src}
                    width={Number(image.desktop.width)}
                    height={Number(image.desktop.height)}
                    media="(min-width: 768px)"
                  />
                )}

                {image?.mobile && image.mobile?.src && image.mobile?.width &&
                  image?.mobile?.height && (
                  <Source
                    src={image.mobile.src}
                    width={Number(image.mobile.width)}
                    height={Number(image.mobile.height)}
                    media="(max-width: 767px)"
                  />
                )}

                {image?.desktop && image.desktop?.src && image.desktop?.width &&
                  image?.desktop?.height && (
                  <div
                    class={`n1-text-icon-image__image flex justify-center items-center ${
                      image?.activeEclipse ? "is-active" : ""}`}
                  >
                    <img
                      src={image.desktop.src}
                      alt={"Imagem"}
                      loading="lazy"
                    />
                  </div>
                )}
              </Picture>
            </div>
          )}
          <div
            style={{
              width: `${
                widthBlock && device === "desktop"
                  ? widthBlock + "%"
                  : device === "mobile"
                  ? "50%"
                  : "50%"
              }`,
            }}
          >
            {icon && !disabledProps?.icon && (
              <img class="md:mb-[8px] mobile:w-[50px]" src={icon} />
            )}

            {nameIcon && (
              <span class="text-18 font-archimoto-medium font-normal">
                {nameIcon}
              </span>
            )}

            <div class="md:mb-[20px] flex items-center flex-wrap">
              {subtitle && (
                <div
                  class="n1-text-icon-image__subtitle mobile:mt-[24px] mobile:[&_*]:!text-20 font-archimoto-medium font-black md:text-[32px]"
                  dangerouslySetInnerHTML={{ __html: subtitle }}
                >
                </div>
              )}

              <div class={`flex mobile:gap-x-[16px] mobile:mt-[16px]`}>
                {!disabledProps?.tags && subtitleWithTags &&
                  subtitleWithTags.map(({ name, tag }) => {
                    return (
                      <>
                        <img
                          class="md:ml-[16px]"
                          src={tag?.desktop?.src}
                          width={tag?.desktop?.width}
                          height={tag?.desktop?.height}
                          alt={name ?? "Tag"}
                        />
                      </>
                    );
                  })}
              </div>
            </div>

            {description && (
              <div
                class="n1-text-icon-image__description mobile:my-[20px] [&_*]:!font-noto-sans [&_*]:!text-[14px] [&_*]:!leading-[19.4px]"
                dangerouslySetInnerHTML={{ __html: description }}
              >
              </div>
            )}

            <div class="flex md:-ml-[15px] md:mt-[20px] mobile:grid mobile:grid-cols-[repeat(2,_auto)]">
              {!disabledProps?.miniImage && miniImage && miniImage?.length > 1 &&
                miniImage.map(({ image }) => {
                  const { desktop, mobile } = image;
                  return (
                    <>
                      <Picture>
                        {desktop && desktop?.src && desktop?.width &&
                          desktop?.height && (
                          <Source
                            media="(max-width: 767px)"
                            src={desktop.src}
                            width={Number(desktop.width)}
                            height={Number(desktop.height)}
                          />
                        )}
                        {mobile && mobile?.src && mobile?.width &&
                          mobile?.height && (
                          <Source
                            media="(max-width: 767px)"
                            src={mobile.src}
                            width={Number(mobile.width)}
                            height={Number(mobile.height)}
                          />
                        )}
                        {desktop && desktop?.src && desktop?.width &&
                          desktop?.height && (
                          <img
                            loading={"lazy"}
                            src={desktop.src}
                            width={Number(desktop.width)}
                            height={Number(desktop.height)}
                            alt={"Mini imagens"}
                          />
                        )}
                      </Picture>
                    </>
                  );
                })}
            </div>

            {cta?.text && (
              <div class="md:mt-[20px]">
                {!cta?.colorLink && (
                    <LinkWithOptionArrow
                      text={cta.text}
                      link={cta?.href}
                      activeArrow={true}
                      width={"140"}
                      fontSize="14"
                      margin={"0"}
                    />
                )}
                {cta?.colorLink && (
                    <LinkWithOptionArrow
                      text={cta.text}
                      link={cta?.href}
                      activeArrowService={true}
                      width={"220"}
                      fontSize="14"
                      margin={"0"}
                    />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};
