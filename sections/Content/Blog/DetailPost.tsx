import { AppContext } from "apps/blog/mod.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Section, SectionProps } from "deco/mod.ts";
import { BlogPost } from "apps/blog/types.ts";
import { clx } from "$store/sdk/clx.ts";
import BlogTitle from "$store/components/Blog/BlogTitle.tsx";
import BlogDescription from "$store/components/Blog/BlogDescription.tsx";
import BlogImage from "$store/components/Blog/BlogImage.tsx";
import BlogSocialMidia from "$store/components/Blog/BlogSocialMidia.tsx";


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

export interface Layout {
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

export interface Props {
  posts?: BlogPost[];
  asideCotent?: Section[];
  /**@title Blog layout */
  layout?: Layout;
}

export default function DetailPost({
  posts,
  layout,
  asideCotent,
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
                !(asideCotent && asideCotent?.length > 0) ? "md:grid-cols-[1fr]" : "md:grid-cols-[auto_1fr]"
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
                        !(asideCotent && asideCotent?.length > 0) ? "my-0 mx-auto" : ""
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

                            {layout && (
                              <BlogSocialMidia
                                socialMedia={layout?.socialMedia}
                              />
                            )}

                            {post?.image && (
                              <BlogImage imageBlog={post.image} />
                            )}

                            {post?.content && (
                              <BlogDescription description={post.content} />
                            )}

                            {layout?.button?.text && (
                              <button
                                class={clx(` mt-[30px] py-[15px] px-[20px] rounded-[100px] border border-[#ffffff] flex items-center
                             text-[14px] leading-[14px] font-archimoto-medium font-black max-h-[40px]`)}
                              >
                                {layout?.button.text}
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
          {(asideCotent && asideCotent?.length > 0)  && (
            <aside class={`n1-blog__aside md:w-[378px] mt-[40px] md:mt-0`}>
              <div class={clx(`flex flex-col gap-y-[30px] md:gap-y-[32px]`)}>
                {asideCotent.map(({ Component, props }, index) => (
                  <Component key={index} {...props} />
                ))}
              </div>
            </aside>    
          )}
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
