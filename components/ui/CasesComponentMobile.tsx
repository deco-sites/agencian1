import { clx } from "$store/sdk/clx.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";

interface TagProps {
  imageTag?: ImageWidget;
  nameTag?: string;
}

interface PropsImage {
  imageLogo?: ImageWidget;
  alt?: string;
  href?: string;
  widthLogo?: number;
  heightLogo?: number;
  imageBackground?: ImageWidget;
  widthImageBackground?: number;
  heightImageBackground?: number;
  infoPorcentagem?: string;
  infoText?: string;
  icon?: ImageWidget;

  /********CONFIGURAÇÃO DO HOVER******* */

  imageLogoHover?: ImageWidget;
  imageLogoMobileHover?: ImageWidget;
  widthLogoHover?: number;
  heightLogoHover?: number;
  imageBackgroundHover?: ImageWidget;
  widthImageBackgroundHover?: number;
  heightImageBackgroundHover?: number;
  iconHover?: ImageWidget;
  tagProps?: TagProps[];
}

interface Props {
  settingsImage?: PropsImage[];
}

function CasesComponentMobile({ settingsImage }: Props) {
  const id = useId();

  return (
    <>
      <div
        class="n1-cases-card__mobile tablet:mt-[64px] tablet:max-w-full tablet:w-full tablet:grid tablet:col-[1_/_2_span]"
        id={id}
      >
        <Slider class="n1-cases-card__carousel carousel carousel-center mobile:h-[380px] w-full flex py-[0] tablet:w-full gap-x-[11px] tablet:gap-x-[18px]">
          {settingsImage && settingsImage.length > 1 && settingsImage.map(({
            alt,
            href,
            infoPorcentagem,
            infoText,
            imageLogoHover,
            widthLogoHover,
            imageBackgroundHover,
            iconHover,
            tagProps,
          }, index) => {
            return (
              <>
                <Slider.Item
                  index={index}
                  class="n1-cases-card__item carousel-item  mobile:w-[95%] tablet:w-[31.666%] w-full"
                >
                  <a
                    href={`${href ? href : "javascript:void(0)"}`}
                    class={`relative n1-cases-card ${
                      href ? "cursor-pointer" : "cursor-grab"
                    } h-[342px] w-full [transition:all_.375s_linear]`}
                    style={{ pointerEvents: `${href ? "all" : "grab"}` }}
                  >
                    <div
                      class={clx(
                        `n1-cases-card__item--hover w-full absolute top-0 left-0 duration-300 
                                            [transition:all_.2s_linear] rounded-[20px] is-active`,
                      )}
                      style={{
                        backgroundImage: `${
                          imageBackgroundHover &&
                          "url(" + imageBackgroundHover + ")"
                        }`,
                        height: "342px",
                        backgroundSize: "cover",
                      }}
                    >
                      <div class="flex flex-col justify-between h-full pt-[38px] pb-[24px] px-[18px]">
                        {imageLogoHover && (
                          <img
                            src={`${imageLogoHover}`}
                            class="w-full h-auto n1-cases-card__image duration-200"
                            alt={alt ? alt : "Logo"}
                            style={{
                              maxWidth: `${
                                widthLogoHover ? widthLogoHover + "px" : "346px"
                              }`,
                            }}
                          />
                        )}

                        <div class="grid grid-cols-[repeat(2,_auto)] justify-between items-end">
                          <div class="n1-cases__info">
                            <div class="flex flex-col">
                              {infoPorcentagem && (
                                <span class="font-archimoto-medium text-60 text-[#ffffff] font-black">
                                  {infoPorcentagem}
                                </span>
                              )}
                              {infoText && (
                                <span class="font-archimoto-medium text-25 text-[#ffffff] font-black uppercase">
                                  {infoText}
                                </span>
                              )}
                            </div>

                            <div
                              class={clx(
                                `n1-cases-card__tags grid grid-cols-[repeat(3,1fr)] tablet:grid-cols-[repeat(2,1fr)] 
                                                            grid-rows-[repeat(2,_1fr)] justify-between gap-x-[4px] gap-y-[3px] mt-[30px]`,
                              )}
                            >
                              {tagProps && tagProps.length > 1 &&
                                tagProps.map(({ imageTag, nameTag }) => {
                                  return (
                                    <>
                                      <div class="flex items-center justify-left w-[70px]">
                                        {imageTag && (
                                          <img
                                            src={`${imageTag}`}
                                            alt={`${nameTag ? nameTag : "Tag"}`}
                                          />
                                        )}
                                      </div>
                                    </>
                                  );
                                })}
                            </div>
                          </div>

                          {iconHover && (
                            <div class="flex justify-end w-[42px] n1-cases__icon-mobile">
                              <img
                                src={`${iconHover}`}
                                alt={alt ? alt : "Icon"}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </a>
                </Slider.Item>
              </>
            );
          })}
        </Slider>
      </div>
      <SliderJS rootId={id} />
    </>
  );
}

export default CasesComponentMobile;
