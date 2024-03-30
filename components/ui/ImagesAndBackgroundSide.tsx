import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface ImageGeneric{ 
    src?:ImageWidget;  
    width?:number;
    height?:number;
}

interface DeviceImage{  
    alt?:string;    
    desktop?:ImageGeneric;
    mobile?:ImageGeneric;
}

interface Side{
    title?:string;
    description?:string;
    device?:DeviceImage[];
}

interface Props{
    bg?:DeviceImage;
    side?:Side;
}

function ImagesAndBackgroundSide( { bg, side }:Props ){
    return (
        <>     
            <div class="portatil:w-[80%] tablet:w-[80%] tablet:ml-[30px] portatil:ml-[30px]">
                {side?.title && side.title !== '<p><br data-mce-bogus="1"></p>' && (
                    <div class="[&_*]:text-[#ffffff] [&_*]:text-32 mobile:[&_*]:text-22 font-archimoto-medium font-black mobile:mb-[15px]"
                        dangerouslySetInnerHTML={{ __html : side.title }}>
                    </div>
                )} 
                {side?.description && side.description !== '<p><br data-mce-bogus="1"></p>' && (
                    <div class="[&_*]:text-[#ffffff] [&_*]:text-14 font-noto-sans"
                        dangerouslySetInnerHTML={{ __html : side.description }}>
                    </div>
                )} 
                <div class="grid grid-cols-2-auto grid-rows-2 mobile:gap-y-[14px] mobile:gap-x-[7px] gap-y-[20px] gap-x-[10px] tablet:max-w-[70%]">
                    {side && side.device?.map(( { desktop, mobile, alt} )=> {
                        return(
                            <>
                                <Picture>                                    
                                    {mobile?.src && mobile?.width && mobile?.height && (
                                        <Source
                                            media="(max-width: 767px)"
                                            src={mobile.src}
                                            width={mobile.width}
                                            height={mobile.height}
                                        />
                                    )}
                                    {desktop?.src && desktop?.width && desktop?.height && (
                                        <Source
                                            media="(min-width: 768px)"
                                            src={desktop.src}
                                            width={desktop.width}
                                            height={desktop.height}
                                        />
                                    )}                                    
                                    <img 
                                        src={desktop?.src}
                                        width={desktop?.width}
                                        height={desktop?.height}
                                        alt={alt ? alt : "Certification"}
                                        class="portatil:w-[80%]"
                                    />
                                </Picture>                            
                            </>
                        )
                    })}
                </div>
            </div>    
        </>
    )
}

export default ImagesAndBackgroundSide;