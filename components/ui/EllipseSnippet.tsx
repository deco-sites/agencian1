import { clx } from "$store/sdk/clx.ts";

interface EllipseProps{
    desktop?:boolean;
    mobile?:boolean;
}

interface Ellipse{ 
    ellipse01?:EllipseProps;     
    ellipse02?:EllipseProps;        
    ellipse03?:EllipseProps;          
    ellipse04?:EllipseProps;
}

interface Props{
    ellipse?:Ellipse;
}

function EllipseSnippet( { ellipse } : Props ){
    return(
        <>
            <div 
                class={clx(`
                    ${ellipse?.ellipse01?.desktop ? 'md:hidden' : ''} 
                    ${ellipse?.ellipse01?.mobile ? 'mobile:hidden' : ''} 
                    absolute md:top-[40px] md:-left-[40px] mobile:top-[60px] mobile:-left-[20px]`)}>
                <img 
                    class="md:w-[100px] md:h-[100px] mobile:w-[50%]"
                    src="/image/star.png"
                    loading="lazy"/>                    
            </div>

            <div
                class={clx(`
                    ${ellipse?.ellipse02?.desktop ? 'md:hidden' : ''} 
                    ${ellipse?.ellipse02?.mobile ? 'mobile:hidden' : ''}                     
                    md:w-[126px] md:h-[28px] -rotate-[17deg] bg-secondary filter blur-2xl absolute bottom-[50px] left-[0]
                    mobile:[bottom:initial] mobile:-left-[30px] mobile:top-[310px] mobile:w-[126px] mobile:h-[28px]`)}>
            </div>

            <div
                class={clx(`
                    ${ellipse?.ellipse03?.desktop ? 'md:hidden' : ''} 
                    ${ellipse?.ellipse03?.mobile ? 'mobile:hidden' : ''}                     
                    w-[126px] h-[28px] -rotate-[17deg] bg-accent filter blur-2xl absolute right-[10px] top-[0]`)}>
            </div>

            <div 
                class={clx(`
                    ${ellipse?.ellipse04?.desktop ? 'md:hidden' : ''} 
                    ${ellipse?.ellipse04?.mobile ? 'mobile:hidden' : ''}                    
                    n1-ellipse__mobile absolute right-0 md:-bottom-[75px] md:w-[462px] md:h-[263px] 
                    mobile:top-[270px] mobile:w-[230px] mobile:h-[230px]`)}>
                <div class="hidden md:flex items-end justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" width="108" height="263" viewBox="0 0 108 263" fill="none">
                        <g filter="url(#filter0_f_14285_14929)">
                            <ellipse cx="184.125" cy="211.5" rx="83.625" ry="111.5" fill="#F6AB00"/>
                        </g>
                        <defs>
                            <filter id="filter0_f_14285_14929" x="0.5" y="0" width="367.25" height="423" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_14285_14929"/>
                            </filter>
                        </defs>
                    </svg>
                </div>
                <div class="absolute top-0 right-0">
                    <img 
                        class="hidden md:flex md:w-[288px] md:h-[263px]"
                        src="/image/bg-ellipses-multiple.png"
                        loading="lazy"/>
                    <img 
                        class="hidden mobile:flex mobile:w-[165px] mobile:h-[151px]"
                        src="/image/bg-ellipses-multiple-mobile.png"
                        loading="lazy"/>
                </div>
            </div>        
        </>
    )
}

export default EllipseSnippet;