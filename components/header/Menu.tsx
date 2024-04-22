import Icon from "$store/components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import LinkTelephoneWithOptionArrow from "../ui/LinkTelephoneWithOptionArrow.tsx";
import Legend from "$store/components/header/Legend.tsx";
import { clx } from "$store/sdk/clx.ts";

export interface Props {
  items: SiteNavigationElement[];
  whatsapp?: string;
  selectedLanguage?: string;
}

interface PropsMenuItem {
  item: SiteNavigationElement;
}

function MenuItem({ item }: PropsMenuItem) {
  const existsChildren = item && item.children && item.children.length > 0
    ? true
    : false;

  return (
    <>
      <div
        class={clx(
          `${existsChildren ? "collapse collapse-arrow" : ""} n1-menu-mobile`,
        )}
      >
        {existsChildren && (
          <input class="n1-menu-mobile__input" type="checkbox" />
        )}

        <div
          class={clx(
            `${
              existsChildren ? "is-children" : ""
            } collapse-title text-[#646363] mobile:font-black n1-menu-mobile__title flex items-center justify-between`,
          )}
        >
          {item.name}

          {item && item.children && item.children.length === 0 && (
            <Icon id="ArrowUpMenuMobile" size={22} strokeWidth={2} />
          )}
        </div>
        <div class="collapse-content n1-menu-mobile__content">
          <ul>
            {
              /* <li>
              <a class="underline text-sm" href={item.url}>Ver todos</a>
            </li> */
            }
            {existsChildren && item && item.children &&
              item.children.map((node) => {
                return (
                  <li class="mb-[10px]">
                    <a
                      class="n1-sublink block px-[5px] py-[5px]"
                      href={`${node?.url ? node?.url : "javascript:void(0)"}`}
                      style={{ pointerEvents: `${node?.url ? "all" : "none"}` }}
                    >
                      <MenuItem item={node} />
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

function Menu({ items, whatsapp, selectedLanguage }: Props) {
  const itemLegend = "legenda";
  return (
    <div class="flex flex-col h-full border-none mobile:overflow-scroll">
      <ul class="flex-grow flex flex-col divide-y divide-neutral-300 ">
        {items.map((item) => {
          return (
            <li
              class={`pt-[16px] ${
                item.name === "Blog" ||
                  item.name === "Ferramentas" ||
                  item.name === "ferramentas" ||
                  item.name === "Tools" ||
                  item.name === "tools"
                  ? "hidden"
                  : ""
              }`}
            >
              <a
                href={`${item?.url ? item?.url : "javascript:void(0)"}`}
                style={{ pointerEvents: `${item?.url ? "all" : "none"}` }}
              >
                <MenuItem item={item} />
              </a>
            </li>
          );
        })}
        {/* menu legenda */}
        <Legend
          nameItemScape={itemLegend}
          mobile={true}
          selectedLanguage={selectedLanguage}
        />
      </ul>
      <div class="n1-menu-mobile__whatsapp w-[90%] mx-auto">
        {whatsapp && (
          <LinkTelephoneWithOptionArrow
            activeArrow={false}
            width={"full"}
            telephone={whatsapp}
          />
        )}
      </div>
    </div>
  );
}

export default Menu;
