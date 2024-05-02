import { Picture, Source } from "apps/website/components/Picture.tsx";
import { FnContext, SectionProps } from "deco/mod.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "$store/sdk/clx.ts";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import DepositionsDesktop from "$store/components/ui/DepositionsDesktop.tsx";
import DepositionsMobile from "$store/components/ui/DepositionsMobile.tsx";
import { useId } from "$store/sdk/useId.ts";

interface ImageGeneric {
  /**@title Imagem */
  src?: ImageWidget;
  /**@title Largura */
  width?: number;
  /**@title Altura */
  height?: number;
}

/**@titleBy alt */
interface Image {
  /**@title Desktop */
  desktop?: ImageGeneric;
  /**@title Mobile */
  mobile?: ImageGeneric;
}

/**@titleBy alt */
interface DepositionAndImage {
  /**@title Nome do Bloco */
  alt?: string;
  /**@title Texto */
  textSticky: Deposition;
  /**@title Imagem */
  image?: Image;
}

interface Deposition {
  /**
   * @title Descrição
   * @format html
   */
  description?: string;
  /**@title Autora */
  author?: string;
  /**@title Cargo */
  jobPosition?: string;
}

interface TextPrincipal {
  /**
   * @title Título
   * @format html
   */
  title?: string;
  /** @title adicionar barra "/" antes da frase? */
  addBar?: boolean;
  /** @title adicionar chaves "{}" antes e depois da frase? */
  addKeysInWords?: boolean;
  /** @title adicionar chaves "</>" antes e depois da frase? */
  addIconTagInWords?: boolean;
  /**
   * @title Descrição
   * @format html
   */
  description?: string;
}

interface Props {
  /** @title Texto Principal */
  textPrincipal?: TextPrincipal;
  /**
   * @title Depoimentos
   * @maxItems 3
   * @description (máximo de 3 itens)
   */
  depositionAndImage?: DepositionAndImage[];
  /**@title Desabilitar seção? */
  disabledSection?:boolean;
}

function Depositions(props: SectionProps<ReturnType<typeof loader>>) {
  const { textPrincipal, depositionAndImage, disabledSection, device } = props;

  const id = useId();

  return (
    <>
      {!disabledSection && (
        <div
          class={`n1-depositions my-[80px] lg:my-[120px] lg:n1-container lg:px-[120px] lg:mx-auto text-[#ffffff] relative`}
          id={id}
        >
          <div>
            <div
              class={clx(`mobile:px-[20px]`)}
            >
              {textPrincipal?.title && (
                <div
                  class={clx(`
                                  ${
                    textPrincipal?.addKeysInWords
                      ? "is-keys-custom"
                      : textPrincipal?.addBar
                      ? "is-bar-custom"
                      : textPrincipal?.addIconTagInWords
                      ? "is-tag-custom"
                      : ""
                  }
                                  xl:[&_*]:text-[56px] xl:text-[56px] xl:[&_*]:leading-[61.6px] [&_*]:font-black font-archimoto-medium
                                  mobile:[&_*]:text-32 text-32`)}
                  dangerouslySetInnerHTML={{ __html: textPrincipal?.title }}
                >
                </div>
              )}
              {textPrincipal?.description && (
                <div
                  class={clx(`
                                      xl:[&_*]:text-[20px] xl:text-[20px] xl:[&_*]:leading-[26px] font-noto-sans lg:mt-[16px]
                                      mobile:[&_*]:text-[16px] text-[16px] mobile:[&_*]:leading-[20.8px] mobile:mt-[8px]`)}
                  dangerouslySetInnerHTML={{ __html: textPrincipal?.description }}
                >
                </div>
              )}
            </div>
          </div>

          {device === "desktop" && depositionAndImage && (
            <DepositionsDesktop depositionAndImage={depositionAndImage} />
          )}

          {device === "mobile" && (
            <DepositionsMobile depositionAndImage={depositionAndImage} id={id} />
          )}
        </div>
      )}
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};

export default Depositions;
