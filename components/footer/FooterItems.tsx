import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import CertificationImage from "$store/components/footer/CertificationImage.tsx";
import { clx } from "$store/sdk/clx.ts";

/**@titleBy label */
export type Item = {
  /**@title Nome */
  label: string;
  /**@title Link */
  /**@description (ex: /nossos-servicos/suporte) */
  href?: string;
  /**@title Ocultar item? */
  disabledItem?: boolean;
};

/**@titleBy label */
export type Section = {
  /**@title Nome */
  label: string;
  /**@title Items */
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <nav>
            <ul
              class={clx(
                `mobile:[&>*:not(:first-of-type)]:mt-[40px] mobile:[&>*:not(:first-of-type)]:mb-[40px] 
                [&>*:not(:first-of-type)]:mb-[22px] md:gap-x-[50px] md:grid md:grid-cols-3-200
                portatil:[&>*:last-of-type]:col-end-3 portatil:[&>*:last-of-type]:mt-[20px] portatil:grid-cols-2-200 
                ${justify && "lg:justify-between"}`,
              )}
            >
              {sections.map((section) => {
                return (
                  <li>
                    <div class="flex flex-col gap-2">
                      <span class="mobile:text-18 md:text-24 font-archimoto-medium uppercase text-base-150  mb-[10px] font-black">
                        {section.label}
                      </span>
                      <ul
                        class={clx(
                          `flex flex-col ${
                            section.label === "Certificações"
                              ? "gap-y-[10px]"
                              : "gap-y-[16px] md:gap-y-[22px]"
                          } flex-wrap text-sm`,
                        )}
                      >
                        {section.items?.map((item) => {
                          if (!item?.disabledItem) {
                            return (
                              <>
                                {item.label?.split("-")[0] === "vtex" ||
                                    item.label?.split("-")[0] === "deco"
                                  ? (
                                    <CertificationImage
                                      linkname={`/image/footer-img-${item.label}.png`}
                                    />
                                  )
                                  : (
                                    <li>
                                      <a
                                        href={`${
                                          item?.href && item.href !== "#"
                                            ? item?.href
                                            : "javascript:void(0)"
                                        }`}
                                        style={{
                                          pointerEvents: `${
                                            item?.href && item?.href !== "#"
                                              ? "all"
                                              : "none"
                                          }`,
                                        }}
                                        class={clx(
                                          `text-[14px] leading-[21.6px] block py-1 link link-hover md:text-16 font-noto-sans font-normal text-base-150`,
                                        )}
                                      >
                                        {item.label}
                                      </a>
                                    </li>
                                  )}
                              </>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
            {/* Mobile view */}
            <ul class="hidden gap-4">
              {sections.map((section) => (
                <li>
                  <div class="collapse collapse-arrow ">
                    <input type="checkbox" class="min-h-[0]" />
                    <label
                      htmlFor={section.label}
                      class="collapse-title min-h-[0] !p-0 flex gap-2"
                    >
                      <span>{section.label}</span>
                    </label>
                    <div class="collapse-content">
                      <ul
                        class={`flex flex-col gap-1 pl-5 pt-2`}
                      >
                        {section.items?.map((item) => (
                          <li>
                            <a
                              href={`${
                                item?.href && item.href !== "#"
                                  ? item?.href
                                  : "javascript:void(0)"
                              }`}
                              style={{
                                pointerEvents: `${
                                  item?.href && item?.href !== "#"
                                    ? "all"
                                    : "none"
                                }`,
                              }}
                              class="block py-1 link link-hover"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

        </>
      )}
    </>
  );
}
