
import Slider from "$store/components/ui/Slider.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";


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
interface Banner {
    /** @title Imagem Desktop */
    desktop: ImageWidget;
    /** @title Imagem Mobile */
    mobile: ImageWidget;
    /** @title Texto da imagem */
    alt: string;
    action?: ActionProps;
}

interface Props {
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
}




export default function Dots({ images, interval = 0 }: Props) {
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
            <ul
              class="mobile:relative mobile:top-0 carousel justify-center
               col-span-full  z-10 row-start-4 absolute top-[15%]
               -left-[0px] rounded-[90px] border-solid border-[1px] border-[#C5CDDC]">
                {images?.map((_, index) => (
                    <li class="carousel-item">
                        <Slider.Dot index={index}>
                            <div class="">
                                <span class="flex item-center w-[170px] h-[51px] justify-center rounded-[90px]  bg-[#3CCBDA] group-disabled:bg-[#0B1227] py-3 px-8 ">{index + 1}</span>
                            </div>
                        </Slider.Dot>
                    </li>
                ))}
            </ul>
        </>
    );
}
