import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import LinkTelephoneWithOptionArrow from "../ui/LinkTelephoneWithOptionArrow.tsx";
import { HTMLWidget as HTML } from "apps/admin/widgets.ts";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface LogoMobile {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface Buttons {
  hideSearchButton?: boolean;
  hideAccountButton?: boolean;
  hideWishlistButton?: boolean;
  hideCartButton?: boolean;
}

export interface PropsChildren extends SiteNavigationElement {
  /** @title Título Submenu*/
  titleSubMenu?: HTML;

  /** @title Descrição Submenu */
  descriptionSubMenu?: HTML;

  /** @title Texto para do botão */
  /** @description (ex: conheça mais dos nossos serviços ) */
  btnTextMenu?: string;

  /** @title Link do botão */
  /** @description (ex: https://agencian1.com.br/ ) */
  btnUrlMenu?: string;

  /** @title Ativar título descrição? */
  activePropsText?: boolean;
  /** @title Ativar texto do botão?? */
  activePropsButton?: boolean;
}

export interface Props {
  alerts?: string[];

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Itens de navegação
   * @description (máximo de 6 itens)
   * @maxItems 6
   */
  navItems?: PropsChildren[] | null;

  /** @title Logo */
  logo?: Logo;

  /** @title Logo Mobile */
  logoMobile?: LogoMobile;

  logoPosition?: "left" | "center";

  /** @title WhatsApp */
  /** @description (ex: 99-99999-9999) */
  whatsapp?: string;

  /** @title Texto do botão (texto) */
  /** @description (ex: conheça nosso site ) */
  btnTextMenu?: string;

  buttons?: Buttons;
}

function Header({
  alerts,
  searchbar,
  navItems,
  logo,
  logoMobile,
  logoPosition = "center",
  whatsapp,
  btnTextMenu,
  buttons,
}: Props) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items, whatsapp }}
          searchbar={searchbar}
          platform={platform}
          logoMobile={logoMobile}
        >
          <div class="fixed w-full z-50 n1-header__desktop">
            <div
              class={"grid grid-cols-2-auto md:n1-container md:px-[120px] items-center portatil:max-w-[90%] portatil:px-0"}
            >
              {alerts && alerts.length > 0 && <Alert alerts={alerts} />}
              <Navbar
                items={items}
                searchbar={searchbar && { ...searchbar, platform }}
                logo={logo}
                logoPosition={logoPosition}
                buttons={buttons}
                btnTextMenu={btnTextMenu}
              />
              {whatsapp && (
                <div class="mobile:flex mobile:justify-center">
                  <LinkTelephoneWithOptionArrow
                    fontSize="14"
                    activeArrow={true}
                    telephone={whatsapp}
                  />
                </div>
              )}
            </div>
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
