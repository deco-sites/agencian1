import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { FnContext, SectionProps } from "deco/mod.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { clx } from "$store/sdk/clx.ts";

/** @titleBy name */
interface InfoProps {
  /**@title Nome*/
  name?: string;
  /**@title Título*/
  title?: string;
  /**@title Texto*/
  /**@format textarea*/
  text?: string;
  /**@title Texto do link*/
  textLink?: string;
  /**@title link*/
  /**@description (ex: https://agencian1.com.br/)*/
  href?: string;
}

/** @titleBy alt */
export interface ImageCarousel {
  settingsInfo?: InfoProps;
  /** @title Imagem Desktop */
  desktop: ImageWidget;
  /** @title Nome da imagem */
  alt: string;
}

export interface Props {
  /**@title Título  */
  /**@format html  */
  title?: string;
  /** @title adicionar barra "/" antes da frase? */
  addBar?:boolean; 
  /** @title adicionar chaves "{}" antes e depois da frase? */  
  addKeysInWords?:boolean;       
  /**@title Texto  */
  /**@format html  */
  text?: string;

  images?: ImageCarousel[];
  /** @title (Marque esta opção quando este banner for a maior imagem na tela para otimizações de imagem)  */
  preload?: boolean;
  /** @title Mostrar setas */
  /** @description (mostre setas para navegar pelas imagens) */
  arrows?: boolean;
  /** @title Mostrar pontos */
  /** @description (mostre pontos para navegar pelas imagens) */
  dots?: boolean;
}

function ImageCarouselItem(
  { image, lcp, id }: { image: ImageCarousel; lcp?: boolean; id: string;},
) {
  const { alt, desktop, settingsInfo } = image;

  return (
    <>
      <div
        id={id}
        aria-label={settingsInfo?.name}
        class="n1-text-top-width-carousel__link relative overflow-hidden w-full border border-[#3B5D5F] rounded-[20px] pt-[20px] pb-[40px] px-[20px]"
      >
        <div class="n1-text-top-width-carousel__overlay absolute w-full h-full top-[0] left-[0] invisible opacity-0">
        </div>

        <img
          class="mobile:h-auto mobile:max-w-full relative -left-[30px]"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />

        <div>
          {settingsInfo?.name && (
            <span class="text-[#ffffff] flex font-archimoto-medium md:text-20 font-thin md:mt-[22px] mb-[8px]">
              {settingsInfo?.name}
            </span>
          )}
          {settingsInfo?.title && (
            <h3 class={`text-[#ffffff] flex font-archimoto-medium md:text-40 font-black n1-text-top-width-carousel__title`}>
              {settingsInfo?.title}
            </h3>
          )}
          {settingsInfo?.text && (
            <span class="text-[#ffffff] flex font-noto-sans md:text-14 font-normal mt-[16px] mobile:mb-[32px] md:mb-[59px]">
              {settingsInfo?.text}
            </span>
          )}
          {settingsInfo?.textLink && (
            <a
              href={settingsInfo?.href ?? "javascript:void(0)"}
              style={{
                pointerEvents: `${
                  settingsInfo?.href && settingsInfo?.href !== "#"
                    ? "all"
                    : "none"
                }`,
              }}
              class={clx(
                `mobile:w-[55%] md:w-[43%] flex border border-[#fff] px-[20px] pb-[11px] pt-[12px] rounded-[100px]
               justify-center items-center min-w-[144px] group hover:bg-[#ffffff] duration-300 cursor-pointer relative z-20`,
              )}
            >
              <span class="text-[#ffffff] group-hover:text-[#585858] duration-300 flex font-archimoto-medium md:text-14 font-black">
                {settingsInfo?.textLink}
              </span>
              <svg
                class="ml-[10px] relative bottom-[2px]"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.25 6.22656C5.25 5.81235 5.58579 5.47656 6 5.47656H12.75C13.1642 5.47656 13.5 5.81235 13.5 6.22656V12.9766C13.5 13.3908 13.1642 13.7266 12.75 13.7266C12.3358 13.7266 12 13.3908 12 12.9766V8.03722L5.78033 14.2569C5.48744 14.5498 5.01256 14.5498 4.71967 14.2569C4.42678 13.964 4.42678 13.4891 4.71967 13.1962L10.9393 6.97656H6C5.58579 6.97656 5.25 6.64078 5.25 6.22656Z"
                  fill="white"
                  class="group-hover:fill-[#585858] duration-300"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </>
  );
}

function Dots({ images }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                    @property --dot-progress {
                        syntax: '<percentage>';
                        inherits: false;
                        initial-value: 0%;
                    }
                `,
        }}
      />

      <ul class="n1-text-top-width-carousel__dots relative z-10 mobile:top-0 carousel justify-center col-span-full gap-x-[5px] row-start-4 w-full">
        {images?.map((_, index) => {
          return (
            <>
              <li class="carousel-item">
                <Slider.Dot
                  index={index}
                  classes={`${
                    ((index === 0) || (index % 4 === 0)) ? "" : "hidden"
                  }`}
                >
                  <div class="pb-5">
                    <div
                      class={clx(
                        `n1-banner-btn__dot--item w-[140px] sm:w-20 h-[3px] rounded group-disabled:animate-progress group-disabled:bg-[#06ADC2] 
                                            bg-gradient-to-r from-[#06ADC2] from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]`,
                      )}
                    />
                  </div>
                </Slider.Dot>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="absolute w-full flex mobile:justify-center mobile:items-end justify-between h-full mobile:top-[60px] top-[0] items-center pb-[10px] md:-left-[10px]">
        <div class="flex items-center justify-start z-10 col-start-1 row-start-2 mobile:mr-[30px] -translate-x-[50px]">
          <Slider.PrevButton class="btn btn-circle bg-[#ffffff] w-[40px] !h-[40px]">
            <Icon
              size={18}
              id="Banner-arrow-left"
              strokeWidth={3}
            />
          </Slider.PrevButton>
        </div>
        <div class="flex items-center justify-end z-10 col-start-3 row-start-2 mobile:ml-[30px] translate-x-[50px]">
          <Slider.NextButton class="btn btn-circle bg-[#ffffff] w-[40px] !h-[40px]">
            <Icon
              size={18}
              id="Banner-arrow-right"
              strokeWidth={3}
            />
          </Slider.NextButton>
        </div>
      </div>
    </>
  );
}

function TextTopWidthCarousel(props: SectionProps<ReturnType<typeof loader>>) {
  const id = useId();
  const { images, preload, title, text, device, addBar, addKeysInWords } = props;

  return (
    <>
      <div id={id} class="relative mobile:pb-[60px]">
        <div class=" md:n1-container md:px-[120px] z-10 md:mb-[40px] relative">
          <div class="mobile:my-[24px] mt-[120px] mb-[43px] text-[#ffffff] flex items-center justify-between">
            <div class="mobile:px-[20px]">
              {title && (
                <div
                  class={clx(`n1-cases-component__title mobile:[&_*]:!text-24 font-archimoto-medium text-24 leading-[28.8px] md:text-56 md:leading-[20px]
                    ${addKeysInWords ? 'is-keys-custom' : addBar ? 'is-bar-custom' : ""}`)}
                  dangerouslySetInnerHTML={{
                    __html: title,
                  }}
                >
                </div>
              )}
              {text && (
                <span
                  class="md:flex font-noto-sans block mt-[11px] text-20 leading-[26px]"
                  dangerouslySetInnerHTML={{
                    __html: text,
                  }}
                >
                </span>
              )}
            </div>
          </div>

          <div class="relative">
            <Slider class="carousel carousel-center gap-x-[22px] flex mobile:px-[20px] relative z-10">
              {images?.map((image, index) => {
                return (
                  <>
                    <Slider.Item
                      index={index}
                      class="carousel-item mobile:w-full w-[31.666%]"
                    >
                      <ImageCarouselItem
                        image={image}
                        lcp={index === 0 && preload}
                        id={`${id}::${index}`}
                      />
                    </Slider.Item>
                  </>
                );
              })}
            </Slider>
            {props.arrows && <Buttons />}
          </div>
        </div>

        {props.dots && device === "desktop" && <Dots images={images} />}

        <SliderJS rootId={id} />
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

export default TextTopWidthCarousel;
