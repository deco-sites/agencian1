import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import LinkTelephoneWithOptionArrow from "../ui/LinkTelephoneWithOptionArrow.tsx";
import { HTMLWidget as HTML } from "apps/admin/widgets.ts";
import { FnContext, SectionProps } from "deco/mod.ts";
import { getCookies, setCookie } from "std/http/mod.ts";

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

function Header(props: SectionProps<ReturnType<typeof loader>>) {
  const {
    alerts,
    navItems,
    logo,
    logoMobile,
    logoPosition = "center",
    whatsapp,
    btnTextMenu,
    buttons,
    selectedLanguage,
  } = props;
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items, whatsapp }}
          platform={platform}
          logoMobile={logoMobile}
          selectedLanguage={selectedLanguage}
        >
          <div
            class="fixed w-full z-50 n1-header__desktop"
            style={{ height: headerHeight }}
          >
            <div
              class={"grid grid-cols-2-auto md:n1-container md:px-[120px] items-center portatil:max-w-[90%] portatil:px-0"}
            >
              {alerts && alerts.length > 0 && <Alert alerts={alerts} />}
              <Navbar
                items={items}
                logo={logo}
                logoPosition={logoPosition}
                buttons={buttons}
                btnTextMenu={btnTextMenu}
                selectedLanguage={selectedLanguage}
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

export const loader = (props: Props, req: Request, ctx: FnContext) => {
  const cookies = getCookies(req.headers);
  const selectedLanguage = cookies["N1_SelectedLanguage"] || "pt-br";

  if (!cookies["N1_SelectedLanguage"]) {
    setCookie(ctx.response.headers, {
      name: "N1_SelectedLanguage",
      value: "pt-br",
      path: "/",
    });
  }

  return {
    ...props,
    selectedLanguage,
  };
};

export default Header;
