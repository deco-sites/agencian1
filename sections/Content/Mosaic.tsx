import { FnContext, SectionProps } from "deco/mod.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "$store/sdk/clx.ts";

// INTERFACE GENERICA P/ IMAGEM
interface ImageGeneric {
  /**@title Imagem */
  image?: ImageWidget;
  /**@title Largura da imagem */
  /**@description (ex: 390) */
  width?: number;
  /**@title Altura da imagem */
  /**@description (ex: 250) */
  height?: number;
}

// INTERFACE GENERICA P/ TEXTOS
interface TextGeneric {
  /** @title Título */
  /** @format rich-text */
  title?: string;
  /** @title adicionar barra "/" antes da frase? */
  addBar?: boolean;
  /** @title adicionar chaves "{}" antes e depois da frase? */
  addKeysInWords?: boolean;
  /** @title Texto */
  /** @format textarea */
  text?: string;
  /** @title Texto do Link */
  textLink?: string;
  /**
   * @title Link
   * @description (ex: https://agencian1.com.br/)
   */
  link?: string;
  /** @title Link externo? */
  externalLink?: boolean;
  /** @title Cor de fundo do card */
  bgColor?: "primary" | "base-50";
}

const colorBackground = {
  "primary": "#0C1F59",
  "base-50": "#F3F4F7",
};

//* LAYOUT SUPERIOR
/** @titleBy name */
interface LayoutTop {
  /**@title Nome do Bloco */
  name?: string;

  /** @title Textos */
  text?: TextGeneric;

  /** @title Desktop */
  desktop?: ImageGeneric;

  /** @title Mobile */
  mobile?: ImageGeneric;
}

interface BottomLayout {
  /** @title Imagem Superior */
  top: ImageGeneric;
  /** @title Imagem Inferior */
  bottom: ImageGeneric;
}

interface BottomSide {
  /** @title Lado esquerdo */
  left?: BottomLayout;
  /** @title Lado direito */
  right?: BottomLayout;
}

//* LAYOUT INFERIOR
/** @titleBy name */
interface LayoutBottom {
  /**@title Nome do Bloco */
  name?: string;

  /** @title Textos */
  text?: TextGeneric;

  /** @title Desktop */
  desktop?: BottomSide;

  /** @title Mobile */
  mobile?: BottomSide;
}

interface Props {
  /** @title Imagem Superior */
  /** @description (Limite 3 imagens) */
  /** @maxItems 3 */
  imageTop: LayoutTop[];
  /** @title Imagem Inferior */
  /** @description (Limite 2 imagens) */
  /** @maxItems 2 */
  imageBottom: LayoutBottom[];
  /** @title Ativar imagem de fundo eclipse? */
  activeEclipse?: boolean;
}

function Mosaic(props: SectionProps<ReturnType<typeof loader>>) {
  const { imageTop, imageBottom, device, activeEclipse } = props;

  function handleMouserHover(e: MouseEvent) {
    const { target } = e;
    if (!target) return;
    if (target && target instanceof HTMLElement) {
      switch (e.type) {
        case "mouseleave":
          console.log("event mouseleave ----> ", target);
          break;
        case "mouseover":
          console.log("event mouseover ----> ", target);
          break;
      }
    }
  }

  return (
    <>
      <div
        class={`n1-mosaic md:mt-[100px] relative ${
          activeEclipse ? "md:is-active" : ""
        }`}
      >
        <div
          class="flex flex-col text-[#ffffff] md:n1-container md:px-[120px] gap-[22px] pb-[10px] mobile:px-[20px]"
          onMouseLeave={handleMouserHover}
        >
          {/* ITEMS TOP - INITIAL */}

          <div
            class={clx(
              `n1-mosaic is-top grid grid-cols-[repeat(3,_1fr)] grid-rows-1 text-[#ffffff] 
               gap-x-[22px] mobile:flex mobile:flex-col mobile:gap-y-[24px]`,
            )}
          >
            {imageTop && imageTop?.map(({ desktop, mobile, text, name }) => {
              return (
                <>
                  <a
                    href={`${text?.link ? text?.link : "javascript:void(0)"}`}
                    target={text?.externalLink ? "_blank" : ""}
                    class={clx(
                      `n1-mosaic__container top is-${
                        text && text?.bgColor === "base-50"
                          ? "white"
                          : "primary"
                      } rounded-[16px] bg-primary md:pt-[30px] mobile:max-h-[345px] h-[430px] overflow-hidden`,
                    )}
                    onMouseLeave={handleMouserHover}
                    style={{
                      backgroundColor: `${
                        text && text?.bgColor
                          ? colorBackground[text?.bgColor]
                          : "#0C1F59"
                      }`,
                      color: `${
                        text && text?.bgColor === "base-50"
                          ? "#0C1F59"
                          : "#ffffff"
                      }`,
                      pointerEvents: `${text?.link ? "all" : "default"}`,
                    }}
                  >
                    <div class="md:px-[30px] relative z-20">
                      <div class={`mobile:pt-[24px] mobile:px-[24px]`}>
                        {text && text?.title && (
                          <div
                            class={clx(
                              `n1-mosaic__title mobile:[&_*]:!text-27  is-${
                                text && text?.bgColor === "base-50"
                                  ? "white"
                                  : "primary"
                              } text-34 font-archimoto-medium font-black
                                ${
                                text?.addBar
                                  ? "is-bar-custom"
                                  : text?.addKeysInWords
                                  ? "is-keys-custom"
                                  : ""
                              }`,
                            )}
                            dangerouslySetInnerHTML={{ __html: text.title }}
                          >
                          </div>
                        )}

                        {text && text?.text && (
                          <div
                            class={clx(
                              `n1-mosaic__text mobile:[&_*]:!text-12 is-${
                                text && text?.bgColor === "base-50"
                                  ? "white"
                                  : "primary"
                              } font-noto-sans font-normal mt-[5px]`,
                            )}
                          >
                            {text.text}
                          </div>
                        )}
                      </div>
                      {text && text?.textLink && (
                        <div
                          class={`n1-mosaic__link is-${
                            text && text?.bgColor === "base-50"
                              ? "white"
                              : "primary"
                          } my-[15px] mobile:px-[24px]`}
                        >
                          {text?.textLink && (
                            <button class="px-[21px] py-[14px] max-h-[37px] rounded-[71px] relative w-[130px] flex items-center">
                              <span class="font-archimoto-medium text-[11.486px] leading-[14.357px] font-black">
                                {text?.textLink}
                              </span>
                              <div class="p-[5px] mobile:right-[8px] absolute right-0">
                                <svg
                                  width="23"
                                  height="23"
                                  viewBox="0 0 23 23"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill="#F3F4F7"
                                    d="M0.278564 11.273C0.278564 5.12786 5.26018 0.14624 11.4053 0.14624V0.14624C17.5505 0.14624 22.5321 5.12786 22.5321 11.273V11.273C22.5321 17.4181 17.5505 22.3998 11.4053 22.3998V22.3998C5.26018 22.3998 0.278564 17.4181 0.278564 11.273V11.273Z"
                                    class="not-circle"
                                  >
                                  </path>
                                  <path
                                    fill="#0C1F59"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M8.2646 8.1324C8.2646 7.78549 8.54582 7.50427 8.89272 7.50427H14.5458C14.8927 7.50427 15.174 7.78549 15.174 8.1324V13.7855C15.174 14.1324 14.8927 14.4136 14.5458 14.4136C14.1989 14.4136 13.9177 14.1324 13.9177 13.7855V9.64882L8.70875 14.8578C8.46345 15.1031 8.06575 15.1031 7.82045 14.8578C7.57515 14.6125 7.57515 14.2148 7.82045 13.9695L13.0294 8.76052H8.89272C8.54582 8.76052 8.2646 8.4793 8.2646 8.1324Z"
                                  >
                                  </path>
                                </svg>
                              </div>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <div class="relative">
                      {device === "desktop" && desktop && desktop.image &&
                        desktop?.width && desktop?.height && (
                        <Image
                          class="z-0 absolute top-0 left-0"
                          src={desktop.image}
                          width={desktop.width}
                          height={desktop.height}
                          alt={name ? name : "Imagem Top"}
                          loading="lazy"
                        />
                      )}
                      {device === "mobile" && mobile && mobile.image &&
                        mobile?.width && mobile?.height && (
                        <Image
                          // quando efetuar animação alterar isso
                          class={`z-0 absolute ${
                            name && name === "Tecnologia Deco"
                              ? "left-2/5 -top-[100px] scale-[2] left-[60%]"
                              : "top-0 left-0"
                          }`}
                          src={mobile.image}
                          width={mobile.width}
                          height={mobile.height}
                          alt={name ? name : "Imagem Top"}
                          loading="lazy"
                        />
                      )}
                    </div>
                  </a>
                </>
              );
            })}
          </div>
          {/* ITEMS TOP - FINAL */}

          {/* ITEMS BOTTOM - INITIAL */}
          <div
            class={`
              n1-mosaic is-bottom grid grid-cols-[repeat(2,_1fr)] grid-rows-1 text-[#ffffff] 
              gap-x-[22px] mobile:flex mobile:flex-col`}
          >
            {imageBottom &&
              imageBottom?.map(({ desktop, mobile, name, text }) => {
                return (
                  <>
                    <a
                      href={`${text?.link ? text?.link : "javascript:void(0)"}`}
                      target={text?.externalLink ? "_blank" : ""}
                      class={clx(
                        `n1-mosaic__container mobile:mb-[24px] bottom rounded-[16px] bg-primary md:px-[30px] 
                        md:pt-[30px] mobile:max-h-[340px] max-h-[430px] overflow-hidden`,
                      )}
                      style={{
                        backgroundColor: `${
                          text && text?.bgColor
                            ? colorBackground[text?.bgColor]
                            : "#0C1F59"
                        }`,
                        color: `${
                          text && text?.bgColor === "base-50"
                            ? "#0C1F59"
                            : "#ffffff"
                        }`,
                        pointerEvents: `${text?.link ? "all" : "default"}`,
                      }}
                    >
                      <div class="mobile:pt-[24px] mobile:px-[24px]">
                        {text && text?.title && (
                          <div
                            class={clx(
                              `n1-mosaic__title [&_*]:first-letter:!text-secondary is-${
                                text && text?.bgColor === "base-50"
                                  ? "white"
                                  : "primary"
                              } 
                                text-34 font-archimoto-medium font-black
                                ${
                                text?.addBar
                                  ? "is-bar-custom"
                                  : text?.addKeysInWords
                                  ? "is-keys-custom"
                                  : ""
                              }`,
                            )}
                            dangerouslySetInnerHTML={{ __html: text.title }}
                          >
                          </div>
                        )}
                        {text && text?.text && (
                          <div
                            class={clx(
                              `n1-mosaic__text is-${
                                text && text?.bgColor === "base-50"
                                  ? "white"
                                  : "primary"
                              } 
                            text-13 font-noto-sans font-normal mt-[5px]`,
                            )}
                          >
                            {text.text}
                          </div>
                        )}
                      </div>
                      {text && text?.textLink && (
                        <div
                          class={`n1-mosaic__link is-${
                            text && text?.bgColor === "base-50"
                              ? "white"
                              : "primary"
                          } my-[15px] mobile:px-[24px]`}
                        >
                          {text?.textLink && (
                            <button class="px-[21px] py-[14px] max-h-[37px] rounded-[71px] relative w-[130px] flex items-center">
                              <span class="font-archimoto-medium text-[11.486px] leading-[14.357px] font-black">
                                {text?.textLink}
                              </span>
                              <div class="p-[5px] mobile:right-[8px] absolute right-0">
                                <svg
                                  width="23"
                                  height="23"
                                  viewBox="0 0 23 23"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill="#F3F4F7"
                                    d="M0.278564 11.273C0.278564 5.12786 5.26018 0.14624 11.4053 0.14624V0.14624C17.5505 0.14624 22.5321 5.12786 22.5321 11.273V11.273C22.5321 17.4181 17.5505 22.3998 11.4053 22.3998V22.3998C5.26018 22.3998 0.278564 17.4181 0.278564 11.273V11.273Z"
                                    class="not-circle"
                                  >
                                  </path>
                                  <path
                                    fill="#0C1F59"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M8.2646 8.1324C8.2646 7.78549 8.54582 7.50427 8.89272 7.50427H14.5458C14.8927 7.50427 15.174 7.78549 15.174 8.1324V13.7855C15.174 14.1324 14.8927 14.4136 14.5458 14.4136C14.1989 14.4136 13.9177 14.1324 13.9177 13.7855V9.64882L8.70875 14.8578C8.46345 15.1031 8.06575 15.1031 7.82045 14.8578C7.57515 14.6125 7.57515 14.2148 7.82045 13.9695L13.0294 8.76052H8.89272C8.54582 8.76052 8.2646 8.4793 8.2646 8.1324Z"
                                  >
                                  </path>
                                </svg>
                              </div>
                            </button>
                          )}
                        </div>
                      )}

                      <div
                        class={clx(
                          `mobile:h-[202px] mobile:px-[13px] mobile:grid mobile:grid-cols-[repeat(2,_1fr)] 
                            h-[233px] overflow-hidden flex gap-[13px]`,
                        )}
                      >
                        <div>
                          {device === "desktop" &&
                            desktop && desktop?.left &&
                            desktop.left.top?.image &&
                            desktop.left?.top?.width &&
                            desktop.left?.top?.height && (
                            <Image
                              class="mb-[14px]"
                              src={desktop.left.top.image}
                              width={desktop.left.top.width}
                              height={desktop.left.top.height}
                              alt={name ? name : "Imagem Top"}
                              loading="lazy"
                            />
                          )}
                          {device === "mobile" &&
                            mobile && mobile?.left &&
                            mobile.left.top?.image &&
                            mobile.left?.top?.width &&
                            mobile.left?.top?.height && (
                            <Image
                              class="mb-[14px]"
                              src={mobile.left.top.image}
                              width={mobile.left.top.width}
                              height={mobile.left.top.height}
                              alt={name ? name : "Imagem Top"}
                              loading="lazy"
                            />
                          )}

                          {device === "desktop" &&
                            desktop && desktop?.left &&
                            desktop.left.bottom?.image &&
                            desktop.left?.bottom?.width &&
                            desktop.left?.bottom?.height && (
                            <Image
                              src={desktop.left.bottom.image}
                              width={desktop.left.bottom.width}
                              height={desktop.left.bottom.height}
                              alt={name ? name : "Imagem Bottom"}
                              loading="lazy"
                            />
                          )}

                          {device === "mobile" &&
                            mobile && mobile?.left &&
                            mobile.left.bottom?.image &&
                            mobile.left?.bottom?.width &&
                            mobile.left?.bottom?.height && (
                            <Image
                              src={mobile.left.bottom.image}
                              width={mobile.left.bottom.width}
                              height={mobile.left.bottom.height}
                              alt={name ? name : "Imagem Bottom"}
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div>
                          {device === "desktop" &&
                            desktop && desktop?.right &&
                            desktop.right.top?.image &&
                            desktop.right?.top?.width &&
                            desktop.right?.top?.height && (
                            <Image
                              class="mb-[14px]"
                              src={desktop.right.top.image}
                              width={desktop.right.top.width}
                              height={desktop.right.top.height}
                              alt={name ? name : "Imagem Bottom"}
                              loading="lazy"
                            />
                          )}
                          {device === "mobile" &&
                            mobile && mobile?.right &&
                            mobile.right.top?.image &&
                            mobile.right?.top?.width &&
                            mobile.right?.top?.height && (
                            <Image
                              class="mb-[14px]"
                              src={mobile.right.top.image}
                              width={mobile.right.top.width}
                              height={mobile.right.top.height}
                              alt={name ? name : "Imagem Bottom"}
                              loading="lazy"
                            />
                          )}
                          {device === "desktop" &&
                            desktop && desktop?.right &&
                            desktop.right.bottom?.image &&
                            desktop.right?.bottom?.width &&
                            desktop.right?.bottom?.height && (
                            <Image
                              src={desktop.right.bottom.image}
                              width={desktop.right.bottom.width}
                              height={desktop.right.bottom.height}
                              alt={name ? name : "Imagem Bottom"}
                              loading="lazy"
                            />
                          )}
                          {device === "mobile" &&
                            mobile && mobile?.right &&
                            mobile.right.bottom?.image &&
                            mobile.right?.bottom?.width &&
                            mobile.right?.bottom?.height && (
                            <Image
                              src={mobile.right.bottom.image}
                              width={mobile.right.bottom.width}
                              height={mobile.right.bottom.height}
                              alt={name ? name : "Imagem Bottom"}
                              loading="lazy"
                            />
                          )}
                        </div>
                      </div>
                    </a>
                  </>
                );
              })}
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

export default Mosaic;
