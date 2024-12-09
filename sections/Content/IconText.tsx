import type { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "$store/sdk/clx.ts";

/**@titleBy name */
interface Image {
  /**@title Nome da imagem */
  name?: string;
  /**@title Icon */
  src?: ImageWidget;
  /**@title Largura do icon */
  /**@description (ex: 40) */
  width?: number;
  /**@title Altura do icon */
  /**@description (ex: 40) */
  height?: number;
  /**@title Texto */
  /**@format textarea */
  text?: string;
}

interface Icon {
  /**
   * @title Subtítulo
   * @format rich-text
   */
  subtitle?: string;
  /** @title adicionar barra "/" antes da frase? */
  addBar?: boolean;
  /** @title adicionar chaves "{}" antes e depois da frase? */
  addKeysInWords?: boolean;
  /**@title Image */
  /** @maxItems 4 */
  image?: Image[];
}

interface Props {
  /**@description Grade */
  grid?: {
    /**@title Linha */
    /** @maxItems 2 */
    row?: Icon[];
  };
}

function IconText({ grid }: Props) {
  return (
    <>
      <div class="md:n1-container md:px-[120px] text-[#ffffff] md:py-[57px]">
        <div>
          {grid && grid.row &&
            grid.row.map(
              ({ subtitle, image, addKeysInWords, addBar }, index) => {
                return (
                  <>
                    {subtitle && (
                      <div
                        class={clx(`${index === 1 ? "mobile:mt-[80px]" : ""} 
                      mobile:ml-[20px] mobile:[&_*]:text-[24px] [&_*]:text-[36px] text-[36px] mb-[24px] [&_*]:font-archimoto-medium [&_*]:font-black
                      ${
                          addKeysInWords
                            ? "is-keys-custom"
                            : addBar
                            ? "is-bar-custom"
                            : ""
                        }`)}
                        dangerouslySetInnerHTML={{ __html: subtitle }}
                      >
                      </div>
                    )}

                    <ul
                      class={clx(
                        `mobile:flex-col mobile:justify-center mobile:items-center mobile:gap-[16px] items-stretch
                    ${
                          index === 0
                            ? "md:mb-[80px]"
                            : ""
                        } flex flex-wrap items-center md:gap-[16px]`,
                      )}
                    >
                      {image &&
                        image?.map(({ name, src, width, height, text }) => {
                          return (
                            <>
                              {src && width && height && (
                                <li
                                  class={clx(
                                    `mobile:w-[90%] md:w-[280px] md:max-h-[96px] rounded-[16px] px-[24px] py-[14px] flex items-center border border-[#3b5d5f] 
                                bg-[linear-gradient(161deg,_rgba(255,_255,_255,_0.10)_0%,_rgba(255,_255,_255,_0.05)_101.7%)] 
                                [box-shadow:0px_12px_56px_0px_rgba(6,_28,_61,_0.12)]`,
                                  )}
                                >
                                  <div class="mr-[20px]">
                                    <img
                                      src={src}
                                      width={width ? width + "px" : "100%"}
                                      height={height ? height + "px" : "auto"}
                                      alt={name ? name : "Ícone"}
                                      style={{
                                        minWidth: width ? width + "px" : "45px",
                                      }}
                                    />
                                  </div>
                                  {text && (
                                    <div>
                                      <h3 class="md:text-[14px] md:leading-[22.4px] font-montserrat font-normal">
                                        {text}
                                      </h3>
                                    </div>
                                  )}
                                </li>
                              )}
                            </>
                          );
                        })}
                    </ul>
                  </>
                );
              },
            )}
        </div>
      </div>
    </>
  );
}

export default IconText;
