import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { clx } from "$store/sdk/clx.ts";
import BlogTitle from "deco-sites/agencian1/components/ui/BlogTitle.tsx";
import BlogSocialMidia from "deco-sites/agencian1/components/ui/BlogSocialMidia.tsx";
import BlogImage from "deco-sites/agencian1/components/ui/BlogImage.tsx";
import BlogDescription from "deco-sites/agencian1/components/ui/BlogDescription.tsx";

interface ImageGeneric {
  /**@title Imagem */
  src?: ImageWidget;
  /**
   * @title Largura
   * @description (ex: 150, resultado é em pixel)
   */
  width?: number;
  /**
   * @title Altura
   * @description (ex: 150, resultado é em pixel)
   */
  height?: number;
}

/**@titleBy alt */
interface SocialMedia {
  /**@title Nome da Mídia */
  alt?: string;
  /**@title Link da Mídia */
  link?: string;
  /**@title Desktop */
  desktop?: ImageGeneric;
  /**@title Mobile */
  mobile?: ImageGeneric;
}

interface TextBlog {
  /**
   * @title Título
   * @format html
   */
  title?: string;
  /**
   * @title Texto
   * @format html
   */
  description?: string;
}

interface ImageBlog {
  /**@title Nome da Imagem */
  alt?: string;
  /**@title Desktop */
  desktop?: ImageGeneric;
  /**@title Mobile */
  mobile?: ImageGeneric;
}

interface Button {
  /**@title Texto do botão */
  text?: string;
  /**@title Link do botão */
  link?: string;
}

/**@titleBy nameBlog */
interface Content {
  nameBlog: string;
  /**
   * @title Social Mídia
   * @description (ex: máximo de 6 itens)
   * @maxItems 6
   */
  socialMedia?: SocialMedia[];
  /**@title Imagem do Blog */
  imageBlog?: ImageBlog;
  /**@title Textos do Blog */
  text?: TextBlog;
  /**@title Botão do Blog */
  button?: Button;
  /**@title Botão de continue lendo? */
  btnContinue?: boolean;
}

interface Props {
  /**
   * @title Título
   * @format html
   */
  title?: string;
  /**@title Conteúdo Blog */
  content: Content[];
  /**@title Seção Aside está visível? */
  disableAside?: boolean;
}

function MoreContentBlog({ title, content, disableAside }: Props) {
  return (
    <>
      <section
        class={clx(
          `n1-moreContentBlog n1-blog md:n1-container md:px-[120px] md:my-0 md:mb-[60px] md:mx-auto text-[#ffffff]`,
        )}
      >
        <div>
          {title && (
            <div
              class={clx(`
                                md:[&_*]:text-[32px] md:[&_*]:leading-[38.4px] [&_*]:text-24
                                [&_*]:font-archimoto-medium [&_*]:font-black mb-[30px]`)}
              dangerouslySetInnerHTML={{ __html: title }}
            >
            </div>
          )}

          <div
            class={clx(`
                            md:gap-[30px] ${
              disableAside
                ? "flex flex-wrap md:max-w-[1440px]"
                : "md:grid md:grid-cols-2-auto md:max-w-[790px]"
            }
                        `)}
          >
            {content && content.length > 0 && content.map((post) => {
              return (
                <>
                  <div
                    class={clx(`
                                                n1-blog__content-item 
                                                ${
                      disableAside
                        ? "w-[calc(25%_-_30px)] min-w-[270px]"
                        : "my-0 mx-auto"
                    }
                                            `)}
                  >
                    <div
                      class={`n1-blog__content-subitem py-[30px] px-[20px] rounded-[10px]`}
                    >
                      <div class={`n1-blog`}>
                        <div>
                          {post.imageBlog && (
                            <BlogImage imageBlog={post.imageBlog} />
                          )}

                          {post.text?.title && (
                            <div
                              class={clx(`n1-moreContentBlog__title`)}
                            >
                              <BlogTitle
                                title={post.text.title}
                                fontSizeDesk={`md:[&_*]:text-24`}
                                fontSizeMobile={`[&_*]:text-16`}
                              />
                            </div>
                          )}

                          {post.text?.description && (
                            <div
                              class={clx(`n1-moreContentBlog__description`)}
                            >
                              <BlogDescription
                                description={post.text.description}
                                fontSizeDesk={`md:[&_*]:text-16 md:[&_*]:leading-[25.6px]`}
                                fontSizeMobile={`[&_*]:text-16 [&_*]:leading-[25.6px]`}
                              />
                            </div>
                          )}

                          {post.button?.text && (
                            <button
                              class={clx(`
                                                                    mt-[30px] py-[15px] px-[20px] rounded-[100px] border border-[#ffffff] flex items-center
                                                                    text-[14px] leading-[14px] font-archimoto-medium font-black max-h-[40px]
                                                                `)}
                            >
                              {post.button.text}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default MoreContentBlog;
