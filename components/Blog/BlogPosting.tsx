import { BlogPost } from "apps/blog/types.ts";
import BlogTitle from "$store/components/Blog/BlogTitle.tsx";
import BlogSocialMidia from "$store/components/Blog/BlogSocialMidia.tsx";
import BlogImage from "$store/components/Blog/BlogImage.tsx";
import BlogDescription from "$store/components/Blog/BlogDescription.tsx";
import { Layout } from "$store/sections/Content/Blog/MainPost.tsx";
import { clx } from "$store/sdk/clx.ts";

export default function BlogPosting({
  post,
  layout,
  asideContent,
}: {
  post: BlogPost;
  layout?: Layout;
  asideContent?: unknown[];
}) {
  return (
    <div
      class={`n1-blog__content-item ${
        !(asideContent && asideContent?.length > 0) ? "my-0 mx-auto" : ""
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

            {layout && <BlogSocialMidia socialMedia={layout?.socialMedia} />}

            {post?.image && <BlogImage imageBlog={post.image} />}

            {post?.content && <BlogDescription description={post.content} />}

            {layout?.button?.text && (
              <a
                href={`/nosso-blog/post?slug=${post?.slug}`}
                class={clx(
                  `w-fit mt-[30px] py-[15px] px-[20px] rounded-[100px] hover:bg-[#ffffff] hover:text-[#585858] border border-[#ffffff] flex items-center
                             text-[14px] leading-[14px] font-archimoto-medium font-black max-h-[40px]`,
                )}
              >
                {layout?.button.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
