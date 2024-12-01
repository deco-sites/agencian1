import type { ImageWidget } from "apps/admin/widgets.ts";
import type { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { type SectionProps } from "@deco/deco";
import { type Section } from "@deco/deco/blocks";
import { type Tag } from "site/components/Blog/BlogAsideTags.tsx";
import { AppContext } from "apps/blog/mod.ts";
import { BlogPost } from "apps/blog/types.ts";
import { clx } from "site/sdk/clx.ts";
import BlogTitle from "site/components/Blog/BlogTitle.tsx";
import BlogImage from "site/components/Blog/BlogImage.tsx";
import BlogSocialMidia from "site/components/Blog/BlogSocialMidia.tsx";

interface ImageGeneric {
  src?: ImageWidget;
  width?: number;
  height?: number;
}

interface SocialMedia {
  alt?: string;
  link?: string;
  desktop?: ImageGeneric;
  mobile?: ImageGeneric;
}

interface Layout {
  socialMedia?: SocialMedia[];
}

interface Props {
  post?: BlogPost;
  slug?: RequestURLParam;
  tags?: Tag[];
  asideContent?: Section[];
  layout?: Layout;
}

function BlogContent(
  { post, tags, layout }: { post: BlogPost; tags?: Tag[]; layout?: Layout },
) {
  const postLink = `/nosso-blog/post?slug=${post?.slug}`;

  return (
    <div>
      {post?.title && (
        <BlogTitle
          title={post.title}
          fontSizeDesk="md:[&_*]:text-32"
          fontSizeMobile="[&_*]:text-20"
          link={postLink}
        />
      )}

      {layout && <BlogSocialMidia socialMedia={layout.socialMedia} />}

      {post?.image && <BlogImage imageBlog={post.image} borderRadius={10} />}

      {post?.content && (
        <div
          class={clx("text-16 font-normal")}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}

      {tags && (
        <div class="flex flex-col items-start self-stretch gap-[20px] mt-[30px]">
          <h2 class="font-archimoto-medium font-black text-24">
            Nuvem com tags
          </h2>
          <ul class="flex flex-wrap gap-[10px]">
            {tags.map(({ link, name }, idx) => (
              <li key={`tag-${idx}`} class="inline-flex">
                <a
                  href={link}
                  class="flex px-[14px] py-[8px] items-center rounded-[30px] border border-[#ffffff] hover:bg-[#ffffff] hover:text-[#585858] text-[14px] leading-[22.4px] font-noto-sans"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DetailPost(
  { post, tags, layout, asideContent }: SectionProps<typeof loader>,
) {
  if (!post) return null;

  const hasAsideContent = asideContent && asideContent.length > 0;

  return (
    <section
      class={clx(
        "n1-blog md:n1-container md:px-[120px] md:my-0 md:mb-[60px] md:mx-auto text-[#ffffff]",
      )}
    >
      <div
        class={clx(
          "flex flex-col px-[20px] md:px-0 md:grid",
          hasAsideContent ? "md:grid-cols-[auto_1fr]" : "md:grid-cols-[1fr]",
          "md:gap-x-[30px]",
        )}
      >
        <div class={clx("n1-blog__content flex flex-col gap-y-[30px]")}>
          <div
            class={clx(
              "n1-blog__content-item px-[20px] py-[30px] rounded-[10px]",
              !hasAsideContent ? "my-0 mx-auto" : "",
              "md:max-w-[790px]",
              "bg-[linear-gradient(181.01deg,_#FFFFFF_-176.1%,_rgba(255,_255,_255,_0.29)_-85.87%,_rgba(255,_255,_255,_0)_124.35%)]",
            )}
          >
            <div class="n1-blog__content-subitem pb-[30px] rounded-[10px]">
              <div class="n1-blog">
                <BlogContent post={post} tags={tags} layout={layout} />
              </div>
            </div>
          </div>
        </div>

        {hasAsideContent && (
          <aside class="n1-blog__aside md:w-[378px] mt-[40px] md:mt-0">
            <div
              class={clx(
                "flex flex-col gap-y-[30px] md:gap-y-[32px] static md:sticky top-[103px]",
              )}
            >
              {asideContent.map(({ Component, props }, index) => (
                <Component key={index} {...props} />
              ))}
            </div>
          </aside>
        )}
      </div>
    </section>
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

export default DetailPost;
