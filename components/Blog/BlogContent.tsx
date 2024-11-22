import { clx } from "$store/sdk/clx.ts";
import { BlogPost } from "apps/blog/types.ts";
import { Section } from "deco/mod.ts";
import { Pagination, Layout } from "$store/sections/Content/Blog/MainPost.tsx";
import BlogContentPartial from "$store/islands/BlogContentPartial.tsx";

export interface Props {
  posts: BlogPost[];
  pagination?: Pagination;
  asideCotent?: Section[];
  layout?: Layout;
}

export default function BlogContent({
  posts,
  asideCotent,
  pagination,
  layout,
}: Props) {
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
          <BlogContentPartial
            posts={posts}
            asideCotent={asideCotent}
            layout={layout}
            pagination={pagination}
          />

          {asideCotent && asideCotent?.length > 0 && (
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
