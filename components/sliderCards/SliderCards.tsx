
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { FnContext, SectionProps } from "deco/mod.ts";
import CardItem from "deco-sites/agencian1/components/sliderCards/CardItem.tsx";
import Dots from "deco-sites/agencian1/components/sliderCards/Dotz.tsx";
import Buttons from "deco-sites/agencian1/components/sliderCards/Buttons.tsx";
import Icon from "deco-sites/agencian1/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy title
 */
interface ActionProps {
    /** @title link */
    /** @description (ex: https://agencian1.com.br/) */
    href: string;
    /** @title Título da imagem */
    title: string;

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

    /** Icon Background */
    icon?: ImageWidget
}

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

function BannerCarousel(props: SectionProps<ReturnType<typeof loader>>) {
    const id = useId();
    const { images, preload, interval, device, marginTop, marginBottom, title } = { ...DEFAULT_PROPS, ...props };

    return (
        <div className="relative w-full overflow-x-clip">
            <div
                className="w-full flex flex-col relative max-w-[1300px] m-auto justify-between px-5 md:px-0 lg:py-0 z-10"
                style={{ marginTop: `${marginTop}`, marginBottom: `${marginBottom}` }}
            >
                {title && (
                    <div
                        className="block lg:text-center text-20 lg:text-[40px] text-[#fff] font-black not-italic font-archimoto-black mb-5 lg:mb-10"
                        dangerouslySetInnerHTML={{ __html: title }}
                    >
                    </div>
                )}
                <div
                    id={id}
                    className="grid md:grid-cols-[48px_1fr_48px] px-0 md:px-5 container"
                >
                    <Slider className="carousel carousel-center sm:carousel-end sm:gap-1 row-start-2 row-end-5">
                        {images?.map((image, index) => {
                            const params = { promotion_name: image.alt };
                            return (
                                <Slider.Item index={index} className="carousel-item flex items-center justify-start md:justify-center pl-6 md:pl-0 gap-6 w-[270px] md:w-1/3 lg:w-1/4">
                                    <CardItem
                                        image={image}
                                        lcp={index === 0 && preload}
                                        id={`${id}::${index}`}
                                    />
                                </Slider.Item>
                            );
                        })}
                    </Slider>

                    {props.arrows && <Buttons />}

                    {props.dots && <Dots images={images} interval={interval} />}

                    <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
                </div>
            </div>
            
            {(props.icon && props.device === "desktop") && (
                <Image src={props.icon} width={200} height={125} alt="icon" class="absolute right-0 -top-40" />
            )}
            <div className="absolute hidden md:block -top-28 -left-[215px] h-[469px] w-[469px] rounded-[469.469px] opacity-30 n1-custom-color-gradient-blue blur-[82px]"></div>
            <div className="absolute  -bottom-11 -left-28 lg:-bottom-[256px] lg:-left-[80px] h-[291px] md:h-[469px] w-[341px]  lg:w-[341px] md:w-[469px] rounded-[469.464px] opacity-30 n1-custom-color-gradient blur-[82px]"></div>
            <div className="absolute -left-12  h-[315px] lg:h-[469px] w-[415px] md:w-[469px] rounded-[469.469px] opacity-30 n1-custom-color-gradient-blue blur-[82px]"></div>
            <div className="absolute hidden md:block -right-[198px] h-[469px] w-[469px] rounded-[469.464px] opacity-30 n1-custom-color-gradient blur-[82px]"></div>
        </div>
    );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
    return {
        ...props,
        device: ctx.device,
    };
};

export default BannerCarousel;
