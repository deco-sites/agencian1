import type { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "$store/sdk/clx.ts";
import { useEffect } from "preact/compat";

/**titleBy alt */
interface ImageGeneric {
  /**@title Imagem */
  src?: ImageWidget;
  /**@title Largura da Imagem */
  width?: number;
  /**@title Altura da imagem*/
  height?: number;
  /**@title Nome da imagem */
  alt?: string;
}

interface Props {
  /**@title  Imagem */
  image?: ImageGeneric;
  /**@title  Texto */
  /** @format html */
  text?: string;
  /**@title Texto do botão */
  textBtn?: string;
}

function removeHidden(target: boolean) {
  const elementFather = document.querySelector(".n1-popup");
  if (target) {
    if (elementFather) elementFather.classList.add("hidden");
  } else {
    if (elementFather) elementFather.classList.remove("hidden");
  }
}

function PopupLgpt({ image, text, textBtn }: Props) {
  useEffect(() => {
    if (localStorage.getItem("popupLgpd") === "yes") {
      removeHidden(true);
    } else {
      removeHidden(false);
    }
  }, []);

  function handleClick(e: Event) {
    const { target } = e;

    if (!target) return;

    if (target instanceof HTMLElement) {
      const elementFather = target?.closest(".n1-popup");
      elementFather?.classList.add("is-disabled");
      localStorage.setItem("popupLgpd", "yes");
    }
  }

  return (
    <>
      <div
        class={`hidden n1-popup fixed bottom-[20px] w-full mobile:left-[10px] mobile:w-[95%] mobile:mx-[auto] z-20`}
      >
        <div
          class={clx(
            `flex items-center lg:max-w-[1034px] lg:my-0 lg:mx-auto lg:py-[18px] lg:px-[60px]
                        rounded-[12px] border border-[#3CCBDA] backdrop-blur-[50px]
                        bg-[linear-gradient(8deg,_rgba(60,_203,_218,_0.00)_-32.53%,_rgba(60,_203,_218,_0.13)_63.83%,_rgba(60,_203,_218,_0.20)_276.77%)]
                        mobile:my-[0] mobile:flex-col mobile:px-[20px] mobile:py-[18px]`,
          )}
        >
          {image?.src && image?.width && image?.height && (
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image?.alt}
            />
          )}

          {text && (
            <div
              class={clx(
                `[&_*]:text-14 mobile:[&_*]:text-12 [&_*]:font-archimoto-medium text-[#ffffff] lg:ml-[20px] lg:mr-[50px]
                                mobile:mx-[0] mobile:my-[10px] mobile:text-center lg:max-w-[66%]`,
              )}
              dangerouslySetInnerHTML={{ __html: text }}
            >
            </div>
          )}

          {textBtn && (
            <button
              onClick={handleClick}
              class={`text-[14px] leading-[14px] text-primary font-black h-[40px] font-archimoto-medium bg-accent 
                                rounded-[100px] flex py-[15px] px-[20px] justify-center`}
            >
              {textBtn}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default PopupLgpt;
