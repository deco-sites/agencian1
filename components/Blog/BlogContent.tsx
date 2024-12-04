import { type Section } from "@deco/deco/blocks";
import { clx } from "site/sdk/clx.ts";
import { BlogPost } from "apps/blog/types.ts";
// import { Layout, Pagination } from "site/sections/Blog/MainPost.tsx";
import BlogContentPartial from "site/islands/BlogContentPartial.tsx";

type Layout = unknown;
type Pagination = unknown;

export interface Props {
  posts: BlogPost[];
  pagination?: Pagination;
  asideContent?: Section[];
  layout?: Layout;
}

export default function BlogContent({
  posts,
  asideContent,
  pagination,
  layout,
}: Props) {
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
              !(asideContent && asideContent?.length > 0)
                ? "md:grid-cols-[1fr]"
                : "md:grid-cols-[auto_1fr]"
            } md:gap-x-[30px]`,
          )}
        >
          <BlogContentPartial
            posts={posts}
            asideContent={asideContent}
            layout={layout}
            pagination={pagination}
          />

          {asideContent && asideContent?.length > 0 && (
            <aside class={`n1-blog__aside md:w-[378px] mt-[40px] md:mt-0`}>
              <div
                class={clx(
                  `flex flex-col gap-y-[30px] md:gap-y-[32px]  static md:sticky top-[103px]`,
                )}
              >
                {asideContent?.map(({ Component, props }, index) => (
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
