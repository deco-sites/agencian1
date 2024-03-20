import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { FnContext, SectionProps } from "deco/mod.ts";
import { clx } from "$store/sdk/clx.ts";

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
  descriptionAnimation?:string; 
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
  widthImage?:number;
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
}

const PLACEMENT = {
  left: "flex-col text-left lg:flex-row-reverse",
  right: "flex-col text-left lg:flex-row",
};

export default function HeroFlats(props: SectionProps<ReturnType<typeof loader>>) {
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
    device
  } = props;

  const positionX = translateX ? translateX + 'px' : 0;
  const positionY = translateY ? translateY + 'px' : 0; 
  
  const HEIGHT = 508;
  
  return (
    <div class="mobile:mt-[10px] mobile:px-[20px]">
      <div class="mx-auto flex flex-col items-center gap-8 overflow-hidden">
        <div
          class={clx(`tablet:items-start n1-hero__image flex w-full md:n1-container md:px-[120px] justify-end relative 
            ${image
              ? PLACEMENT[placement]
              : "flex-col items-center justify-center text-center"
            } lg:pt-[120px] pb-[60px] gap-12 md:gap-20 items-center`)}
        >
          {image && device === 'desktop' && (
            <Image
              class='hidden mobile:flex lg:flex'
              width={widthImage ? widthImage : 640}
              height={HEIGHT}
              style={
                positionManual 
                ? {
                  position: 'absolute',
                  top: positionY,
                  right: positionX,
                  left: placementImage === 'left' ? 0 : 'initial'
                }
                :{}
              }
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image}
              alt={image}
              decoding="async"
              loading="lazy"
            />
          )}
          <div
            class={clx(`tablet:max-w-[90%] ${image && device === 'desktop'? "md:max-w-[56%]": "mobile:w-full"}`)}
            // class={`mx-6 lg:mx-auto lg:w-full space-y-4 gap-4 ${
            //   image
            //     ? "lg:w-1/2 lg:max-w-xl"
            //     : "flex flex-col items-center justify-center lg:max-w-3xl"
            // }`}
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
            {descriptionAnimation &&(              
              <div class="n1-typing mobile:[&_*]:!text-24">
                  <span class={`font-archimoto-medium `}>{descriptionAnimation}</span>
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
              <div class="inline-block font-medium n1-hero__titleCta mobile:mb-[10px] mobile:[&_*]:!text-14 md:mt-[30px] md:mb-[20px]"
                dangerouslySetInnerHTML={{
                  __html: titleCta,
                }}
              ></div>            
            )}
            <div class="flex flex-row tablet:flex-wrap items-center lg:items-start gap-4">
              {cta?.map((item) => {
                return(
                  <>
                    <a
                      key={item?.id}
                      id={item?.id}
                      href={item?.href}
                      target={item && item.href && item.href.includes("http") ? "_blank" : "_self"}
                      class={clx(`mobile:py-[8px] mobile:px-[6px] lg:w-[240px] lg:min-w-[240px] px-[20px] py-[24px] flex flex-col items-center 
                        text-center group relative overflow-hidden rounded-[10px] hover:bg-gradient-to-r transition-all duration-300 ease-out 
                        ${item.variant === "Reverse"
                          ? "bg-secondary text-white"
                          : "text-[#ffffff] bg-[linear-gradient(161deg,_rgba(255,_255,_255,_0.10)_0%,_rgba(255,_255,_255,_0.05)_101.7%)] backdrop-filter backdrop-blur-[18px]"
                      }`)}
                    >
                      <span class="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40">
                      </span>
                      <span class={`mobile:text-20 mobile:leading-[24px] text-secondary font-bold font-archimoto-medium text-50 relative`}>
                        {item?.text}
                      </span>
                      <span class={`mobile:text-12 mobile:leading-[16.8px] text-[#ffffff] relative font-normal font-noto-sans md:text-18 md:max-w-[80%]`}>
                        {item?.text2} 
                      </span>
                    </a>
                  </>
                )
              })}
            </div>
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