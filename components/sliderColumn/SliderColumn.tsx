
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { FnContext, SectionProps } from "deco/mod.ts";
import { useState } from "preact/hooks";
import { BannerItem } from "deco-sites/agencian1/components/sliderColumn/BannerItems.tsx";
import Dots from "deco-sites/agencian1/components/sliderColumn/Dots.tsx";
import Buttons from "deco-sites/agencian1/components/sliderColumn/Buttons.tsx";

/**
 * @titleBy title
 */
interface ActionProps {
    /** @title link */
    /** @description (ex: https://agencian1.com.br/) */
    href: string;
    /** @title Título da imagem */
    title: string;
    /** @title Subtítulo da imagem */
    subTitle: string;
    /** @title Texto do botão */
    label: string;
}

/**
 * @titleBy alt
 */
export interface Banner {
    /** @title Imagem Desktop */
    desktop: ImageWidget;
    /** @title Imagem Mobile */
    mobile: ImageWidget;
    /** @title Texto da imagem */
    alt: string;
    action?: ActionProps;

    /** @format html */
    description: string; 
}

export interface Props {
     /** @format html */
    title?: string;

    images?: Banner[];
    /**
     * @description (Marque esta opção quando este banner for a maior imagem na tela para otimizações de imagem)
     */
    preload?: boolean;
    /**
     * @title Mostrar setas
     * @description (mostre setas para navegar pelas imagens)
     */
    arrows?: boolean;
    /**
     * @title Mostrar pontos
     * @description (mostre pontos para navegar pelas imagens)
     */
    dots?: boolean;
    /**
     * @title Autoplay intervalo
     * @description [tempo (em segundos) para iniciar a reprodução automática do carrossel (ex: 1 - significa 1 segundo)]
     */
    interval?: number;

      /** @tilte Margin top */
  /** @description Espaçamento entre uma section e outra ex:10px*/
  marginTop?: string;

  /** @tilte Margin Bottom*/
  /** @description spaçamento entre uma section e outra ex:10px*/
  marginBottom?: string;


}


export default function SliderColumn(
    props: SectionProps<ReturnType<typeof loader>>,
  ) {
    const id = useId();
    const { images, preload, interval, device, marginTop,
        marginBottom, title } = { ...DEFAULT_PROPS, ...props };
    return (
      <div class="w-full flex flex-row relative max-w-[1300px] m-auto justify-between  px-5 md:px-0 lg:py-0 z-10"
       style={{ marginTop: `${marginTop}`, marginBottom: `${marginBottom}` }}
       >
        <div class="w-1/2">
        {title && (
                <div
                  class=" text-20 lg:text-[40px] text-[#fff]  font-black not-italic font-archimoto-black mb-6 mt-7  lg:mb-[30px] lg:mt-[12px] "
                  dangerouslySetInnerHTML={{ __html:title }}
                >
                </div>
              )}
        </div>
  
        <div
          id={id}
          class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] sm:min-h-min min-h-[660px] w-full max-w-[800px] "
        >
          <Slider class="carousel carousel-center col-span-full row-span-full gap-6 w-full rounded-[20px] max-w-[623px] m-auto">
            {images?.map((image, index) => {
              return (
                <>
                  <Slider.Item index={index} class="carousel-item w-full">
                    <BannerItem
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
          {props.dots && <Dots images={images} interval={interval} />}
  
          <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
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


const DEFAULT_PROPS = {
    images: [
        {
            alt: "/feminino",
            action: {
                title: "New collection",
                subTitle: "Main title",
                label: "Explore collection",
                href: "/",
            },
            mobile:
                "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
            desktop:
                "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
        },
        {
            alt: "/feminino",
            action: {
                title: "New collection",
                subTitle: "Main title",
                label: "Explore collection",
                href: "/",
            },
            mobile:
                "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
            desktop:
                "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
        },
        {
            alt: "/feminino",
            action: {
                title: "New collection",
                subTitle: "Main title",
                label: "Explore collection",
                href: "/",
            },
            mobile:
                "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
            desktop:
                "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
        },
    ],
    preload: true,
};
