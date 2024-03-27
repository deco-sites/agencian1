import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import ImagesAndBackgroundSide from "$store/components/ui/ImagesAndBackgroundSide.tsx";
import { clx } from "$store/sdk/clx.ts";

interface ImageGeneric{
    /**@title Imagem */    
    src?:ImageWidget;
    /**@title Largura da Imagem */    
    width?:number;
    /**@title Altura da Imagem */    
    height?:number;

}

/**@titleBy alt */
interface DeviceImage{
    /**@title Nome da Imagem */    
    alt?:string;    
    desktop?:ImageGeneric;
    mobile?:ImageGeneric;
}

interface Side{
    /**@title Título */
    /**@format html */
    title?:string;
    /**@title Descrição */    
    /**@format html */
    description?:string;    
    /**@title Imagem */
    device?:DeviceImage[];
}

interface Props{
    /**@title Imagem de fundo */
    bg?:DeviceImage;
    /**@title Lado esquerdo */
    sideLeft?:Side;
    /**@title Lado direito */
    sideRight?:Side;
}


function ImagesAndBackground( { bg, sideLeft, sideRight }:Props ){
    return(
        <>
            <section class="md:n1-container md:px-[120px] mobile:px-[20px]">
                <div class="relative flex mobile:mb-[80px] tablet:mb-[80px]">
                    {bg && (
                        <div>
                            <Picture>                                    
                                {bg.mobile?.src && bg.mobile?.width && bg.mobile?.height && (
                                    <Source
                                        media="(max-width: 767px)"
                                        src={bg.mobile.src}
                                        width={bg.mobile.width}
                                        height={bg.mobile.height}
                                    />
                                )}
                                {bg?.desktop?.src && bg.desktop?.width && bg.desktop?.height && (
                                    <Source
                                        media="(min-width: 768px)"
                                        src={bg.desktop.src}
                                        width={bg.desktop.width}
                                        height={bg.desktop.height}
                                    />
                                )}                                    
                                <img 
                                    src={bg.desktop?.src}
                                    width={bg.desktop?.width}
                                    height={bg.desktop?.height}
                                    class="mobile:rounded-[20px] mobile:w-full"
                                />
                            </Picture>                            
                        </div>                        
                    )}
                    
                    <div class={clx(`${sideLeft && sideRight?.title !== '<p><br data-mce-bogus="1"></p>' ? 'flex-col' : "" }
                        absolute w-full h-full flex items-center justify-between`)}>
                        <div class={clx(`
                            ${sideLeft && sideRight 
                                ? 'flex side-left md:w-[50%] mobile:w-full justify-end mobile:justify-center'
                                : sideRight && !sideLeft ? 'flex side-left md:w-[50%] mobile:w-full justify-start mobile:justify-center'
                                : sideLeft && sideRight ? 'flex w-full h-full'
                                : 'hidden'
                            }`)}>                              

                            <div class={clx(`flex
                                ${sideLeft && sideRight?.title !== '<p><br data-mce-bogus="1"></p>'
                                    ? 'w-full flex-row justify-around items-center mobile:flex-col mobile:gap-[20px]'
                                    : 'flex-col gap-y-[20px]'
                                }`)}>
                                {sideLeft && (
                                    <ImagesAndBackgroundSide side={sideLeft} />                                                           
                                )}
                                {sideRight?.title !== '<p><br data-mce-bogus="1"></p>' && (
                                    <ImagesAndBackgroundSide side={sideRight} />                                                           
                                )}                                                          
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    )
}

export default ImagesAndBackground;