import { clx } from "$store/sdk/clx.ts";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

function ButtonTop(){
    const window_ = window;
    const buttomTopVisible = useSignal(false);    

    function handleScroll(){    
        const deviceHeight = window_.outerHeight
        const windowScrollY = window_.scrollY.toFixed();
    
        if( Number(windowScrollY) > deviceHeight ){
            buttomTopVisible.value = true;
        } else {
            buttomTopVisible.value = false;
        }
    }
    
    function handleClick(){    
        window_.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    useEffect(() => {
        window_.addEventListener("scroll", () => {
            handleScroll();      
        });
    });

    return(
        <>
            {buttomTopVisible.value && (
                <button 
                    class={clx(`n1-buttomTop fixed bottom-[40px] z-10 right-[27px] md:right-[80px]`)}
                    onClick={handleClick}
                >
                    <div
                        class={clx(`md:w-[70px] md:h-[70px] w-[66px] h-[66px]`)}>
                        <span
                            class={clx(`mt-[10px] text-secondary font-archimoto-medium text-[14px] md:text-[16px] font-black relative top-[5px]`)}
                        >
                            Topo
                        </span>
                    </div>
                </button>
            )}
        </>
    )
}

export default ButtonTop;