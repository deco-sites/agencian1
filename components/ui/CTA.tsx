import LinkTelephoneWithOptionArrow from "site/components/ui/LinkTelephoneWithOptionArrow.tsx";
import { clx } from "$store/sdk/clx.ts";
import { FnContext } from "deco/mod.ts";

export interface CTAPhone {
  text?: string;
  telephone?: string;
  activeArrow?: boolean;
  width?: string;
  height?: string;
  customClass?: string;
  fontSize?: string;
}
export interface CTALayout {
  /** @tilte Margin top */
  /** @description Espaçamento entre uma section e outro ex:10px*/
  marginTop?: string;
  /** @description espaçamento entre uma section e outra ex:10px*/
  marginTopMobile?: string;
  /** @tilte Margin Bottom */
  /** @description spaçamento entre uma section  e outro ex:10px*/
  marginBottom?: string;
  /** @description espaçamento entre uma section e outra ex:10px*/
  marginBottomMobile?: string;
  /** @description espaçamento entre uma section e outra ex:10px*/
  marginLeft?: string;
  marginLeftMobile?: string;
  backgroundColor?: string;
  customClass?: string;
}

export interface Props {
  buttonAds?: CTAPhone;
  /**
   * @title layout
   */
  layout?: CTALayout;
}

function Cta({ buttonAds, layout, device }: ReturnType<typeof loader>) {
  const { marginTop, marginTopMobile, marginBottom, marginBottomMobile, marginLeft, marginLeftMobile } = layout || {};
  const isDesktop = device === "desktop";

  return (
    <div

      class={clx(`${layout?.customClass ? layout?.customClass : ""}`)}
    >
      <div
        style={
          isDesktop
            ? {
                marginTop: `${marginTop}`,
                marginBottom: `${marginBottom}`,
                marginLeft: `${marginLeft}`,
              }
            : {
                marginTop: `${marginTopMobile || marginTop}`,
                marginBottom: `${marginBottomMobile || marginBottom}`,
                marginLeft: `${marginLeft || marginLeftMobile}}`,
              }
        }
      >
        <LinkTelephoneWithOptionArrow
          text={buttonAds?.text}
          telephone={buttonAds?.telephone}
          activeArrow={buttonAds?.activeArrow}
          width={buttonAds?.width}
          height={buttonAds?.height}
          customClass={buttonAds?.customClass}
          fontSize={buttonAds?.fontSize}
        />
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device || "desktop",
  };
};

export default Cta;
