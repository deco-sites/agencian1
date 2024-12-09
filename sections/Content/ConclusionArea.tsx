import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import LinkTelephoneWithOptionArrow from "$store/components/ui/LinkTelephoneWithOptionArrow.tsx";
import { clx } from "$store/sdk/clx.ts";
import { type FnContext, type SectionProps } from "@deco/deco";
interface ImageGeneric {
  /**@title Imagem */
  src?: ImageWidget;
  /**@title Largura */
  width?: number;
  /**@title Altura */
  height?: number;
}
interface DeviceImage {
  /**@title Desktop */
  desktop?: ImageGeneric;
  /**@title Mobile */
  mobile?: ImageGeneric;
}
interface TextGeneric {
  /**
   * @title Título
   * @format rich-text
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
   * @format rich-text
   */
  description?: string;
}
/**@titleBy alt */
interface Props {
  /**@title Textos */
  text?: TextGeneric;
  /**@title Numero do Telefone */
  whatsapp?: string;
  /**@title Texto do Botão */
  btnText?: string;
  /**@title Imagem */
  responsive?: DeviceImage;
  /**@title Nome da imagem */
  alt?: string;
  /**@title Imagem de fundo */
  bgImage?: DeviceImage;
}
function ConclusionArea(props: SectionProps<ReturnType<typeof loader>>) {
  const { text, whatsapp, btnText, responsive, alt, bgImage, device } = props;
  return (
    <>
      <div
        class={clx(`
                    md:max-w-[1200px] my-[80px] mobile:w-[90%] mx-auto text-[#ffffff] relative h-[540px] mobile:h-[590px]
                    [@media(max-width:1280px)]:w-[90%]`)}
      >
        <div class={`w-full absolute top-0 left-0  flex justify-center`}>
          <Picture class={`flex justify-center`}>
            {bgImage?.desktop?.src && bgImage?.desktop?.width &&
              bgImage?.desktop?.height &&
              (
                <Source
                  media="(min-width: 1025px)"
                  src={bgImage.desktop.src}
                  width={bgImage.desktop.width}
                  height={bgImage.desktop.height}
                />
              )}
            {bgImage?.mobile?.src && bgImage?.mobile?.width &&
              bgImage.mobile?.height && (
              <Source
                media="(max-width: 1024px)"
                src={bgImage.mobile.src}
                width={bgImage.mobile.width}
                height={bgImage.mobile.height}
              />
            )}
            <img
              src={bgImage?.desktop?.src}
              width={bgImage?.desktop?.width}
              height={bgImage?.desktop?.height}
              loading={"lazy"}
              class={`n1-conclusion__bg-image tablet:max-w-[90%] sm:h-auto`}
            />
          </Picture>
        </div>

        <div
          class={clx(`
                        n1-conclusion-area__text mobile:items-center relative grid grid-cols-3-auto mobile:my-0 mobile:mx-auto 
                        [@media(max-width:1024px)]:grid-cols-[auto] [@media(max-width:425px)]:max-w-full 
                        [@media(max-width:1024px)]:mx-[auto] [@media(max-width:1024px)]:my-[0]`)}
          style={{
            width: `${
              device === "mobile" && bgImage?.mobile?.width
                ? bgImage?.mobile?.width + "px"
                : ""
            }`,
          }}
        >
          <div
            class={clx(`
                            n1-conclusion-area__text-container xl:mt-[50px] mt-[42px] mobile:gap-y-[20px] xl:ml-[160px] mx-auto 
                            mobile:w-[81%] flex flex-col gap-y-[30px] lg:w-[90%] `)}
          >
            {text?.title && (
              <div
                class={clx(`
                                    sm:[&_*]:text-32 sm:text-32 [&_*]:text-20 text-20 text-[#ffffff] 
                                    font-archimoto-medium font-black
                                    ${
                  text?.addKeysInWords
                    ? "is-keys-custom"
                    : text?.addBar
                    ? "is-bar-custom"
                    : text?.addIconTagInWords
                    ? "is-tag-custom"
                    : ""
                }`)}
                dangerouslySetInnerHTML={{ __html: text.title }}
              >
              </div>
            )}
            {text?.description && (
              <div
                class={clx(`
                                    sm:[&_*]:text-[14px] [&_*]:text-[12px] sm:leading-[23px] [&_*]:font-noto-sans text-[#ffffff]`)}
                dangerouslySetInnerHTML={{ __html: text.description }}
              >
              </div>
            )}

            {whatsapp && btnText && (
              <div
                class={clx(`
                                    xl:[&_a]:!w-[25%] mobile:[&_a]:!w-[55%] [&_a]:!w-[35%] [&_a]:!ml-0 [&_span]:!text-14 xl:[&_span]:!text-16`)}
              >
                <LinkTelephoneWithOptionArrow
                  activeArrow={false}
                  telephone={whatsapp}
                  text={btnText}
                />
              </div>
            )}
          </div>
          <div
            class={clx(`
                            n1-conclusion-area__image relative -top-[10px] -right-[10px]
                            [@media(max-width:1024px)]:absolute [@media(max-width:1024px)]:-bottom-[90px] 
                            [@media(max-width:1024px)]:top-[88%] [@media(max-width:1024px)]:right-[30px]`)}
          >
            <div>
              <Picture>
                {responsive?.mobile?.src && responsive?.mobile?.width &&
                  responsive?.mobile?.height && (
                  <Source
                    media="(max-width: 1024px)"
                    src={responsive.mobile.src}
                    width={responsive.mobile.width}
                    height={responsive.mobile.height}
                  />
                )}
                {responsive?.desktop?.src && responsive?.desktop?.width &&
                  responsive?.desktop?.height &&
                  (
                    <Source
                      media="(min-width: 1025px)"
                      src={responsive?.desktop.src}
                      width={responsive?.desktop.width}
                      height={responsive?.desktop.height}
                    />
                  )}
                <img
                  src={responsive?.desktop?.src}
                  width={responsive?.desktop?.width}
                  height={responsive?.desktop?.height}
                  alt={alt ?? alt}
                  class={``}
                />
              </Picture>
            </div>
          </div>
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
export default ConclusionArea;
