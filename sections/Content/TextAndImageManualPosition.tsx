import type { ImageWidget } from "apps/admin/widgets.ts";
import LinkWithOptionArrow from "$store/components/ui/LinkWithOptionArrow.tsx";
import Image from "apps/website/components/Image.tsx";

interface Link {
  /** @title link */
  /** @description (ex: https://agencian1.com.br) */
  href?: string;
  /** @title Texto do link */
  textLink?: string;
  /** @title Cor do botão transparente? */
  activeButtonTransparent?: boolean;
  /** @title Ativar Seta no botão? */
  activeArrowInButton?: boolean;
}

interface Position {
  /**@title Vertical */
  Y?: number;
  /**@title Horizontal */
  X?: number;
}

/**@titleBy alt*/
interface Image {
  /**@title Imagem*/
  src?: ImageWidget;
  /**@title Largura da Imagem*/
  width?: number;
  /**@title Altura da Imagem*/
  height?: number;
  /**@title Nome da Imagem*/
  alt?: string;
  /**@title Posição da Imagem*/
  position?: Position;
}

interface Props {
  /**@title Texto*/
  /**@format rich-text */
  text?: string;
  /**@title Imagem*/
  image?: Image;
  /**@title Link*/
  link?: Link;
}

function TextAndImageManualPosition({ text, image, link }: Props) {
  return (
    <>
      <div class="relative">
        {image?.src && image?.width && image?.height && image?.position && (
          <Image
            class="hidden xl:flex z-0 absolute top-0 right-0"
            style={{
              right: image.position?.X ? image.position?.X : 0,
              top: image.position?.Y ? image.position?.Y : 0,
            }}
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image?.alt ? image?.alt : "Imagem Background"}
            loading="lazy"
          />
        )}
        <div class="md:n1-container md:px-[120px] md:py-[80px] mobile:pb-[80px] relative z-10 mobile:px-[20px]">
          <div>
            {text && (
              <div
                class="mobile:[&_*]:text-24 mobile:max-w-[95%] md:[&_*]:text-48 font-black font-archimoto-medium text-[#ffffff] mb-[30px]"
                dangerouslySetInnerHTML={{ __html: text }}
              >
              </div>
            )}

            {link && (
              <div
                class={`${
                  !link?.activeArrowInButton ? "n1-link__no-arrow" : ""
                }`}
              >
                {link?.activeButtonTransparent && (
                  <LinkWithOptionArrow
                    text={link?.textLink}
                    link={link?.href}
                    activeArrow={true}
                    width={"220"}
                    fontSize="14"
                    margin={"0"}
                  />
                )}

                {!link?.activeButtonTransparent && (
                  <LinkWithOptionArrow
                    text={link?.textLink}
                    link={link?.href}
                    activeArrowService={true}
                    width={"220"}
                    fontSize="14"
                    margin={"0"}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TextAndImageManualPosition;
