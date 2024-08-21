import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import LinkTelephoneWithOptionArrow from "../../components/ui/LinkTelephoneWithOptionArrow.tsx";
import { FnContext, SectionProps } from "deco/mod.ts";
import { clx } from "$store/sdk/clx.ts";

/** @title {{{alt}}}  */
interface PropsImage {
  /** @title Insira a imagem */
  image: ImageWidget;
  /** @title Ordem da imagem */
  /** @description (ex: 1) */
  orderImage: number;
  /** @title Insira o nome da imagem */
  alt?: string;
  /** @title Insira o link da imagem */
  href?: string;
  /**
   * @title Insira a largura da imagem
   * @description (ex: 112)
   */
  width: number;
  /**
   * @title Insira a altura da imagem
   * @description (ex: 111)
   */
  height: number;
}

interface PropsText {
  /**
   * @title Insira o subtítulo
   * @format rich-text
   */
  subtitle?: string;
  /** @title adicionar barra "/" antes da frase? */
  addBar?: boolean;
  /** @title adicionar chaves "{}" antes e depois da frase? */
  addKeysInWords?: boolean;
  /**
   * @title Insira o parágrafo
   * @format rich-text
   */
  paragraph?: string;
}

interface Props {
  /** @title Texto - config */
  settingsText?: PropsText;
  /** @title Texto para o centro das imagens */
  textImage?: string;
  /** @title Imagem  */
  /** @description (limite de 5 imagens) */
  /** @maxItems 5 */
  allImage?: PropsImage[];

  /** @title Texto do botão/link  */
  textbutton?: string;

  /** @title WhatsApp */
  /** @description (ex: 99-99999-9999) */
  telephone?: string;

  /** @title Deseja botão com seta? */
  activeArrow?: boolean;

  /**
   * @title Tamanho do botão
   * @description (ex: 300)
   */
  width?: string;

  /** @title Deseja animação ? */
  animationAction?: boolean;
  /** @title Imagem de fundo */
  /** @description (de preferencia imagem com opacidade) ? */
  backgraoundImage?: ImageWidget;
  /** @title Largura da imagem */
  /** @description (ex: 650) */
  backgroundImageWidth?: number;
  /** @title Altura da imagem */
  /** @description (ex: 850) */
  backgroundImageHeight?: number;
  /** @title Posição vertical da imagem */
  /** @description (ex: 100) */
  backgroundImageTop?: number;
  /** @title Posição horizonatal da imagem */
  /** @description (ex: 100) */
  backgroundImageRight?: number;
  /** @title Ativar imagem de fundo? */
  backgroundImageActive?: boolean;
}

function TextWithImageAnimation(
  props: SectionProps<ReturnType<typeof loader>>,
) {
  const {
    settingsText,
    textImage,
    allImage,
    textbutton,
    telephone,
    activeArrow,
    width,
    animationAction,
    backgraoundImage,
    backgroundImageWidth,
    backgroundImageHeight,
    backgroundImageTop,
    backgroundImageRight,
    backgroundImageActive,
    device,
  } = props;

  return (
    <>
      <div class="relative z-0">
        {backgraoundImage && backgroundImageActive && device === "desktop" && (
          <Image
            src={backgraoundImage}
            width={backgroundImageWidth ? backgroundImageWidth : 650}
            height={backgroundImageHeight ? backgroundImageHeight : 850}
            sizes="(max-width: 100px)"
            style={{
              position: "absolute",
              top: backgroundImageTop ? backgroundImageTop + "px" : "-270px",
              right: backgroundImageRight ? backgroundImageRight + "px" : "0px",
            }}
          />
        )}
        <div
          class={clx(
            `mobile:flex mobile:flex-col-reverse grid grid-cols-[repeat(2,_1fr)] 
            md:max-w-[1440px] md:mx-[auto] my-[0] md:px-[120px] py-[0] tablet:flex tablet:flex-col-reverse`,
          )}
        >
          <div class="max-w-full flex items-center justify-center tablet:mt-[36px] mobile:mt-[32px]">
            <div class="flex flex-col items-start">
              <div class="flex flex-col items-start justify-start">
                {settingsText && settingsText?.subtitle && (
                  <div
                    class={clx(
                      `mobile:px-[20px] n1-textwithimageanimation__subtitle mobile:[&_*]:!text-24 inline-block font-archimoto-medium text-48 font-black
                    ${
                        settingsText?.addBar
                          ? "is-bar-custom"
                          : settingsText?.addKeysInWords
                          ? "is-keys-custom"
                          : ""
                      }`,
                    )}
                    dangerouslySetInnerHTML={{
                      __html: settingsText?.subtitle,
                    }}
                  >
                  </div>
                )}

                {settingsText && settingsText?.paragraph && (
                  <div
                    class="mobile:px-[20px] n1-textwithimageanimation__paragraph mobile:[&_*]:!text-16 inline-block font-noto-sans text-20 mt-[6px]"
                    dangerouslySetInnerHTML={{
                      __html: settingsText?.paragraph,
                    }}
                  >
                  </div>
                )}
              </div>

              {textbutton && (
                <div class="mobile:w-[90%] mobile:my-0 mobile:mx-auto mobile:flex mobile:flex-wrap">
                  <LinkTelephoneWithOptionArrow
                    customClass={`!m-0 !mt-[32px]`}
                    text={textbutton}
                    telephone={telephone}
                    activeArrow={activeArrow}
                    width={device === "mobile" ? "329" : width}
                    fontSize="14"
                  />
                </div>
              )}
            </div>
          </div>
          <div class="flex items-center justify-center">
            <div
              class={clx(
                `mobile:grid-rows-[repeat(3,_auto)] mobile:w-[360px] mobile:mt-[10px] mobile:mb-[30px] 
                grid grid-cols-[repeat(5,auto)] grid-rows-[repeat(5,_auto)] w-[448px]`,
              )}
            >
              {allImage && allImage.length > 0 &&
                allImage.map(
                  ({ alt, href, image, width, height, orderImage }) => {
                    if (image) {
                      return (
                        <a
                          href={`${href ? href : "javascript:void(0)"}`}
                          style={{ pointerEvents: `${href ? "all" : "none"}` }}
                          class={clx(`
                            ${
                            orderImage === 1
                              ? "mobile:col-[2] col-[3] row-[1] flex justify-center z-10"
                              : orderImage === 2
                              ? "mobile:col-[3] mobile:mt-[57px] mobile:mb-[55px] row-[2] col-[5] mt-[70px] mb-[60px] flex justify-end z-10"
                              : orderImage === 3
                              ? "mobile:col-[3] row-[3] col-[4_/_2_span] -translate-x-[50px] flex justify-start z-10"
                              : orderImage === 4
                              ? "mobile:col-[1] row-[3] col-[1_/_2_span] translate-x-[50px] flex justify-end z-10"
                              : orderImage === 5
                              ? "mobile:mt-[57px] mobile:mb-[55px] row-[2] col-[1] mt-[70px] mb-[60px] z-10"
                              : ""
                          }                                
                          `)}
                        >
                          <Image
                            src={image}
                            alt={alt}
                            width={Number(width)}
                            height={height}
                            sizes="(max-width: 100px)"
                            class={`mobile:w-[70px] min-w-[${
                              width + "px"
                            }] n1-textwithimageanimation__image ${
                              animationAction ? "is-active" : ""
                            }`}
                          />
                        </a>
                      );
                    }
                  },
                )}
              {textImage && (
                <div
                  class={clx(
                    `mobile:col-[2] col-[3] row-[2] flex items-center justify-center relative
                    before:content-[""] before:border-[0.268px] before:border-solid before:border-[rgba(198,_198,_198,_.3)] 
                    before:opacity-20 before:w-[85%] before:h-[100%] before:absolute before:rounded-[50%] before:top-[10px]
                    after:content-[""] after:border-[0.268px] after:border-solid after:border-[rgba(198,_198,_198,_.3)] 
                    after:opacity-20 after:w-[140%] after:h-[160%] after:absolute after:rounded-[50%] after:-top-[55px]                        
                  `,
                  )}
                >
                  <span
                    class={`mobile:max-w-[70%] mobile:text-19 text-[#ffffff] text-center text-24 font-black font-archimoto-medium leading-[26.797px] max-w-[60%] mt-[30px]`}
                  >
                    {textImage}
                  </span>
                </div>
              )}
            </div>
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

export default TextWithImageAnimation;
