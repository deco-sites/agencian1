import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { FnContext, SectionProps } from "deco/mod.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { clx } from "$store/sdk/clx.ts";
import LinkWithOptionArrow from '$store/components/ui/LinkWithOptionArrow.tsx';

interface InfoProps{
    /**@title Título*/    
    /**@format textarea*/    
    title?:string;
    /**@title Texto*/
    /**@format textarea*/
    text?:string
    /**@title Texto do link*/    
    textLink?:string;
    /**@title link*/    
    /**@description (ex: https://agencian1.com.br/)*/    
    href?:string;
}

interface ImageGeneric{
  /** @title Imagem */
  image?:ImageWidget;
  /** @title Largura da Imagem */  
  width?:number;
  /** @title Altura da Imagem */    
  height?:number;
  /** @title Nome da Imagem */    
  alt?:string
}

/** @titleBy alt */
export interface ImageCarousel {
    /** @title Nome do Bloco */
    alt: string;
    /** @title Informações */
    settingsInfo?:InfoProps;    
    /** @title Imagem */
    desktop: ImageGeneric;
}

export interface Props {
    /** @title Texto do Link */
    textLink?:string;
    /** @title Link */
    /** @description (ex: https://agencian1.com.br/) */
    link?:string;  
    /**@title Título  */  
    /**@format html  */        
    title?:string;
    /**@title Texto  */    
    /**@format html  */    
    texto?:string;
    /**@title Imagem  */
    /** @description (Limite 5 imagens) */
    /** @maxItems 5 */    
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

function ImageCarouselItem({ image, lcp, id }: { image: ImageCarousel; lcp?: boolean; id: string }) {
    const { alt, desktop, settingsInfo } = image;

    return (
        <>
            <div id={id}
                class="n1-text-width-image__link relative overflow-hidden w-full py-[30px] px-[20px]"
            >
                {desktop && desktop?.image && desktop?.width && desktop?.height && (
                    <Image
                      class="mobile:h-auto mobile:max-w-full relative"
                      src={desktop.image}
                      width={desktop.width}
                      height={desktop.height}
                      alt={desktop && desktop?.alt ? desktop?.alt : 'Imagem'}
                      loading={lcp ? "eager" : "lazy"}                                          
                    /> 
                )}

                <div class="flex flex-col">
                    { settingsInfo?.title && (
                        <span class="text-[#ffffff] font-archimoto-medium md:text-24 !leading-[31.8px] font-black md:mt-[30px] mb-[10px] n1-text-top-width-image__title"> 
                        { settingsInfo?.title } 
                        </span>
                    ) }

                    { settingsInfo?.text && (
                        <span class="text-[#ffffff] font-noto-sans md:text-16 font-normal mobile:mb-[32px] md:mb-[30px] n1-text-top-width-image__text"> { settingsInfo?.text } </span>
                    ) }

                    { settingsInfo?.textLink && (                        
                        <a 
                          href={settingsInfo?.href ?? "javascript:void(0)"}
                          aria-label={settingsInfo?.title}                        
                          class={clx(`mobile:w-[55%] md:w-[43%] flex border border-[#fff] px-[20px] pb-[11px] 
                            pt-[12px] rounded-[100px] justify-center items-center min-w-[134px]`)}>

                            <span class="text-[#ffffff] flex font-archimoto-medium md:text-14 font-black"> { settingsInfo?.textLink } </span>
                        </a>
                    ) }                
                </div>          
            </div>
        </>
    );
}

function Dots( { images }: Props ) {
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
                    return(
                        <>
                            <li class="carousel-item">
                                <Slider.Dot 
                                    index={index}
                                    classes={`${(( index === 0 ) || ( index % 4 === 0 ) ) ? "" : 'hidden'}`}
                                >

                                    <div class='pb-5'>
                                        <div 
                                            class={clx(`n1-banner-btn__dot--item w-[140px] sm:w-20 h-[3px] rounded group-disabled:animate-progress group-disabled:bg-[#06ADC2] 
                                            bg-gradient-to-r from-[#06ADC2] from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]`)}
                                        />
                                    </div>
                                </Slider.Dot>
                            </li>
                        </>
                    )
                })}
            </ul>
        </>
    );
}

function Buttons() {
    return (
        <>
            <div class="absolute w-full flex mobile:justify-center mobile:items-end justify-between h-full top-[0] items-center pb-[10px]">
                <div class="flex items-center justify-start z-10 col-start-1 row-start-2 md:ml-[5%] mobile:mr-[30px]">
                    <Slider.PrevButton class="btn btn-circle bg-[#ffffff] w-[40px] !h-[40px]">
                        <Icon
                            size={18}
                            id="Banner-arrow-left"
                            strokeWidth={3}
                        />
                    </Slider.PrevButton>
                </div>
                <div class="flex items-center justify-end z-10 col-start-3 row-start-2 md:mr-[5%] mobile:ml-[30px]">
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
    const { images, preload, title, texto, textLink, link, device } = props;

    return (
        <>
            <div id={id} class="relative mobile:pb-[60px]">
                <div class=" md:n1-container md:px-[120px] z-10 md:mb-[40px] relative">

                    <div class="mobile:my-[24px] mt-[120px] mb-[43px] text-[#ffffff] flex items-center justify-between flex-wrap">
                        <div class="mobile:px-[20px]">
                            {title && (
                                <div class="n1-text-widt-image__title mobile:[&_*]:!text-32 mobile:[&_*]:!leading-[38.4px] uppercase font-archimoto-medium md:text-56 md:leading-[20px]"
                                    dangerouslySetInnerHTML={{__html: title}}> 
                                </div>                                 
                            )}
                            {texto &&  (
                                <div class="n1-text-widt-image__text mobile:[&_*]:!text-14 mobile:[&_*]:!leading-[14px] md:flex font-noto-sans block mt-[11px] text-20 leading-[26px]"
                                    dangerouslySetInnerHTML={{__html: texto}}>                                
                                </div>
                            )}
                        </div>
                        {textLink && (
                            <div class="n1-mosaic__link my-[15px] mobile:px-[24px]">
                                <LinkWithOptionArrow 
                                    text={textLink} 
                                    link={link} 
                                    width={'255'} 
                                    fontSize='16'
                                    margin={'0'}
                                />
                            </div>
                        )}                        
                    </div>


                    <Slider class="carousel carousel-center gap-x-[22px] flex mobile:px-[20px]">
                        {images?.map((image, index) => {
                            
                            return (
                                <>
                                    <Slider.Item 
                                      index={index} 
                                      class="carousel-item mobile:w-[90%] w-[31.666%] rounded-[10px]
                                        bg-[linear-gradient(181deg,_#FFF_-176.1%,_rgba(255,_255,_255,_0.29)_-85.87%,_rgba(255,_255,_255,_0.00)_124.35%)]">

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
                </div>
        
                {props.arrows && <Buttons />}
        
                {props.dots && device === 'desktop' && <Dots images={images} />}
        
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
