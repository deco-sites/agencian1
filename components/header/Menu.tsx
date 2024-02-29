import Icon from "$store/components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import LinkButtonWithOptionArrow from "../ui/LinkButtonWithOptionArrow.tsx";
import Legend from '$store/components/header/Legend.tsx';
import { clx } from "$store/sdk/clx.ts";

export interface Props {
  items: SiteNavigationElement[];
  whatsapp?: string;
}

interface PropsMenuItem{
  item: SiteNavigationElement;
}

function MenuItem({ item }: PropsMenuItem) {

  const existsChildren = item && item.children && item.children.length > 0 ? true : false

  return (
    <>
      <div class={`${existsChildren ? 'collapse collapse-arrow' : '' } n1-menu-mobile`}>
        {existsChildren && <input class="n1-menu-mobile__input" type="checkbox" />}
        
        <div class={clx(`${existsChildren ? 'is-children' : '' } collapse-title mobile:font-black n1-menu-mobile__title flex items-center justify-between`)}>
            {item.name}

            {item && item.children && item.children.length === 0 && <Icon id="ArrowUpMenuMobile" size={22} strokeWidth={2} />}
        </div>
        <div class="collapse-content n1-menu-mobile__content">
          <ul>
            {/* <li>
              <a class="underline text-sm" href={item.url}>Ver todos</a>
            </li> */}
            {existsChildren && item && item.children && item.children.map((node) => {
              return(
                <li>
                  <MenuItem item={node} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

function Menu({ items, whatsapp }: Props) {
  const itemLegend = 'legenda';
  return (
    <div class="flex flex-col h-full border-none mobile:overflow-scroll">
      <ul class="flex-grow flex flex-col divide-y divide-neutral-300 ">
        {items.map((item) => {
          return(
            <li class="pt-[16px]">
              {/* <a href={`${item && item.children && item.children.length > 0 ?  '' : item?.url }`}> */}
              <a href="#">
                <MenuItem item={item} />
              </a>
            </li>
          )
        })}
        <Legend nameItemScape={itemLegend} mobile={true} />
      </ul>
      <div class="w-[90%] mx-auto">
          {whatsapp && (
            <LinkButtonWithOptionArrow activeArrow={false} width={'full'} telephone={whatsapp} />
          )}
      </div>
    </div>
  );
}

export default Menu;
