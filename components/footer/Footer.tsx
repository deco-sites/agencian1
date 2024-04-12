import BackToTop from "$store/components/footer/BackToTop.tsx";
import ColorClasses from "$store/components/footer/ColorClasses.tsx";
import Divider from "$store/components/footer/Divider.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";
import Logo from "$store/components/footer/Logo.tsx";
import PaymentMethods from "$store/components/footer/PaymentMethods.tsx";
import Social from "$store/components/footer/Social.tsx";
import Copyright from "./Copyright.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**@titleBy label */
export type Item = {
  /**@title Nome */
  label: string;
  /**@title Link */  
  /**@description (ex: /nossos-servicos/suporte) */  
  href?: string;
  /**@title Ocultar item? */  
  disabledItem?:boolean;
};

/**@titleBy label */
export type Section = {
  /**@title Nome */  
  label: string;
  /**@title Items */  
  items: Item[];
};

export interface SocialItem {
  /**@title Rede */
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter"
    | "Youtube"
    | "Email";
  /**@title link */      
  link: string;
  /**@title Ocultar item? */
  disabledSocial?:boolean;
}

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    copyrightText?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  regionOptions?: RegionOptions;
  extraLinks?: Item[];
  backToTheTop?: {
    text?: string;
  };
  /** @title Coloque os direitos reservados */
  /** @format text */
  copyright?: string;
  layout?: Layout;
}

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
  },
  copyright,
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  mobileApps = { apple: "/", android: "/" },
  regionOptions = { currency: [], language: [] },
  extraLinks = [],
  backToTheTop,
  layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      copyrightText: false,
      paymentMethods: false,
      mobileApps: false,
      regionOptions: false,
      extraLinks: false,
      backToTheTop: false,
    },
  },
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
      layout={{
        tiled: layout?.variation == "Variation 4" ||
          layout?.variation == "Variation 5",
      }}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
      justify={layout?.variation == "Variation 2" ||
        layout?.variation == "Variation 3"}
    />
  );
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} vertical={layout?.variation == "Variation 3"} />;
  const _copyright = layout?.hide?.copyrightText
    ? <></>
    : <Copyright copyrightText={copyright} />;
  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} />;

  return (
    <footer class="relative bg-[#0C1F59]">
      <div
        class={`md:py-[60px] md:n1-container lg:pr-[93px] lg:pl-[120px] w-full flex flex-col gap-10`}
      >
        {/* <div class={`pt-[60px] pb-[60px] n1-container w-full flex flex-col md:pb-10 gap-10 ${ColorClasses(layout)}`}> */}
        <div class="lg:container mx-[20px] md:mx-6 lg:mx-auto z-[2]">
          {(!layout?.variation || layout?.variation == "Variation 1") && (
            <div class="flex flex-col">
              <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-[40px] lg:gap-12 mb-[10px]">
                {_logo}
                {_sectionLinks}
                {_newsletter}
              </div>
              <Divider style="n1-border-footer" />
              <div class="lg:flex lg:flex-row gap-10 lg:gap-14 lg:items-end justify-between mt-[40px] tablet:flex tablet:flex-wrap mobile:mb-[23px]">
                {_payments}
                {_social}                
                <div class="mobile:hidden flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-end mb-[10px]">
                  {_copyright}
                </div>
              </div>
            </div>
          )}
          {layout?.variation == "Variation 2" && (
            <div class="flex flex-col gap-10">
              <div class="flex flex-col md:flex-row gap-10">
                <div class="flex flex-col gap-10 lg:w-1/2">
                  {_logo}
                  {_social}
                  {_payments}
                </div>
                <div class="flex flex-col gap-10 lg:gap-20 lg:w-1/2 lg:pr-10">
                  {_newsletter}
                  {_sectionLinks}
                </div>
              </div>
            </div>
          )}
          {layout?.variation == "Variation 3" && (
            <div class="flex flex-col gap-10">
              {_logo}
              <div class="flex flex-col lg:flex-row gap-14">
                <div class="flex flex-col md:flex-row lg:flex-col md:justify-between lg:justify-normal gap-10 lg:w-2/5">
                  {_newsletter}
                  <div class="flex flex-col gap-10">
                    {_payments}
                  </div>
                </div>
                <div class="flex flex-col gap-10 lg:gap-20 lg:w-3/5 lg:items-end">
                  <div class="flex flex-col md:flex-row gap-10">
                    {_sectionLinks}
                    {_social}
                  </div>
                </div>
              </div>
            </div>
          )}
          {layout?.variation == "Variation 4" && (
            <div class="flex flex-col gap-10">
              {_newsletter}
              {layout?.hide?.newsletter ? <></> : <Divider />}
              <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between">
                {_sectionLinks}
                <div class="flex flex-col md:flex-row lg:flex-col gap-10 lg:gap-10 lg:w-2/5 lg:pl-10">
                  <div class="flex flex-col md:flex-row gap-10 lg:gap-20">
                    <div class="lg:flex-auto">
                      {_payments}
                    </div>
                    <div class="lg:flex-auto">
                      {_social}
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex flex-col md:flex-row md:justify-between gap-10 md:items-center">
                {_logo}
              </div>
            </div>
          )}
          {layout?.variation == "Variation 5" && (
            <div class="flex flex-col gap-10">
              {_newsletter}
              {layout?.hide?.newsletter ? <></> : <Divider />}
              {_logo}
              <div class="flex flex-col md:flex-row gap-10 lg:gap-20 md:justify-between">
                {_sectionLinks}
                <div class="flex flex-col gap-10 md:w-2/5 lg:pl-10">
                  {_payments}
                  {_social}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {layout?.hide?.backToTheTop
        ? <></>
        : <BackToTop content={backToTheTop?.text} />}
      <div class="overflow-hidden n1-footer__overlay w-full h-full absolute bottom-0 block">
        <span class="n1-footer__overlay--bottom-left w-[1068px] h-[560px]">
        </span>
        <span class="n1-footer__overlay--bottom w-[1068px] h-[560px]"></span>
        <span class="n1-footer__overlay--bottom-right w-[764px] h-[416px] mobile:w-[850px] mobile:h-[500px]">
        </span>
        <span class="n1-footer__overlay--middle-right w-[764px] h-[416px] mobile:w-[373px]">
        </span>
      </div>
    </footer>
  );
}

export default Footer;
