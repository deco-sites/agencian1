import LinkTelephoneWithOptionArrow from "site/components/ui/LinkTelephoneWithOptionArrow.tsx";
import { clx } from "$store/sdk/clx.ts";


interface CTAPhone {
    text?: string;
    telephone?: string;
    activeArrow?: boolean;
    width?: string;
    height?: string;
    customClass?: string;
    fontSize?: string;
}
interface CTALayout{
    customClass?: string;
}
  

export interface Props {
  buttonAds?: CTAPhone;
  layout?: CTALayout;
}

function Cta({buttonAds, layout}: Props) {
  return (
    <div class={clx(`${layout?.customClass ? layout?.customClass : ""}`)}>
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
  );
}

export default Cta;
