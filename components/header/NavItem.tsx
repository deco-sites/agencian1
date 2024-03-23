import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";
import LinkButtonSubMenu from "$store/components/header/LinkButtonSubMenu.tsx";
import { HTMLWidget as HTML } from "apps/admin/widgets.ts";
import { clx } from "$store/sdk/clx.ts";

export interface PropsChildren extends SiteNavigationElement {
  /** @title Título Submenu*/
  titleSubMenu?: HTML;

  /** @title Descrição Submenu - (Submenu de serviços) */
  descriptionSubMenu?: HTML;

  /** @title Texto para Link do botão */
  /** @description (ex: conheça mais dos nossos serviços ) */
  btnUrlMenu?: string;

  /** @title Ativar título,descrição? */
  activePropsText?: boolean;
  /** @title Ativar texto do botão?? */
  activePropsButton?: boolean;
}

interface Props {
  /** @maxItems 1 */
  item: PropsChildren;
  btnTextMenu?: string;
  btnUrlMenu?: string;
}

function NavItem({ item, btnTextMenu, btnUrlMenu }: Props) {
  const {
    url,
    name,
    children,
    titleSubMenu,
    descriptionSubMenu,
    activePropsText,
    activePropsButton,
  } = item;
  const image = item?.image?.[0];
  const nameItemScape = item?.name?.replaceAll(/\s/g, "-").toLowerCase();
  const headerHeightNumber = headerHeight &&
    Number(headerHeight?.replace("px", ""));
  const lasfHeaderHeight = headerHeightNumber > 2
    ? headerHeightNumber / 2
    : headerHeightNumber;

  return (
    <>
      <li
        class={clx(`n1-header__navlink
        ${
          children && children.length > 0
            ? "n1-header__navlink--active relative pr-[25px] pl-[10px] cursor-pointer hover:before:rotate-[-135deg] hover:after:rotate-[135deg] hover:before:border-secondary hover:after:border-secondary hover:text-[#3CCBDA]"
            : ""
        } 
          group flex justify-between text-16 font-archimoto-medium uppercase whitespace-nowrap is-${nameItemScape} items-center`)}
      >
        <a
          href={`${url ? url : "javascript:void(0)"}`}
          style={{ pointerEvents: `${url ? "all" : "none"}` }}
          class="overflow-y-hidden h-5 mr-[10px]"
        >
          <span class="-translate-y-5 group-hover:translate-y-0 leading-5 transition-all text-xs flex moveFromTop duration-500 font-black">
            {name}
          </span>
          <span class="-translate-y-5 group-hover:translate-y-5 leading-5 transition-all text-xs flex moveFromTop duration-500 font-black">
            {name}
          </span>
        </a>

        {children && children.length > 0 &&
          (
            <div
              class={clx(
                `fixed hidden hover:flex group-hover:flex z-50 items-start justify-center 
                gap-6 w-screen top-0 text-primary max-w-[90%] left-[5%] rounded-b-[40px]`,
              )}
              style={{
                top: "-5px",
                marginTop: lasfHeaderHeight + "px",
                height: lasfHeaderHeight + "px",
              }}
            >
              <div
                class={clx(
                  `mt-[55px] bg-[#fff] !w-auto rounded-b-[40px] pt-[20px] pb-[40px] px-[40px] 
                ${children.length < 3 ? "flex max-w-[835px]" : ""}`,
                )}
              >
                {image?.url && (
                  <Image
                    class="p-6"
                    src={image.url}
                    alt={image.alternateName}
                    width={300}
                    height={332}
                    loading="lazy"
                  />
                )}

                <div
                  class={`flex flex-col justify-center max-w-[35%] mr-[50px]`}
                >
                  {activePropsText && titleSubMenu && (
                    <div
                      class="text-32 n1-header__navlink-children-title mb-[14px]"
                      dangerouslySetInnerHTML={{ __html: titleSubMenu || "" }}
                    >
                    </div>
                  )}

                  {activePropsText && descriptionSubMenu && (
                    <div
                      class="font-noto-sans text-16 n1-header__navlink-children-description normal-case"
                      dangerouslySetInnerHTML={{
                        __html: descriptionSubMenu || "",
                      }}
                    >
                    </div>
                  )}
                </div>

                <ul
                  class={clx(
                    `${
                      children.length >= 5 ? "grid grid-cols-5-auto" : "flex"
                    } ${item?.name === "Ferramentas" ? "gap-x-[50px]" : ""} 
                  items-start justify-between gap-x-[32px]`,
                  )}
                >
                  {children.map((node) => {
                    return (
                      <li class="py-6 n1-header__navlink-children">
                        <a
                          href={`${
                            node?.url ? node?.url : "javascript:void(0)"
                          }`}
                          style={{
                            pointerEvents: `${node?.url ? "all" : "none"}`,
                          }}
                          class="hover:underline overflow-hidden block rounded-[8px]"
                        >
                          {node.image?.map((i) => {
                            if (!i) return null;
                            return (
                              <img
                                class="n1-header__navlink-children--image"
                                src={i?.url}
                                alt={node?.name}
                              />
                            );
                          })}
                        </a>

                        <ul class="flex flex-col gap-1 mt-4">
                          {node.children?.map((leaf) => (
                            <li>
                              <a class="hover:underline" href={leaf.url}>
                                <span class="text-xs">{leaf.name}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  })}
                </ul>

                {activePropsButton && btnTextMenu && (
                  <LinkButtonSubMenu
                    btnTextMenu={btnTextMenu}
                    btnUrlMenu={btnUrlMenu}
                  />
                )}
              </div>
            </div>
          )}
      </li>
    </>
  );
}

export default NavItem;
