import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import LinkTelephoneWithOptionArrow from "../ui/LinkTelephoneWithOptionArrow.tsx";
import { getCookies, setCookie } from "std/http/mod.ts";
import apiIp from "$store/sdk/useFetchIp.ts";
import { type FnContext, type SectionProps } from "@deco/deco";
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
/**@titleBy nameBlock */
export interface PropsChildren extends SiteNavigationElement {
  /**@title Nome do Bloco */
  nameBlock?: string;
  /**
   * @title Título Submenu
   * @format rich-text
   */
  titleSubMenu?: string;
  /**
   * @title Descrição Submenu
   * @format rich-text
   */
  descriptionSubMenu?: string;
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
interface ImageGeneric {
  /**@title Imagem */
  src?: ImageWidget;
  /**@title Largura */
  width?: number;
  /**@title Altura */
  height?: number;
}
export interface Props {
  /**
   * @title Desativar o Header?
   */
  disabledHeader?: boolean;
  alerts?: string[];
  /**
   * @title Itens de navegação
   * @description (máximo de 6 itens)
   * @maxItems 6
   */
  navItems?: PropsChildren[] | null;
  /**@title Logo do menu mobile */
  drawer?: ImageGeneric;
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
  /**@title Posição do logo */
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
    disabledHeader = false,
    alerts,
    navItems,
    desktop,
    mobile,
    drawer,
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
      {!disabledHeader && (
        <header style={{ height: headerHeight }}>
          <Drawers
            menu={{ items, whatsapp }}
            platform={platform}
            drawer={drawer}
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
                  desktop={desktop}
                  mobile={mobile}
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
      )}
    </>
  );
}
export const loader = (props: Props, req: Request, ctx: FnContext) => {
  const cookies = getCookies(req.headers);
  const selectedLanguage = cookies["N1_SelectedLanguage"] || "pt-br";
  const userIp = apiIp;
  let countryCode;
  if (!userIp?.countryCode) {
    return countryCode = "pt-br";
  }
  switch (userIp?.countryCode) {
    case "BR":
      countryCode = "pt-br";
      break; // Brasil
    case "AO":
      countryCode = "pt-br";
      break; // Angola
    case "CV":
      countryCode = "pt-br";
      break; // Cabo Verde
    case "GW":
      countryCode = "pt-br";
      break; // Guiné-Bissau
    case "CQ":
      countryCode = "pt-br";
      break; // Guiné Equatorial
    case "MZ":
      countryCode = "pt-br";
      break; // Moçambique
    case "ST":
      countryCode = "pt-br";
      break; // São Tomé e Príncipe
    case "PT":
      countryCode = "pt-br";
      break; // Portugal
    case "US":
      countryCode = "en-en";
      break; // Estados Unidos
    case "ES":
      countryCode = "es-es";
      break; // Espanha
    case "AR":
      countryCode = "es-es";
      break; // Argentina
    case "CU":
      countryCode = "es-es";
      break; // Cuba
    case "MX":
      countryCode = "es-es";
      break; // México
    case "CO":
      countryCode = "es-es";
      break; // Colombia
    case "CL":
      countryCode = "es-es";
      break; // Chile
    case "CR":
      countryCode = "es-es";
      break; // Costa Rica
    case "SV":
      countryCode = "es-es";
      break; // El Salvador
    case "EC":
      countryCode = "es-es";
      break; // Equador
    case "GT":
      countryCode = "es-es";
      break; // Guatemala
    case "GQ":
      countryCode = "es-es";
      break; // Guiné Equatorial
    case "HN":
      countryCode = "es-es";
      break; // Honduras
    case "NI":
      countryCode = "es-es";
      break; // Nicarágua
    case "PA":
      countryCode = "es-es";
      break; // Panamá
    case "PY":
      countryCode = "es-es";
      break; // Paraguai
    case "PE":
      countryCode = "es-es";
      break; // Peru
    case "PR":
      countryCode = "es-es";
      break; // Porto Rico
    case "DO":
      countryCode = "es-es";
      break; // República Dominicana
    case "EH":
      countryCode = "es-es";
      break; // Saara Ocidental
    case "UY":
      countryCode = "es-es";
      break; // Uruguai
    case "VE":
      countryCode = "es-es";
      break; // Venezuela
    default:
      countryCode = "en-en";
  }
  if (!cookies["N1_SelectedLanguage"]) {
    setCookie(ctx.response.headers, {
      name: "N1_SelectedLanguage",
      value: countryCode,
      path: "/",
    });
  }
  return {
    ...props,
    selectedLanguage,
  };
};
export default Header;
