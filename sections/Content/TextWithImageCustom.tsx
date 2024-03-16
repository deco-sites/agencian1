import type { ImageWidget } from "apps/admin/widgets.ts";

interface Props{
    image?:ImageWidget;
}

function TextWithImageCustom( { image } : Props ){
    return(
        <>
            <div class="text-[#ffffff] md:n1-container md:px-[120px]">
                <h1 class="text-[90px] md:max-w-[60%] font-archimoto-medium font-black">vamos dar vida as suas ideias!</h1>
                {image && (
                    <img src={image} />
                )}
                <div>
                    <div>
                        <span>Fale com a gente</span>
                    </div>
                    <div>
                        <span>Diga oi!</span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TextWithImageCustom;