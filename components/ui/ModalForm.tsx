
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { headerHeight } from "$store/components/header/constants.ts";

/**@titleBy alt*/ 
interface Image{  
    src?:ImageWidget;   
    width?:number;  
    height?:number;   
    alt?:string;
}

interface Device{
    desktop?:Image;
    mobile?:Image;
}

interface Text{  
    title?:string;   
    description?:string;
}

interface Props{      
    image?:Device;      
    text?:Text;
    device?:string;
}

function ModalForm( { image, text, device } : Props ){

    const headerHeightNumber = headerHeight ? Number(headerHeight.replaceAll(/\D/g,'')) + 100 : null;

    console.log('device ----> ', device)

    return(
        <>
            <div class="fixed top-0 left-0 w-full h-full z-[11] bg-[rgba(11,_18,_39,_0.80)] text-[#ffffff]">
                <div class="w-full h-full flex items-start justify-center">
                    <div 
                        class="[box-shadow:0_0px_2px_#fff] mobile:w-[90%] mobile:mt-[150px] notebook:max-w-[55%] notebook:min-w-[40%] 
                            xl:w-[600px] 2xl:h-[540px] rounded-[16px] backdrop-filter backdrop-blur-[42px] flex flex-col justify-center items-center 
                            notebook:gap-[15px] gap-[24px] px-[20px] md:px-[30px] py-[50px] mt-[120px]
                            bg-[linear-gradient(161deg,_rgba(255,_255,_255,_0.10)_0%,_rgba(255,_255,_255,_0.05)_101.7%)]"
                        // style={{
                        //     marginTop: `${headerHeight && device === 'desktop' ? headerHeightNumber + 'px' : '120px'}` 
                        // }}
                        >
                        <div>
                            {image &&  (
                                <Picture>                                    
                                    {image.mobile?.src && image.mobile?.width && image.mobile?.height && (
                                        <Source
                                            media="(max-width: 767px)"
                                            src={image.mobile.src}
                                            width={image.mobile.width}
                                            height={image.mobile.height}
                                        />
                                    )}
                                    {image?.desktop?.src && image.desktop?.width && image.desktop?.height && (
                                        <Source
                                            media="(min-width: 768px)"
                                            src={image.desktop.src}
                                            width={image.desktop.width}
                                            height={image.desktop.height}
                                        />
                                    )}                                    
                                    <img 
                                        src={image.desktop?.src}
                                        width={image.desktop?.width}
                                        height={image.desktop?.height}
                                        class="mobile:w-full"
                                    />
                                </Picture>                             
                            )}
                        </div>
                        {text?.title && (
                            <div class="[&_*]:text-32 xl:[&_*]:text-48 [&_*]:font-archimoto-medium [&_*]:font-black"
                                dangerouslySetInnerHTML={{ __html: text.title }}>
                            </div>
                        )}
                        {text?.description && (
                            <div class="[&_*]:text-18 xl:[&_*]:text-20 [&_*]:font-noto-sans [&_*]:font-normal"
                                dangerouslySetInnerHTML={{ __html: text.description  }}>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}


export default ModalForm;