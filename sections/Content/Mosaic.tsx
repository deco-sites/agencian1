import { FnContext, SectionProps } from "deco/mod.ts";
import LinkWithOptionArrow from "$store/components/ui/LinkWithOptionArrow.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { HTMLWidget as HTML } from "apps/admin/widgets.ts";
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
  /** @format html */
  title?: string;
  /** @title Texto */
  /** @format textarea */
  text?: string;
  /** @title Texto do Link */
  textLink?: string;
  /** @title Link */
  /** @description (ex: https://agencian1.com.br/) */
  link?: string;
  /** @title Cor de fundo */
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
}

function Mosaic(props: SectionProps<ReturnType<typeof loader>>) {
  const { imageTop, imageBottom, device } = props;

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
      <div class="n1-mosaic md:mt-[100px]">
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
                  <div
                    class={clx(
                      `n1-mosaic__container top is-${
                        text && text?.bgColor === "base-50"
                          ? "white"
                          : "primary"
                      } 
                                            rounded-[16px] bg-primary md:pt-[30px] mobile:max-h-[345px] h-[430px] overflow-hidden`,
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
                    }}
                  >
                    <div class="md:px-[30px] relative z-20">
                      <div class="mobile:pt-[24px] mobile:px-[24px]">
                        {text && text?.title && (
                          <h3
                            class={clx(
                              `n1-mosaic__title mobile:[&_*]:!text-27 [&_*]:first-letter:!text-secondary  is-${
                                text && text?.bgColor === "base-50"
                                  ? "white"
                                  : "primary"
                              } 
                                                            text-34 font-archimoto-medium font-black`,
                            )}
                            dangerouslySetInnerHTML={{ __html: text.title }}
                          >
                          </h3>
                        )}

                        {text && text?.text && (
                          <span
                            class={clx(
                              `n1-mosaic__text mobile:[&_*]:!text-12 is-${
                                text && text?.bgColor === "base-50"
                                  ? "white"
                                  : "primary"
                              } 
                                                        font-noto-sans font-normal mt-[5px]`,
                            )}
                          >
                            {text.text}
                          </span>
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
                          <LinkWithOptionArrow
                            text={text?.textLink}
                            link={text?.link}
                            width={"127"}
                            fontSize="11"
                            margin={"0"}
                            activeArrowBlue={true}
                          />
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
                  </div>
                </>
              );
            })}
          </div>
          {/* ITEMS TOP - FINAL */}

          {/* ITEMS BOTTOM - INITIAL */}
          <div class="n1-mosaic is-bottom grid grid-cols-[repeat(2,_1fr)] grid-rows-1 text-[#ffffff] gap-x-[22px] mobile:flex mobile:flex-col">
            {imageBottom &&
              imageBottom?.map(({ desktop, mobile, name, text }) => {
                return (
                  <>
                    <div
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
                      }}
                    >
                      <div class="mobile:pt-[24px] mobile:px-[24px]">
                        {text && text?.title && (
                          <h3
                            class={clx(
                              `n1-mosaic__title [&_*]:first-letter:!text-secondary is-${
                                text && text?.bgColor === "base-50"
                                  ? "white"
                                  : "primary"
                              } 
                                text-34 font-archimoto-medium font-black`,
                            )}
                            dangerouslySetInnerHTML={{ __html: text.title }}
                          >
                          </h3>
                        )}
                        {text && text?.text && (
                          <span
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
                          </span>
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
                          <LinkWithOptionArrow
                            text={text.textLink}
                            link={text?.link}
                            width={"127"}
                            fontSize="11"
                            margin={"0"}
                            activeArrowBlue={true}
                          />
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
                    </div>
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
