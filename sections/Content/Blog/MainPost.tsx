import { AppContext } from "apps/blog/mod.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { SectionProps } from "deco/mod.ts";
import { BlogPost } from "apps/blog/types.ts";
import { clx } from "$store/sdk/clx.ts";
import BlogTitle from "$store/components/Blog/BlogTitle.tsx";
import BlogDescription from "$store/components/Blog/BlogDescription.tsx";
import BlogImage from "$store/components/Blog/BlogImage.tsx";
import BlogAside from "$store/components/Blog/BlogAside.tsx";
import BlogSocialMidia from "$store/components/Blog/BlogSocialMidia.tsx";

export interface AsideSearch {
    /**
     * @title Titulo de bloco busca
     * @format html
     */
    titleSearch?: string;
    /**@title Máscara do campo busca */
    maskSearch?: string;
}
  
export interface AsideNewsletter {
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
export interface ArrayCategory {
    /**@title Nome da categoria */
    category?: string;
    /**@title Quantidade categoria */
    count?: string;
}
  
export interface AsideCategories {
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
  
export interface AsideTags {
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
  
export interface Aside {
    /**@title Campo de Busca */
    search?: AsideSearch;
    /**@title Campo de Newsletter */
    newsletter?: AsideNewsletter;
    categories?: AsideCategories;
    tag?: AsideTags;
}

export interface Button {
    /**@title Texto do botão */
    text?: string;
    /**@title Link do botão */
    link?: string;
}

export interface ImageGeneric {
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
export interface SocialMedia {
    /**@title Nome da Mídia */
    alt?: string;
    /**@title Link da Mídia */
    link?: string;
    /**@title Desktop */
    desktop?: ImageGeneric;
    /**@title Mobile */
    mobile?: ImageGeneric;
}

export interface Props {
  posts?: BlogPost[];
  aside?: Aside;
  /**@title Ocultar seção Aside */
  disableAside?: boolean;
  /**@title Botão do Blog */
  button?: Button;
  /**@title Botão de continue lendo? */
  btnContinue?: boolean;
  /**
   * @title Social Mídia
   * @description (ex: máximo de 6 itens)
   * @maxItems 6
   */
  socialMedia?: SocialMedia[];
}

export default function MainPost({
  posts,
  disableAside,
  aside,
  button,
  socialMedia,
}: SectionProps<typeof loader>) {
  if (!posts) return <></>;

  return (
    <>
      <section
        class={clx(
          `n1-blog md:n1-container md:px-[120px] md:my-0 md:mb-[60px] md:mx-auto text-[#ffffff]`
        )}
      >
        <div
          class={clx(
            `flex flex-col px-[20px] md:px-0 md:grid ${
              disableAside ? "md:grid-cols-[1fr]" : "md:grid-cols-[auto_1fr]"
            } md:gap-x-[30px]`
          )}
        >
          <div class={clx(`n1-blog__content flex flex-col gap-y-[30px]`)}>
            {posts &&
              posts.length > 0 &&
              posts.map((post: BlogPost) => {
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
                            {post?.title && (
                              <BlogTitle
                                title={post?.title}
                                fontSizeDesk={`md:[&_*]:text-32`}
                                fontSizeMobile={`[&_*]:text-20`}
                              />
                            )}

                            {socialMedia && (
                              <BlogSocialMidia socialMedia={socialMedia} />
                            )}

                            {post?.image && (
                              <BlogImage imageBlog={post.image} />
                            )}

                            {post?.content && (
                              <BlogDescription description={post.content} />
                            )}

                            {button?.text && (
                            <button
                              class={clx(` mt-[30px] py-[15px] px-[20px] rounded-[100px] border border-[#ffffff] flex items-center
                             text-[14px] leading-[14px] font-archimoto-medium font-black max-h-[40px]`)}
                            >
                              {button.text}
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
          {!disableAside && aside && <BlogAside aside={aside} />}
        </div>
      </section>
    </>
  );
}

export const loader = async (props: Props, __: Request, ctx: AppContext) => {
  const posts = await ctx.invoke.blog.loaders.BlogpostList({
    count: 2,
  });
  console.log(posts);
  
  return {
    ...props,
    posts,
  };
};
