import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { FnContext, SectionProps } from "deco/mod.ts";
import { BannerItem } from "deco-sites/agencian1/components/sliderColumn/BannerItems.tsx";
import Dots from "deco-sites/agencian1/components/sliderColumn/Dots.tsx";
import Buttons from "deco-sites/agencian1/components/sliderColumn/Buttons.tsx";
import { clx } from "$store/sdk/clx.ts";

export interface Banner {
  /** @title Imagem Desktop */
  desktop: ImageWidget;
  /** @title Imagem Mobile */
  mobile: ImageWidget;
  /** @title Alt */
  alt: string;

  action?: ActionProps;

  /** @format html */
  subTitle: string;
  /** @title adicionar barra "/" antes da frase?. */
  addBarSlide?:boolean;  
  
  /** @title adicionar chaves "{}" antes e depois da frase? */  
  addKeysInWordsSlide?:boolean;   

  /** @format html */
  description: string;
}

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

export interface Props {
  /** @format html */
  title?: string;

  /** @title adicionar barra "/" antes da frase? */
  addBar?:boolean;  
  /** @title adicionar chaves "{}" antes e depois da frase? */  
  addKeysInWords?:boolean;   

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

export default function SliderColumn(props: SectionProps<ReturnType<typeof loader>>) {
  const id = useId();
  const { images, preload, interval, device, marginTop, marginBottom, title, addKeysInWords, addBar } = props;

  return (
    <div
      class="w-full flex  flex-col  relative max-w-[1300px] m-auto justify-between  px-5 md:px-0 lg:py-0 z-10"
      style={{ marginTop: `${marginTop}`, marginBottom: `${marginBottom}` }}
    >
      {title && (
        <div
          class={clx(`block lg:text-center text-20 lg:text-[40px] text-[#fff] font-black not-italic font-archimoto-black mb-5 lg:mb-10
            ${addKeysInWords ? 'is-keys-custom' : addBar ? 'is-bar-custom' : ""}`)}
          dangerouslySetInnerHTML={{ __html: title }}
        >
        </div>
      )}

      <div
        id={id}
        class={clx(`lg:grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]
          h-[521px] lg:h-auto  w-full flex items-center justify-end flex-col-reverse`)}
      >
        <Slider class="carousel carousel-center col-span-full row-span-full gap-6 w-full">
          {images?.map((image, index) => {      
            return (
              <>
                <Slider.Item index={index} class="carousel-item w-full">
                  <BannerItem
                    image={image}
                    title={title}
                    lcp={index === 0 && preload}
                    id={`${id}::${index}`}
                    addBarSlide={image?.addBarSlide }
                    addKeysInWordsSlide={image?.addKeysInWordsSlide}
                  />
                </Slider.Item>
              </>
            );
          })}
        </Slider>

        {props.arrows && <Buttons device={device} />}
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