import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { FnContext, SectionProps } from "deco/mod.ts";
import CasesComponentMobile from "$store/components/ui/CasesComponentMobile.tsx";
import CasesComponentDesktop from "$store/components/ui/CasesComponentDesktop.tsx";
import CasesComponentTextWithButton from "$store/components/ui/CasesComponentTextWithButton.tsx";
import LinkTelephoneWithOptionArrow from "site/components/ui/LinkTelephoneWithOptionArrow.tsx";

/** @title {{{nameTag}}}*/
interface TagProps {
  imageTag?: ImageWidget;
  /**@title nome da TAG */
  nameTag?: string;
}

/** @title {{{alt}}}*/
interface PropsImage {
  /**@title Logo */
  imageLogo?: ImageWidget;
  /**@title nome da imagem */
  alt?: string;
  /**@title link */
  href?: string;
  /**
   * @title Largura do logo
   * @description (ex: 300)
   */
  widthLogo?: number;
  /**
   * @title Altura do logo
   * @description (ex: 300)
   */
  heightLogo?: number;
  /**@title Imagem de fundo*/
  imageBackground?: ImageWidget;
  /**
   * @title Largura da imagem de fundo
   * @description (ex: 300)
   */
  widthImageBackground?: number;
  /**@title Altura da imagem de fundo */
  /**@description (ex: 300) */
  heightImageBackground?: number;
  /**@title Texto da porcentagem */
  infoPorcentagem?: string;
  /**@title Texto */
  infoText?: string;
  /**@title Ícone */
  icon?: ImageWidget;

  /********CONFIGURAÇÃO DO HOVER******* */

  /**@title Logo (efeito hover) */
  imageLogoHover?: ImageWidget;
  /**@title Logo (efeito hover) Mobile*/
  imageLogoMobileHover?: ImageWidget;
  /**
   * @title Largura do logo (efeito hover)
   * @description (ex: 300)
   */
  widthLogoHover?: number;
  /**
   * @title Altura do logo (efeito hover)
   * @description (ex: 300)
   */
  heightLogoHover?: number;
  /**@title Imagem de fundo (efeito hover)*/
  imageBackgroundHover?: ImageWidget;
  /**
   * @title Largura da imagem de fundo (efeito hover)
   * @description (ex: 300)
   */
  widthImageBackgroundHover?: number;
  /**
   * @title Altura da imagem de fundo (efeito hover)
   * @description (ex: 300)
   */
  heightImageBackgroundHover?: number;
  /**@title Ícone (efeito hover)*/
  iconHover?: ImageWidget;
  /**@title Tags (efeito hover)*/
  /** @maxItems 6 */
  tagProps?: TagProps[];
}

interface MarginProps {
  /** @title Margem superior */
  top?: number;
  /** @title Margem inferior */
  bottom?: number;
}

export interface telephoneProps {
  text?: string;
  telephone?: string;
  activeArrow?: boolean;
  width?: string;
  height?: string;
  customClass?: string;
  fontSize?: string;
}

interface Props {
  /**@title Subtítulo */
  /**@format html */
  subtitle?: string;
  /** @title adicionar barra "/" antes da frase? */
  addBar?: boolean;
  /** @title adicionar chaves "{}" antes e depois da frase? */
  addKeysInWords?: boolean;
  /**@title Texto */
  text?: string;
  /**@title Texto do botão  */
  textButton?: string;
  /**@title Link do botão  */
  hrefButton?: string;
  /**@title Ativar icon arrow no link  */
  activeArrow?: boolean;
  /**
   * @description Configuração das imagens *
   * @maxItems 5
   */
  settingsImage?: PropsImage[];
  /**@title Imagem de fundo da seção  */
  imageBackgroundSection?: ImageWidget;
  /**
   * @title Largura da imagem de fundo da seção
   * @description (ex: 235)
   */
  widthBackgroundSection?: number;
  /**
   * @title Altura da imagem de fundo da seção
   * @description (ex: 396)
   */
  heightBackgroundSection?: number;
  /**
   * @title Margem
   * @description (Mobile)
   */
  margin?: MarginProps;

  ButtonAds?: telephoneProps;
}

function CasesComponent(props: SectionProps<ReturnType<typeof loader>>) {
  const {
    subtitle,
    text,
    textButton,
    hrefButton,
    activeArrow,
    settingsImage,
    device,
    imageBackgroundSection,
    widthBackgroundSection,
    heightBackgroundSection,
    addBar,
    addKeysInWords,
    margin,
    ButtonAds,
  } = props;

  return (
    <>
      <div
        class={`n1-cases mobile:px-[20px] md:mt-[120px] relative z-1 overflow-hidden`}
        style={{
          marginTop: device === "mobile" && margin?.top
            ? margin?.top + "px"
            : "",
          marginBottom: device === "mobile" && margin?.bottom
            ? margin?.bottom + "px"
            : "",
        }}
      >
        {imageBackgroundSection && (
          <div class="hidden md:flex absolute top-0 left-0 w-full h-full">
            <div class="absolute bottom-0 left-0">
              <Image
                class="hidden mobile:flex lg:flex"
                width={widthBackgroundSection ? widthBackgroundSection : 235}
                height={heightBackgroundSection ? heightBackgroundSection : 396}
                sizes="(max-width: 300px) 100vw, 30vw"
                src={imageBackgroundSection}
                alt={"Background Image"}
                loading="lazy"
              />
            </div>
          </div>
        )}

        <div class=" flex flex-col flex-wrap lg:grid lg:grid-rows-[repeat(2,_auto)] xl:n1-container md:px-[120px] py-[0]">
          <CasesComponentTextWithButton
            subtitle={subtitle}
            text={text}
            textButton={textButton}
            hrefButton={hrefButton}
            activeArrow={activeArrow}
            addBar={addBar}
            addKeysInWords={addKeysInWords}
          />

          {device === "desktop" && (
            <CasesComponentDesktop settingsImage={settingsImage} />
          )}

          {device === "mobile" && (
            <CasesComponentMobile settingsImage={settingsImage} />
          )}
          {ButtonAds && (
            <div class="my-6 flex justify-start w-full">
              <LinkTelephoneWithOptionArrow
                text={ButtonAds.text}
                telephone={ButtonAds.telephone}
                activeArrow={ButtonAds.activeArrow}
                width={ButtonAds.width}
                height={ButtonAds.height}
                customClass={ButtonAds.customClass}
                fontSize={ButtonAds.fontSize}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};

export default CasesComponent;
