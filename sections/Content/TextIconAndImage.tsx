import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";

interface CtaProps{
  /** @title link */  
  href?: string;
  /** @title Texto do link */    
  text?: string;
}


/** @titleBy name */
interface ImageGeneric{
    /** @title Imagem */ 
    src?:ImageWidget;
    /** @title Largura da imagem */ 
    width?: string;
    /** @title Altura da imagem */ 
    height?:string;
}

/** @titleBy name */
interface SubtitleWithTag{
    /** @title Nome da Tag */ 
    name?:string
    /** @title Tags */ 
    tag: {
        /** @title Desktop */         
        desktop?:ImageGeneric;
        /** @title Mobile */         
        mobile?:ImageGeneric;
    }
}

/** @titleBy name */
interface MiniImage{
    /** @title Nome da mini imagem */ 
    name?:string    
    /** @title Mini imagem */ 
    image: {
        /** @title Desktop */ 
        desktop?:ImageGeneric;
        /** @title Mobile */ 
        mobile?:ImageGeneric;
    }
}

interface ImagemDeskAndMobile{
    desktop?:ImageGeneric;
    mobile?:ImageGeneric;
}

export interface Props {
  /** @title Título */   
  /** @format html */  
  titleCenter?: string;
  /** @title Subtítulo */   
  /** @format html */  
  subtitle: string;
  /** @title Icon */     
  icon?:ImageWidget;
  /** @title Nome do ícon */ 
  nameIcon?:ImageWidget
  /** @title Tags */
  /** @maxItems 2 */ 
  subtitleWithTags?:SubtitleWithTag[];
  /** @title Descrição */   
  /** @format html */ 
  description: string;
  /** @title Imagem */  
  image: ImagemDeskAndMobile;
  /** @title Posicionamento */   
  placement: "esquerdo" | "direito";
  /** @title Mini imagens */
  /** @maxItems 3 */   
  miniImage?:MiniImage[];
  cta?: CtaProps;
  /** @title Desabilitar espaço? */     
  disableSpacing?: {
    top?: boolean;
    bottom?: boolean;
  };
}

const PLACEMENT = {
  esquerdo: "flex-col lg:flex-row-reverse",
  direito: "flex-col lg:flex-row",
};


export default function ImageSection({
  titleCenter,
  subtitle,
  icon,
  nameIcon,
  subtitleWithTags,
  description,
  image,
  placement,
  miniImage,
  disableSpacing,
  cta,
}: Props) {

    return (
        <div class="w-full text-[#ffffff] mobile:px-[20px] md:n1-container md:px-[120px]">
            <div
                class={`flex justify-between md:py-[80px] ${
                    PLACEMENT[placement]
                } text-left items-center z-10 ${
                    disableSpacing?.top ? "" : "pt-12 lg:pt-28"
                } ${disableSpacing?.bottom ? "" : "pb-12 lg:pb-28"}`}
                >
                {image && (
                    <div>
                        <Picture >
                            {image?.desktop && image.desktop?.src && image.desktop?.width && image?.desktop?.height && (
                                <Source
                                    src={image.desktop.src}
                                    width={Number(image.desktop.width)}
                                    height={Number(image.desktop.height)}
                                    media="(min-width: 768px)"
                                />
                            )}

                            {image?.mobile && image.mobile?.src && image.mobile?.width && image?.mobile?.height && (
                                <Source
                                    src={image.mobile.src}
                                    width={Number(image.mobile.width)}
                                    height={Number(image.mobile.height)}
                                    media="(max-width: 767px)"
                                />
                            )}
                            {image?.desktop && image.desktop?.src && image.desktop?.width && image?.desktop?.height && (
                                <img                              
                                    src={image.desktop.src}
                                    alt={"Imagem"}
                                    loading="lazy"
                                />
                            )}
                        </Picture>  
                    </div>
                )}
                <div class="md:max-w-[598px]">
                    {titleCenter && (
                        <div class="n1-text-icon-image__titleCenter font-archimoto-medium mobile:[&_*]:!text-[40px] leading-[110%] font-semibold"
                            dangerouslySetInnerHTML={{__html: titleCenter}}>
                            {titleCenter}
                        </div>
                    )}
                    {subtitle && (
                        <div class="n1-text-icon-image__subtitle mobile:mt-[24px] mobile:[&_*]:!text-20 font-archimoto-medium md:mb-[20px] md:text-[32px]"
                            dangerouslySetInnerHTML={{__html: subtitle}}>
                            {subtitle}
                        </div>
                    )}
                    {description && (
                        <div class="n1-text-icon-image__description mobile:my-[20px] font-noto-sans text-[14px] leading-[19.4px]"
                            dangerouslySetInnerHTML={{__html: description}}>
                            {description}
                        </div>
                    )}

                    <div class="flex md:-ml-[15px] md:mt-[20px] mobile:grid mobile:grid-cols-[repeat(2,_auto)]">
                        {miniImage && miniImage?.length > 1 && miniImage.map(({ image })=>{
                            const { desktop, mobile } = image;
                            return (
                                <>
                                    <Picture >
                                        {desktop && desktop?.src && desktop?.width && desktop?.height && (
                                            <Source
                                                media="(max-width: 767px)"
                                                src={desktop.src}
                                                width={Number(desktop.width)}
                                                height={Number(desktop.height)}
                                            />
                                        )}
                                        {mobile && mobile?.src && mobile?.width && mobile?.height && (
                                            <Source
                                                media="(max-width: 767px)"
                                                src={mobile.src}
                                                width={Number(mobile.width)}
                                                height={Number(mobile.height)}
                                            />
                                        )}
                                        {desktop && desktop?.src && desktop?.width && desktop?.height && (
                                            <img
                                                loading={"lazy"}
                                                src={desktop.src}
                                                width={Number(desktop.width)}
                                                height={Number(desktop.height)}
                                                alt={'Mini imagens'}
                                            />
                                        )}
                                    </Picture> 
                                </>
                            )
                        })}
                    </div>
                </div>


                {cta?.href && cta?.text && (
                <a
                    class="pt-4 flex gap-2 border-none text-secondary transition-colors duration-200 cursor-pointer"
                    href={cta.href}
                >
                    <span>{cta.text}</span>
                    <Icon
                    id="ChevronRight"
                    width={24}
                    height={24}
                    strokeWidth={"2"}
                    class="text-secondary"
                    />
                </a>
                )}
            </div>
        </div>
    );
}
