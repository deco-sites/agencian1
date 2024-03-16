import { clx } from "$store/sdk/clx.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
// import { FnContext, SectionProps } from "deco/mod.ts";

interface TagProps{
    imageTag?:ImageWidget;
    nameTag?: string; 
}

interface PropsImage{
    imageLogo?: ImageWidget;
    alt?: string;
    href?:string;
    widthLogo?:number;    
    heightLogo?:number;
    imageBackground?: ImageWidget;
    widthImageBackground?:number;    
    heightImageBackground?:number;    
    infoPorcentagem?:string;
    infoText?:string;
    icon?:ImageWidget;

    /********CONFIGURAÇÃO DO HOVER******* */

    imageLogoHover?: ImageWidget;
    imageLogoMobileHover?: ImageWidget;   
    widthLogoHover?:number; 
    heightLogoHover?:number;  
    imageBackgroundHover?: ImageWidget;
    widthImageBackgroundHover?:number;
    heightImageBackgroundHover?:number; 
    iconHover?:ImageWidget;  
    tagProps?:TagProps[]
}

interface Props{
    settingsImage?:PropsImage[];
}

// function CasesComponentDesktop(props: SectionProps<ReturnType<typeof loader>>){
function CasesComponentDesktop({ settingsImage }:Props){

    function handleMouserHover( e:MouseEvent ){
        const { target } = e;
        const modeDesktop = globalThis.matchMedia("(min-width: 1281px)").matches;
        const modePortatil = globalThis.matchMedia('(min-width:1024px) and (max-width: 1280px)').matches;
        const modeTablet = globalThis.matchMedia('(min-width:768px) and (max-width: 1024px)').matches;
        
        if(!target) return;
        
        if( target && target instanceof HTMLElement ){
            const cardElement = target?.closest('.n1-cases-card');
            const bgWidth = cardElement?.querySelector<HTMLElement>('.bg-width')?.dataset.bgwidth;
            const bgWidthHover = cardElement?.querySelector<HTMLElement>('.bg-width-hover')?.dataset.bgwidthhover;
            const logoWidth = cardElement?.querySelector<HTMLElement>('.logo-width')?.dataset.logowidth;
            const logoWidthHover = cardElement?.querySelector<HTMLElement>('.logo-width-hover')?.dataset.logowidthhover;

            if(modeDesktop){
                switch (e.type) {
                    case 'mouseleave':
                        cardElement?.classList.remove('is-active');
                        bgWidth && cardElement?.setAttribute('style', `width: ${bgWidth}px`);
                        bgWidth && cardElement?.querySelector<HTMLElement>('.n1-cases-card__item--hover')?.style?.width == bgWidth ? bgWidth + 'px' : '300px';
                        logoWidth && cardElement?.querySelector<HTMLElement>('.n1-cases-card__logo--hover')?.setAttribute('style', `width: ${logoWidth}px`);
                    break;
                    case 'mouseover':
                        cardElement?.classList.add('is-active');
                        bgWidthHover && cardElement?.setAttribute('style', `width: ${bgWidthHover}px`);
                        bgWidthHover && cardElement?.querySelector<HTMLElement>('.n1-cases-card__item--hover')?.style?.width == bgWidthHover ? bgWidthHover + 'px' : '560px';
                        logoWidthHover && cardElement?.querySelector<HTMLElement>('.n1-cases-card__logo--hover')?.setAttribute('style', `width: ${logoWidthHover}px`);
                    break;
                }
            }

            if( modePortatil ){
                switch (e.type) {
                    case 'mouseleave':
                        cardElement?.classList.remove('is-active');
                        bgWidth && cardElement?.setAttribute('style', `width: ${bgWidth}px`);
                        bgWidth && cardElement?.querySelector<HTMLElement>('.n1-cases-card__item--hover')?.style?.width == bgWidth ? (Number(bgWidth) / 2) + 'px' : '300px';
                        logoWidth && cardElement?.querySelector<HTMLElement>('.n1-cases-card__logo--hover')?.setAttribute('style', `width: ${logoWidth}px`);
                    break;
                    case 'mouseover':
                        cardElement?.classList.add('is-active');
                        bgWidthHover && cardElement?.setAttribute('style', `width: ${Number(bgWidthHover)/1.7}px`);
                        bgWidthHover && cardElement?.querySelector<HTMLElement>('.n1-cases-card__item--hover')?.style?.width == bgWidthHover ? (Number(bgWidthHover)) + 'px' : '360px';
                    break;
                }
            }

            if( modeTablet ){
                switch (e.type) {
                    case 'mouseleave':
                        cardElement?.classList.remove('is-active');
                        bgWidth && cardElement?.setAttribute('style', `width: ${bgWidth}px`);
                        bgWidth && cardElement?.querySelector<HTMLElement>('.n1-cases-card__item--hover')?.style?.width == bgWidth ? (Number(bgWidth) / 2) + 'px' : '300px';
                        logoWidth && cardElement?.querySelector<HTMLElement>('.n1-cases-card__logo--hover')?.setAttribute('style', `width: ${logoWidth}px`);
                    break;
                    case 'mouseover':
                        cardElement?.classList.add('is-active');
                        bgWidthHover && cardElement?.setAttribute('style', `width: ${Number(bgWidthHover)/1.7}px`);
                        bgWidthHover && cardElement?.querySelector<HTMLElement>('.n1-cases-card__item--hover')?.style?.width == bgWidthHover ? (Number(bgWidthHover)) + 'px' : '360px';
                    break;
                }
            }
        }
    }    

    return(
        <>
            <div class={clx(`sm:col-[1_/_2_span] grid sm:grid-cols-[repeat(2,_1fr)] lg:grid-cols-[repeat(3,_1fr)] sm:justify-center md:mt-[64px] gap-x-[18px] sm:gap-y-[10px]`)} 
                onMouseOver={handleMouserHover}>

                {settingsImage && settingsImage.length > 1 && settingsImage.map(({
                    imageLogo,
                    alt,
                    href,
                    widthLogo,  
                    heightLogo,
                    imageBackground,                              
                    widthImageBackground,                              
                    heightImageBackground,   
                    infoPorcentagem, 
                    infoText,
                    icon,
                    imageLogoHover,   
                    imageBackgroundHover,   
                    widthLogoHover,  
                    widthImageBackgroundHover,    
                    heightImageBackgroundHover, 
                    iconHover,  
                    tagProps                         
                })=>{

                    const nameScape = alt?.replaceAll(/\s/g, '-').toLowerCase();

                    return(
                        <>
                            <a href={`${href ? href : "javascript:void(0)"}`}
                                class="relative n1-cases-card cursor-grab [transition:all_.375s_linear] md:w-0 mobile:mb-[10px]"  
                                onMouseLeave={handleMouserHover}
                                style={{
                                    height : `${heightImageBackgroundHover ? heightImageBackgroundHover + 'px' : '500px'}`,
                                    pointerEvents : `${href ? 'all' : 'grab'}`
                                }}>

                                {widthLogo && (
                                    <input type="hidden" class="logo-width" data-logowidth={widthLogo} />
                                )}	

                                {widthLogoHover && (
                                    <input type="hidden" class="logo-width-hover" data-logowidthhover={widthLogoHover} />
                                )}	                                            

                                {widthImageBackground && (
                                    <input type="hidden" class="bg-width" data-bgwidth={widthImageBackground} />
                                )}

                                {widthImageBackgroundHover && (
                                    <input type="hidden" class="bg-width-hover" data-bgwidthhover={widthImageBackgroundHover} />
                                )}

                                <div class="mobile:hidden n1-cases-card__item rounded-[20px] portatil:!w-[270px]"
                                    style={{ 
                                        backgroundImage : `url(${imageBackground})`,
                                        backgroundColor : "#ffffff",
                                        width: `${widthImageBackground ? widthImageBackground + 'px' : '300px'}`,
                                        height: `${heightImageBackground ? heightImageBackground + 'px' : '500px'}`,
                                        backgroundSize : 'cover',
                                    }} >
                                    <div class="flex flex-col justify-between h-full pr-[28px] pb-[29px] pl-[25px]"
                                        style={{ paddingTop : `${ nameScape && nameScape === 'costa' || nameScape === 'costa-atacado' ? '41px' : '71px' }` }}
                                    >

                                        {imageLogo && (
                                            <img src={`${imageLogo}`} class="w-full n1-cases-card__logo duration-200" 
                                                style={{ 
                                                    width: `${widthLogo ? widthLogo + 'px' : '100%'}`,
                                                    height: `${heightLogo ? heightLogo + 'px' : 'auto'}`,
                                                }}                                                  
                                            />
                                        )}

                                        <div class="flex justify-between items-center">
                                            <div class="flex flex-col">
                                                {infoPorcentagem && (
                                                    <span class="font-archimoto-medium md:text-50 text-primary font-black">{ infoPorcentagem }</span>
                                                )}
                                                {infoText && (
                                                        <span class="font-archimoto-medium md:text-27 text-primary font-black uppercase">{ infoText }</span>
                                                )}
                                            </div>
                                            {icon && (
                                                <img src={`${icon}`} />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* EFEITO HOVER  */}                                
                                <div 
                                    class={clx(`n1-cases-card__item--hover md:invisible md:opacity-0 mobile:w-[346px] tablet:!max-w-[300px] mobile:min-h-[342px] 
                                        absolute top-0 left-0 duration-300 [transition:all_.2s_linear] rounded-[20px] is-active`)}
                                    style={{ 
                                        backgroundImage : `${ imageBackgroundHover && 'url('+imageBackgroundHover+')'}`,
                                        height: `${heightImageBackgroundHover ? heightImageBackgroundHover + 'px' : '500px'}`,
                                        backgroundSize : 'cover',
                                    }} 
                                >

                                    <div class="flex flex-col justify-between h-full pt-[71px] pr-[28px] pb-[29px] pl-[25px]"
                                        style={{ paddingTop : `${ nameScape && nameScape === 'costa' || nameScape === 'costa-atacado' ? '41px' : '71px' }` }}  
                                    >

                                        {imageLogoHover && (
                                            <img src={`${imageLogoHover}`} class="n1-cases-card__logo--hover duration-200 h-auto"
                                            />
                                        )}

                                        <div class="grid grid-cols-[repeat(2,_auto)] justify-between items-end">
                                            <div>
                                                <div class="flex flex-col">
                                                    {infoPorcentagem && (
                                                        <span class="font-archimoto-medium md:text-50 text-[#ffffff] font-black">{ infoPorcentagem }</span>
                                                    )}
                                                    {infoText && (
                                                        <span class="font-archimoto-medium md:text-27 text-[#ffffff] font-black uppercase">{ infoText }</span>
                                                    )}
                                                </div>

                                                <div class="grid grid-cols-[repeat(3,auto)] grid-rows-[repeat(2,_1fr)] justify-between gap-[16px] mt-[30px]">
                                                    {tagProps && tagProps.length > 1 && tagProps.map(({ imageTag, nameTag })=>{
                                                        return(
                                                            <>
                                                                <div class="flex items-center justify-left">
                                                                    {imageTag && (
                                                                        <img src={`${imageTag}`} alt={`${nameTag ? nameTag : 'Tag'}`} />
                                                                    )}
                                                                </div>
                                                            </>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            {iconHover && (
                                                <img src={`${iconHover}`} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </a>                                
                        </>
                    )
                })}
            </div>        
        </>
    )
}

export default CasesComponentDesktop;