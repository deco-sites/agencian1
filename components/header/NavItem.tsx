import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";
import ItemWhatsapp from '$store/components/header/ItemWhatsapp.tsx';

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];
  const nameItemScape = item?.name?.replaceAll(/\s/g, '-').toLowerCase();
  const itemWhatsapp = nameItemScape === 'whatsapp' ? nameItemScape : null;
  const itemLegend = nameItemScape === 'legenda' ? nameItemScape : null;

  // console.log('Navitem - item: ', item?.name?.replaceAll(/\s/g, '-').toLowerCase())
  // console.log('----> ', itemWhatsapp)
  
  return (
    <>
      {itemWhatsapp ? 
        (  
          <ItemWhatsapp nameItemScape={nameItemScape} url={url} name={name} />
        )
        : itemLegend ?
        (  
          // <ItemLegend nameItemScape={nameItemScape} url={url} name={name} />
          <>
            <li class={`group flex items-center text-16 uppercase is-${nameItemScape}`}>
            <img class="w-[36px] h-[24px]" src='/image/header-sub-menu-pt-br.png' />
              <a href={url} class="overflow-y-hidden h-5">
                <span class="-translate-y-5 group-hover:translate-y-0 transition-all text-xs font-thin flex moveFromTop duration-500">
                  {/* {name} */}
                </span>
                <span class="-translate-y-5 group-hover:translate-y-5 transition-all text-xs font-thin flex moveFromTop duration-500">
                  {/* {name} */}
                </span>
              </a>

              {children && children.length > 0 &&
                (
                  <div
                    class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen"
                    style={{ top: "0px", left: "0px", marginTop: headerHeight }}
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
                    <ul class="flex items-start justify-center gap-6">
                      {children.map((node) => (
                        <li class="p-6">
                          <a class="hover:underline" href={node.url}>
                            <span>{node.name}</span>
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
                      ))}
                    </ul>
                  </div>
                )
              } 
            </li>           
          </>
        )
        :
        (
          <li class={`group flex justify-between text-16 uppercase is-${nameItemScape} items-center pt-3`}>
            <a href={url} class="overflow-y-hidden h-5">
              <span class="-translate-y-5 group-hover:translate-y-0 transition-all text-xs flex moveFromTop duration-500 font-black">
                {name}
              </span>
              <span class="-translate-y-5 group-hover:translate-y-5 transition-all text-xs flex moveFromTop duration-500 font-black">
                {name}
              </span>
            </a>

            {children && children.length > 0 &&
              (
                <div
                  class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen"
                  style={{ top: "0px", left: "0px", marginTop: headerHeight }}
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
                  <ul class="flex items-start justify-center gap-6">
                    {children.map((node) => (
                      <li class="p-6">
                        <a class="hover:underline" href={node.url}>
                          <span>{node.name}</span>
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
                    ))}
                  </ul>
                </div>
              )}
          </li>
        )
      }
    </>
  );
}

export default NavItem;
