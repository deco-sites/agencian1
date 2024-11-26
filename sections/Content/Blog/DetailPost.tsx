import { AppContext } from "apps/blog/mod.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { Section, SectionProps } from "deco/mod.ts";
import { BlogPost } from "apps/blog/types.ts";
import { clx } from "$store/sdk/clx.ts";
import BlogTitle from "$store/components/Blog/BlogTitle.tsx";
import { Tag } from "$store/components/Blog/BlogAsideTags.tsx";
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
  /**
   * @title Social Mídia
   * @description (ex: máximo de 6 itens)
   * @maxItems 6
   */
  socialMedia?: SocialMedia[];
}

export interface Props {
  post?: BlogPost;
  slug?: RequestURLParam;
  tags?: Tag[];
  asideCotent?: Section[];
  /**@title Blog layout */
  layout?: Layout;
}

export default function DetailPost({
  post,
  tags,
  layout,
  asideCotent,
}: SectionProps<typeof loader>) {
  if (!post) return <></>;

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
              !(asideCotent && asideCotent?.length > 0)
                ? "md:grid-cols-[1fr]"
                : "md:grid-cols-[auto_1fr]"
            } md:gap-x-[30px]`
          )}
        >
          <div class={clx(`n1-blog__content flex flex-col gap-y-[30px]`)}>
            {post && (
              <>
                <div
                  class={`n1-blog__content-item ${
                    !(asideCotent && asideCotent?.length > 0)
                      ? "my-0 mx-auto"
                      : ""
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
                            link={`/nosso-blog/post?slug=${post?.slug}`}
                          />
                        )}

                        {layout && (
                          <BlogSocialMidia socialMedia={layout?.socialMedia} />
                        )}

                        {post?.image && <BlogImage imageBlog={post.image} />}

                        {post?.content && (
                          <div
                            class={clx(`text-16 font-normal`)}
                            dangerouslySetInnerHTML={{ __html: post?.content }}
                          ></div>
                        )}
                        
                        {tags && (
                          <div class="flex flex-col items-start self-stretch gap-[20px] mt-[30px]">
                            <h2 class="font-archimoto-medium font-black text-24">
                              Nuvem com tags
                            </h2>
                            <ul class="flex flex-wrap gap-[10px]">
                              {tags.map(({link, name}, idx) => (
                                <li key={`tag-${idx}`} class="inline-flex">
                                  <a href={link} class=" flex px-[14px] py-[8px] items-center rounded-[30px] border border-[#ffffff] hover:bg-[#ffffff] hover:text-[#585858] text-[14px] leading-[22.4px] font-noto-sans">
                                    {name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {asideCotent && asideCotent?.length > 0 && (
            <aside class={`n1-blog__aside md:w-[378px] mt-[40px] md:mt-0`}>
              <div class={clx(`flex flex-col gap-y-[30px] md:gap-y-[32px] static md:sticky top-[103px]`)}>
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

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const url = new URL(req.url);
  const urlParams = new URLSearchParams(url.search);
  const slug = props?.slug ?? urlParams.get("slug");

  const post = await ctx.invoke.blog.loaders.BlogPostItem({ slug });

  return {
    ...props,
    post,
  };
};
