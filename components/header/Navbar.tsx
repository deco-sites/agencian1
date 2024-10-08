import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton } from "$store/islands/Header/Buttons.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import { Buttons } from "$store/components/header/Header.tsx";
import Legend from "$store/components/header/Legend.tsx";
import { headerHeight } from "./constants.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface ImageGeneric {
  /**@title Imagem */
  src?: ImageWidget;
  /**@title Largura */
  width?: number;
  /**@title Altura */
  height?: number;
}

interface Props {
  /**@title Items */
  items: SiteNavigationElement[];
  /**
   * @title Logo
   * @description (Desktop)
   */
  desktop?: ImageGeneric;
  /**
   * @title Logo
   * @description (Mobile)
   */
  mobile?: ImageGeneric;
  /**@title Nome da imagem */
  alt?: string;
  /**@title Botões */
  buttons?: Buttons;
  /**@title Posição do logo */
  logoPosition?: "left" | "center";
  nameItemScape?: string;
  /**@title Texto do Botão */
  btnTextMenu?: string;
  /**@title Link */
  btnUrlMenu?: string;
  selectedLanguage?: string;
}

function Navbar({
  items,
  desktop,
  mobile,
  buttons,
  alt,
  logoPosition = "left",
  btnTextMenu,
  btnUrlMenu,
  selectedLanguage,
}: Props) {
  const itemLegend = "legenda";

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden grid grid-cols-3 justify-between items-center w-full pl-[20px] mobile:flex"
      >
        <MenuButton />
        {desktop?.src && mobile?.src && (
          <a
            href="/"
            class="flex-grow inline-flex items-center justify-center mobile:ml-[22px]"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Picture>
              {mobile.src && mobile?.width && mobile?.height && (
                <Source
                  media="(max-width: 767px)"
                  src={mobile.src}
                  width={mobile.width}
                  height={mobile.height}
                />
              )}
              {desktop.src && desktop?.width && desktop?.height &&
                (
                  <Source
                    media="(min-width: 768px)"
                    src={desktop.src}
                    width={desktop.width}
                    height={desktop.height}
                  />
                )}

              <img
                src={desktop.src}
                loading={"lazy"}
                width={desktop?.width}
                height={desktop?.height}
                alt={alt}
              />
            </Picture>
          </a>
        )}
      </div>

      {/* Desktop Version */}
      <div
        class={`hidden lg:grid gap-x-[70px] portatil:gap-x-[20px] lg:grid-cols-2-auto items-center w-full`}
        style={{ height: headerHeight ? headerHeight : "" }}
      >
        <nav>
          <ul
            class={`flex py-[18px] gap-x-[32px] col-span-1 portatil:gap-x-[10px] ${
              logoPosition === "left" ? "justify-between" : "justify-start"
            }`}
          >
            {items.map((item) => {
              return (
                <NavItem
                  item={item}
                  btnTextMenu={btnTextMenu}
                  btnUrlMenu={btnUrlMenu}
                />
              );
            })}

            {/* menu legenda */}
            <Legend
              nameItemScape={itemLegend}
              selectedLanguage={selectedLanguage}
            />
          </ul>
        </nav>
        <div
          class={`flex ${
            logoPosition === "left"
              ? "justify-start -order-1"
              : "justify-center"
          }`}
        >
          {desktop?.src && mobile?.src && (
            <a
              href="/"
              class="flex-grow inline-flex items-center justify-center mobile:ml-[22px]"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <Picture>
                {mobile.src && mobile?.width && mobile?.height && (
                  <Source
                    media="(max-width: 767px)"
                    src={mobile.src}
                    width={mobile.width}
                    height={mobile.height}
                  />
                )}
                {desktop.src && desktop?.width && desktop?.height &&
                  (
                    <Source
                      media="(min-width: 768px)"
                      src={desktop.src}
                      width={desktop.width}
                      height={desktop.height}
                    />
                  )}

                <img
                  src={desktop.src}
                  loading={"lazy"}
                  width={desktop?.width}
                  height={desktop?.height}
                  alt={alt}
                />
              </Picture>
            </a>
          )}
        </div>
        <div class="hidden flex-none items-center justify-end gap-6 col-span-1">
          {!buttons?.hideAccountButton && (
            <a
              class="flex items-center text-xs font-thin"
              href="/account"
              aria-label="Account"
            >
              <div class="flex btn btn-circle btn-sm btn-ghost gap-1">
                <Icon id="User" size={20} strokeWidth={0.4} />
              </div>
              ACCOUNT
            </a>
          )}
          {!buttons?.hideWishlistButton && (
            <a
              class="flex items-center text-xs font-thin"
              href="/wishlist"
              aria-label="Wishlist"
            >
              <button
                class="flex btn btn-circle btn-sm btn-ghost gap-1"
                aria-label="Wishlist"
              >
                <Icon id="Heart" size={24} strokeWidth={0.4} />
              </button>
              WISHLIST
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
