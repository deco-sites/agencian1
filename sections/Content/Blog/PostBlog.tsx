import type { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "$store/sdk/clx.ts";
import BlogTitle from "deco-sites/agencian1/components/ui/BlogTitle.tsx";
import BlogSocialMidia from "deco-sites/agencian1/components/ui/BlogSocialMidia.tsx";
import BlogImage from "deco-sites/agencian1/components/ui/BlogImage.tsx";
import BlogDescription from "deco-sites/agencian1/components/ui/BlogDescription.tsx";
import BlogAside from "deco-sites/agencian1/components/ui/BlogAside.tsx";

interface AsideSearch {
  /**
   * @title Titulo de bloco busca
   * @format html
   */
  titleSearch?: string;
  /**@title Máscara do campo busca */
  maskSearch?: string;
}

interface AsideNewsletter {
  /**
   * @title Titulo de bloco Email/News
   * @format html
   */
  titleNewsletter?: string;
  /**@title Máscara nome */
  maskNewsletterName?: string;
  /**@title Máscara e-mail */
  maskNewsletterEmail?: string;
  /**@title Texto do botão */
  textButton?: string;
}

/**@titleBy category*/
interface ArrayCategory {
  /**@title Nome da categoria */
  category?: string;
  /**@title Quantidade categoria */
  count?: string;
}

interface AsideCategories {
  /**
   * @title Titulo de bloco Categoria
   * @format html
   */
  title?: string;
  /**
   * @title Categoria
   * @description (max: 4)
   * @maxItems 4
   */
  arrayCategories?: ArrayCategory[];
}

interface AsideTags {
  /**
   * @title Nome do campo Tag
   * @format html
   */
  title?: string;
  /**
   * @title Tag
   * @description (max: 9)
   * @maxItems 9
   */
  nameTag?: string[];
}

interface Aside {
  /**@title Campo de Busca */
  search?: AsideSearch;
  /**@title Campo de Newsletter */
  newsletter?: AsideNewsletter;
  categories?: AsideCategories;
  tag?: AsideTags;
}

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
  /**@title Conteúdo Blog */
  content: Content[];
  aside?: Aside;
  /**@title Ocultar seção Aside */
  disableAside?: boolean;
}

function PostBlog({ content, disableAside, aside }: Props) {
  return (
    <>
      <section
        class={clx(
          `n1-blog md:n1-container md:px-[120px] md:my-0 md:mb-[60px] md:mx-auto text-[#ffffff]`,
        )}
      >
        <div
          class={clx(
            `flex flex-col px-[20px] md:px-0 md:grid ${
              disableAside ? "md:grid-cols-[1fr]" : "md:grid-cols-[auto_1fr]"
            } md:gap-x-[30px]`,
          )}
        >
          <div class={clx(`n1-blog__content flex flex-col gap-y-[30px]`)}>
            {content && content.length > 0 && content.map((post) => {
              return (
                <>
                  <div
                    class={`n1-blog__content-item ${
                      disableAside ? "my-0 mx-auto" : ""
                    } md:max-w-[790px] `}
                  >
                    <div
                      class={`n1-blog__content-subitem py-[30px] px-[20px] rounded-[10px]`}
                    >
                      <div class={`n1-blog`}>
                        <div>
                          {post.text?.title && (
                            <BlogTitle
                              title={post.text.title}
                              fontSizeDesk={`md:[&_*]:text-32`}
                              fontSizeMobile={`[&_*]:text-20`}
                            />
                          )}

                          {post.socialMedia && (
                            <BlogSocialMidia socialMedia={post.socialMedia} />
                          )}

                          {post.imageBlog && (
                            <BlogImage imageBlog={post.imageBlog} />
                          )}

                          {post.text?.description && (
                            <BlogDescription
                              description={post.text.description}
                            />
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
            <div class={clx(`my-0 mx-auto mt-[10px] md:mt-0`)}>
              <button
                class={clx(`
                                    py-[15px] px-[20px] md:py-[20px] md:px-[30px] rounded-[100px] bg-accent text-primary font-archimoto-medium 
                                    font-black text-[14px] leading-[14px] md:text-[16px] md:leading-[20px]
                                `)}
              >
                Ver mais notícias
              </button>
            </div>
          </div>

          {!disableAside && aside && <BlogAside aside={aside} />}
        </div>
      </section>
    </>
  );
}

export default PostBlog;
