import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { FnContext, SectionProps } from "deco/mod.ts";
import { clx } from "$store/sdk/clx.ts";
import { useEffect } from "preact/hooks";
import LinkTelephoneWithOptionArrow from "site/components/ui/LinkTelephoneWithOptionArrow.tsx";

export interface CTA {
  id?: string;
  /**@title Link do botão */
  href?: string;
  /**@title Texto 01 */
  text: string;
  /**@title Texto 02 */
  text2?: string;
  variant: "Normal" | "Reverse";
}

export interface telephoneProps {
  text?: string;
  telephone?: string;
  activeArrow?: boolean;
  width?: string;
  height?: string;
  customClass?: string;
  fontSize?: string;
}

export interface Props {
  /**
   * @format html
   */
  /** @title Título */
  title: string;
  /** @title Descrição */
  /** @format html */
  description: string;
  /** @title Texto para animação */
  /** @description (Separar frase por vírgula. Ex: Uau commerce, Performance ) */
  descriptionAnimation?: string;
  /** @title Imagem */
  image?: ImageWidget;
  /** @title Deseja posicionar manualmente? */
  positionManual?: boolean;
  /** @title Posição da imagem */
  /** @description (Horizontal) */
  translateX?: number;
  /** @title Posição da imagem */
  /** @description (Vertical) */
  translateY?: number;
  /** @title Largura da imagem */
  widthImage?: number;
  /** @title Lado do Bloco de texto */
  placement: "left" | "right";
  /**
   * @title Lado do Imagem
   * @description (valido caso posicionamento manual estiver ativado)
   */
  placementImage?: "right" | "left";
  /**
   * @title Título CTA
   * @format html
   */
  titleCta?: string;
  /** @title CTA */
  cta: CTA[];

  ButtonAds?: telephoneProps;
}

const PLACEMENT = {
  left: "flex-col text-left lg:flex-row-reverse",
  right: "flex-col text-left lg:flex-row",
};

export default function HeroFlats(
  props: SectionProps<ReturnType<typeof loader>>,
) {
  const {
    title = "Hero",
    description = "Your description here",
    descriptionAnimation,
    image,
    positionManual,
    translateX,
    translateY,
    widthImage,
    placement,
    placementImage,
    titleCta,
    cta,
    device,
    ButtonAds,
  } = props;

  const positionX = translateX ? translateX + "px" : 0;
  const positionY = translateY ? translateY + "px" : 0;

  const HEIGHT = 508;

  function typingWrite(word: number) {
    const loop = localStorage.getItem("loop")
      ? localStorage.getItem("loop")
      : null;
    const loopNumber = Number(loop);
    const modeTablet = globalThis.matchMedia("(max-width:768px)").matches;

    if (loop && loopNumber < 2) {
      word = loopNumber + 1;
    } else if (loopNumber > 2) {
      word = 0;
    } else {
      word = 0;
    }

    localStorage.setItem("loop", String(word));

    const textElement = document.querySelector<HTMLElement>(
      ".text-animation--typing",
    );

    if (textElement && textElement instanceof HTMLElement) {
      const elementDataType = textElement.getAttribute("data-write");
      const textArray = elementDataType ? elementDataType.split(",") : null;

      if (textArray) {
        textElement.classList.add("is-active");
        textElement.innerHTML = textArray[word];

        if (modeTablet) {
          setTimeout(typingWrite, 6000);
          setTimeout(() => {
            textElement.innerHTML = "";
            textElement.classList.remove("is-active");
          }, 5950);
        } else {
          setTimeout(typingWrite, 4000);
          setTimeout(() => {
            textElement.innerHTML = "";
            textElement.classList.remove("is-active");
          }, 3950);
        }
      }
    }
  }

  useEffect(() => {
    typingWrite(0);
  }, []);

  return (
    <div class="mobile:mt-[10px] mobile:px-[20px]">
      <div class="mx-auto flex flex-col items-center gap-8 overflow-hidden">
        <div
          class={clx(
            `tablet:items-start n1-hero__image flex w-full md:n1-container md:px-[120px] justify-end relative 
            ${
              image
                ? PLACEMENT[placement]
                : "flex-col items-center justify-center text-center"
            } lg:pt-[120px] pb-[60px] gap-12 md:gap-20 items-center`,
          )}
        >
          {image && device === "desktop" && (
            <Image
              class="hidden mobile:flex lg:flex"
              width={widthImage ? widthImage : 640}
              height={HEIGHT}
              style={positionManual
                ? {
                  position: "absolute",
                  top: positionY,
                  right: positionX,
                  left: placementImage === "left" ? 0 : "initial",
                }
                : {}}
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image}
              alt={image}
              decoding="async"
              loading="lazy"
            />
          )}
          <div
            class={clx(
              `tablet:max-w-[90%] ${
                image && device === "desktop"
                  ? "md:max-w-[56%]"
                  : "mobile:w-full"
              }`,
            )}
          >
            {title && (
              <div
                class="inline-block font-archimoto-medium n1-hero__title mobile:[&_*]:!text-24"
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              >
              </div>
            )}
            {descriptionAnimation && (
              <div class="n1-typing mobile:[&_*]:!text-24 md:mt-[12px]">
                <span
                  class="text-animation--typing is-active mobile:h-[28.8px] h-[88px] font-archimoto-medium grid text-secondary font-black text-[80px] leading-[88px] overflow-hidden"
                  data-write={descriptionAnimation}
                >
                </span>
              </div>
            )}

            {description && (
              <div
                class="inline-block font-noto-sans font-normal md:max-w-[80%] n1-hero__description mobile:mt-[16px] mobile:mb-[24px] mobile:[&_*]:!text-14"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              >
              </div>
            )}
            {titleCta && (
              <div
                class="inline-block font-medium n1-hero__titleCta mobile:mb-[10px] mobile:[&_*]:!text-14 md:mt-[30px] md:mb-[20px]"
                dangerouslySetInnerHTML={{
                  __html: titleCta,
                }}
              >
              </div>
            )}
            <div class="flex flex-row tablet:flex-wrap items-center lg:items-start gap-4">
              {cta?.map((item) => {
                return (
                  <>
                    <a
                      key={item?.id}
                      id={item?.id}
                      class={clx(
                        `mobile:py-[8px] mobile:px-[6px] lg:w-[240px] lg:min-w-[240px] px-[20px] py-[24px] flex flex-col items-center 
                        text-center relative overflow-hidden rounded-[10px] 
                        ${
                          item.variant === "Reverse"
                            ? "bg-secondary text-white"
                            : "text-[#ffffff] bg-[linear-gradient(161deg,_rgba(255,_255,_255,_0.10)_0%,_rgba(255,_255,_255,_0.05)_101.7%)] backdrop-filter backdrop-blur-[18px]"
                        }`,
                      )}
                    >
                      <h4 class="flex flex-col items-center">
                        <span class="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10">
                        </span>
                        <span
                          class={`mobile:text-20 mobile:leading-[24px] text-secondary font-bold font-archimoto-medium text-50 relative`}
                        >
                          {item?.text}
                        </span>
                        <span
                          class={`mobile:text-12 mobile:leading-[16.8px] text-[#ffffff] relative font-normal font-noto-sans md:text-18 md:max-w-[80%]`}
                        >
                          {item?.text2}
                        </span>
                      </h4>
                    </a>
                  </>
                );
              })}
            </div>
            {ButtonAds && (
              <div class="mt-6 flex justify-start w-full">
                <LinkTelephoneWithOptionArrow
                  text={ButtonAds.text}
                  telephone={ButtonAds.telephone}
                  activeArrow={ButtonAds.activeArrow}
                  width={ButtonAds.width}
                  height={ButtonAds.height}
                  customClass={ButtonAds.customClass}
                  fontSize={ButtonAds.fontSize}
                />
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
