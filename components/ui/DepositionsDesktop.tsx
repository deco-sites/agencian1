import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "$store/sdk/clx.ts";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

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
}

const elementDescription = IS_BROWSER &&
  document.querySelector(".n1-depositions__description");

function validateTransitionAnimation(
  element: HTMLCollection,
  allElementBrandContainer: HTMLCollection,
) {
  element && element.length > 0 &&
    Array.from(element).map((children, index) => {
      const childrenPosition = Number(children?.getBoundingClientRect().top);
      const childrenHeight = Number(children?.getBoundingClientRect().height);

      if (childrenPosition <= childrenHeight) {
        if (
          allElementBrandContainer &&
          allElementBrandContainer instanceof HTMLCollection
        ) {
          Array.from(allElementBrandContainer).map((e) => {
            e.classList.remove("is--active");
            e.classList.add("is--disabled");
          });
          allElementBrandContainer[index]?.classList.remove("is--disabled");
          allElementBrandContainer[index]?.classList.add("is--active");

          index === 1 &&
            allElementBrandContainer[index]?.classList.add("is--zindex-1");
          index === 2 &&
            allElementBrandContainer[index]?.classList.add("is--zindex-2");

          if (index === 1 || index === 2) {
            allElementBrandContainer[0]?.classList.add("is--opacity-7");
          } else {
            allElementBrandContainer[0]?.classList.remove("is--opacity-7");
          }
        }
      } else {
        if (allElementBrandContainer instanceof HTMLCollection) {
          allElementBrandContainer[index]?.classList.remove("is--active");
        }
        index === 1 &&
          allElementBrandContainer[index]?.classList.remove("is--zindex-1");
        index === 2 &&
          allElementBrandContainer[index]?.classList.remove("is--zindex-2");
        allElementBrandContainer[index]?.classList.add("is--disabled");
      }
    });
}

function queryElements(el: unknown) {
  if (el instanceof HTMLDivElement) {
    const element = el?.children;
    const elementBrandContainer = document.querySelector<HTMLElement>(
      ".n1-depositions__container",
    );
    const allElementBrandContainer = elementBrandContainer
      ?.getElementsByClassName("n1-depositions__image");

    if (allElementBrandContainer instanceof HTMLCollection) {
      validateTransitionAnimation(element, allElementBrandContainer);
    }
  }
}

function DepositionsDesktop({ depositionAndImage }: Props) {
  const window_ = window;

  useEffect(() => {
    window_.addEventListener("scroll", () => {
      if (elementDescription instanceof HTMLDivElement) {
        queryElements(elementDescription);
      }
    });
  });

  return (
    <>
      <div class={`grid grid-cols-2-auto mt-[65px]`}>
        <div
          class={clx(`
                        n1-depositions__container sticky max-h-[25%] top-[90px] order-1`)}
        >
          <div class={clx(`n1-depositions__eclipse`)}></div>

          {depositionAndImage && depositionAndImage?.length > 0 &&
            depositionAndImage.map((item, index) => {
              return (
                <>
                  <div
                    class={clx(`
                                        ${
                      index === 0
                        ? "contents -z-[0]"
                        : index === 1
                        ? "top-[100px] -z-[1]"
                        : index === 2
                        ? "top-[210px] -z-[2]"
                        : ""
                    }
                                        n1-depositions__image absolute`)}
                    data-index={index}
                  >
                    <Picture
                      class={clx(`
                                            ${
                        index === 2
                          ? "opacity-[.9]"
                          : index === 3
                          ? "opacity-[.3]"
                          : ""
                      }
                                            flex justify-center`)}
                    >
                      {item?.image?.desktop?.src &&
                        item?.image?.desktop?.width &&
                        item?.image?.desktop?.height &&
                        (
                          <Source
                            media="(min-width: 768px)"
                            src={item?.image?.desktop.src}
                            width={item?.image?.desktop.width}
                            height={item?.image?.desktop.height}
                          />
                        )}
                      {item?.image?.mobile?.src && item?.image?.mobile?.width &&
                        item?.image?.mobile?.height && (
                        <Source
                          media="(max-width: 767px)"
                          src={item?.image?.mobile.src}
                          width={item?.image?.mobile.width}
                          height={item?.image?.mobile.height}
                        />
                      )}
                      <img
                        src={item?.image?.desktop?.src}
                        width={item?.image?.desktop?.width}
                        height={item?.image?.desktop?.height}
                        loading={"lazy"}
                        alt={item?.alt ?? item?.alt}
                        // class={`n1-conclusion__bg-image tablet:max-w-[90%] sm:h-auto`}
                      />
                    </Picture>
                  </div>
                </>
              );
            })}
        </div>

        <div
          class={clx(`n1-depositions__description`)}
          id="n1-depositions__description"
        >
          {depositionAndImage && depositionAndImage?.length > 0 &&
            depositionAndImage.map((item, index) => {
              return (
                <>
                  <div
                    class={clx(`
                                        ${
                      index === 1
                        ? "mt-[200px]"
                        : index === 2
                        ? "mt-[200px]"
                        : ""
                    }
                                        grid grid-cols-2-auto`)}
                    data-index={index}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="68"
                      viewBox="0 0 100 68"
                      fill="none"
                    >
                      <g opacity="0.2" clip-path="url(#clip0_18463_38026)">
                        <path
                          d="M54.6023 0.535645H100V45.745H68.9726L63.3944 64.3393C63.1136 65.2854 62.5318 66.0859 61.7738 66.6481C61.0187 67.2103 60.0816 67.5356 59.0886 67.5356C56.6098 67.5356 54.6009 65.5351 54.6009 63.0665V0.535645H54.6023Z"
                          fill="white"
                        />
                        <path
                          d="M-0.000255585 0.535645H45.396V45.745H14.3686L8.79042 64.3393C8.50957 65.2854 7.92783 66.0859 7.16984 66.6481C6.41472 67.2103 5.47762 67.5356 4.48464 67.5356C2.00577 67.5356 -0.00311279 65.5351 -0.00311279 63.0665V0.535645H-0.000255585Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_18463_38026">
                          <rect
                            width="100"
                            height="67"
                            fill="white"
                            transform="matrix(-1 0 0 1 100 0.535645)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <div
                      class={clx(`ml-[30px]`)}
                    >
                      {item?.textSticky?.description && (
                        <div
                          class={clx(`
                                                    [&_*]:text-28 [&_*]:font-noto-sans mb-[30px] max-w-[75%]`)}
                          dangerouslySetInnerHTML={{
                            __html: item?.textSticky?.description,
                          }}
                        >
                        </div>
                      )}

                      <div class="flex flex-col">
                        {item?.textSticky?.author && (
                          <small
                            class={clx(`
                                                        text-[18px] leading-[23.4px] font-noto-sans font-black mb-[6px]`)}
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
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default DepositionsDesktop;
