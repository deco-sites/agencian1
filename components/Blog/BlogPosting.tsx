import { type Section } from "@deco/deco/blocks";
import { BlogPost } from "apps/blog/types.ts";
import { Layout } from "site/sections/Content/Blog/MainPost.tsx";
import { clx } from "site/sdk/clx.ts";
import BlogTitle from "site/components/Blog/BlogTitle.tsx";
import BlogCompartilhar from "site/components/Blog/BlogCompartilhar.tsx";
import BlogImage from "site/components/Blog/BlogImage.tsx";
import BlogDescription from "site/components/Blog/BlogDescription.tsx";

export default function BlogPosting({
  post,
  layout,
  asideContent,
}: {
  post: BlogPost;
  layout?: Layout;
  asideContent?: Section[];
}) {
  const link = `/nosso-blog/post?slug=${post?.slug}`;
  return (
    <div
      class={clx(
        "n1-blog__content-item px-[20px] py-[30px] rounded-[10px]",
        !asideContent?.length ? "my-0 mx-auto" : "",
        "md:max-w-[790px]",
        "bg-[linear-gradient(181.01deg,_#FFFFFF_-176.1%,_rgba(255,_255,_255,_0.29)_-85.87%,_rgba(255,_255,_255,_0)_124.35%)]",
      )}
    >
      <div
        class={`n1-blog__content-subitem rounded-[10px]`}
      >
        <div class={`n1-blog`}>
          <div>
            {post?.title && (
              <BlogTitle
                title={post.title}
                fontSizeDesk="text-32"
                fontSizeMobile="mobile:text-20"
                link={link}
              />
            )}

            {layout && <BlogCompartilhar socialMedia={layout.socialMedia} />}

            {post?.image && (
              <BlogImage imageBlog={post.image} link={link} borderRadius={10} />
            )}

            {post?.content && <BlogDescription description={post.content} />}

            {layout?.button?.text && (
              <a
                href={link}
                class={clx(
                  "inline-block w-fit h-[40px] mt-[20px] px-[20px] py-[10px] rounded-[100px]",
                  "hover:bg-[#ffffff] hover:text-[#585858] border border-[#ffffff]",
                  "text-[14px] font-archimoto-medium font-black duration-300",
                )}
              >
                {layout.button.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
