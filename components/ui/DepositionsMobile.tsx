import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { clx } from "$store/sdk/clx.ts";
import Icon from "deco-sites/agencian1/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";

interface ImageGeneric {
  src?: ImageWidget;
  width?: number;
  height?: number;
}

interface Image {
  desktop?: ImageGeneric;
  mobile?: ImageGeneric;
}

interface DepositionAndImage {
  alt?: string;
  textSticky: Deposition;
  image?: Image;
}

interface Deposition {
  description?: string;
  author?: string;
  jobPosition?: string;
}

interface Props {
  depositionAndImage?: DepositionAndImage[];
  id: string;
}

function Buttons() {
  return (
    <>
      <div
        class={clx(`
                mobile:flex absolute w-full mobile:justify-center mobile:items-end justify-between h-full mobile:top-[50px] 
                top-[0] items-center pb-[10px] -left-[10px]`)}
      >
        <div class="flex items-center justify-start z-10 col-start-1 row-start-2 mobile:mr-[30px] -translate-x-[50px]">
          <Slider.PrevButton class="btn btn-circle bg-[#ffffff] w-[40px] !h-[40px]">
            <Icon
              size={18}
              id="Banner-arrow-left"
              strokeWidth={3}
            />
          </Slider.PrevButton>
        </div>
        <div class="flex items-center justify-end z-10 col-start-3 row-start-2 mobile:-ml-[70px] translate-x-[50px]">
          <Slider.NextButton class="btn btn-circle bg-[#ffffff] w-[40px] !h-[40px]">
            <Icon
              size={18}
              id="Banner-arrow-right"
              strokeWidth={3}
            />
          </Slider.NextButton>
        </div>
      </div>
    </>
  );
}

function DepositionsMobile({ depositionAndImage, id }: Props) {
  return (
    <>
      <Slider class="carousel carousel-center gap-x-[22px] flex px-[20px] mt-[32px] relative z-10">
        {depositionAndImage && depositionAndImage?.length > 0 &&
          depositionAndImage.map((item, index) => {
            return (
              <>
                <Slider.Item
                  index={index}
                  class="carousel-item w-full"
                >
                  <div
                    class={clx(`grid grid-cols-2-auto`)}
                    data-index={index}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="26"
                      viewBox="0 0 36 26"
                      fill="none"
                    >
                      <g opacity="0.2" clip-path="url(#clip0_13578_18341)">
                        <path
                          d="M19.6569 0.548828H36V17.418H24.8301L22.822 24.3562C22.7209 24.7092 22.5115 25.0079 22.2386 25.2177C21.9668 25.4274 21.6294 25.5488 21.2719 25.5488C20.3795 25.5488 19.6563 24.8024 19.6563 23.8812V0.548828H19.6569Z"
                          fill="white"
                        />
                        <path
                          d="M-3.8147e-05 0.548828H16.3426V17.418H5.17274L3.1646 24.3562C3.0635 24.7092 2.85407 25.0079 2.58119 25.2177C2.30935 25.4274 1.97199 25.5488 1.61452 25.5488C0.72213 25.5488 -0.00106812 24.8024 -0.00106812 23.8812V0.548828H-3.8147e-05Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_13578_18341">
                          <rect
                            width="36"
                            height="25"
                            fill="white"
                            transform="matrix(-1 0 0 1 36 0.548828)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <div
                      class={clx(`ml-[12px]`)}
                    >
                      {item?.textSticky?.description && (
                        <div
                          class={clx(`
                                                    [&_*]:text-16 [&_*]:font-noto-sans mb-[30px] max-w-[85%]
                                                    [@media(max-width:390px)]:max-w-[95%]`)}
                          dangerouslySetInnerHTML={{
                            __html: item?.textSticky?.description,
                          }}
                        >
                        </div>
                      )}

                      <div
                        class={`flex items-center`}
                      >
                        {item?.image &&
                          item.image?.mobile?.src &&
                          item?.image?.mobile?.width &&
                          item?.image?.mobile?.height && (
                          <img
                            src={item.image.mobile.src}
                            width={item.image.mobile.width}
                            height={item.image.mobile.height}
                            loading={"lazy"}
                            alt={item?.alt ?? item?.alt}
                            // class={`n1-conclusion__bg-image tablet:max-w-[90%] sm:h-auto`}
                          />
                        )}
                        <div class={clx(`flex flex-col ml-[26px]`)}>
                          {item?.textSticky?.author && (
                            <small
                              class={clx(`
                                                            text-[18px] leading-[23.4px] font-noto-sans font-black`)}
                            >
                              {item?.textSticky?.author}
                            </small>
                          )}

                          {item?.textSticky?.jobPosition && (
                            <small
                              class={clx(`
                                                            text-[18px] leading-[28.8px] font-noto-sans opacity-[0.45]`)}
                            >
                              {item?.textSticky?.jobPosition}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider.Item>
              </>
            );
          })}
      </Slider>

      <Buttons />

      <SliderJS rootId={id} />
    </>
  );
}

export default DepositionsMobile;
