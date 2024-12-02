import { clx } from "site/sdk/clx.ts";
import { BlogPost } from "apps/blog/types.ts";
import BlogDescription from "site/components/Blog/BlogDescription.tsx";

interface Button {
  text?: string;
}

export interface Layout {
  /**@title Botão do Blog */
  button?: Button;
}

interface Props {
  /**
   * @title Título da seção
   */
  title?: string;
  /**@title Tag Blog */
  showTag?: boolean;
  /**@title Conteúdo Blog */
  posts?: BlogPost[];
  /**@title Seção Aside está visível? */
  disableAside?: boolean;
  /**@title Blog layout */
  layout?: Layout;
}

function BlogPostCard({
  post,
  link,
  showTag,
  layout,
}: {
  post: BlogPost;
  link: string;
  showTag: boolean;
  layout?: Layout;
}) {
  return (
    <div class="n1-blog__content-subitem py-[30px] px-[20px] rounded-[10px]">
      <div class="n1-blog relative">
        {Boolean(post.categories?.length) && showTag && (
          <div
            class={clx(
              "font-noto-sans left-3 top-3 absolute w-fit py-[6px] px-[14px] rounded-[30px]",
              "text-[#0C1F59] bg-[#3CCBDA] font-semibold text-14",
            )}
          >
            {post.categories[0].name}
          </div>
        )}
        <div>
          {post.image && (
            <img
              class="rounded-[10px] mb-[30px]"
              src={post.image}
              width={340}
              height={297}
              loading="lazy"
              alt={post.title}
            />
          )}

          {post.title && (
            <div class="n1-moreContentBlog__title mb-[10px]">
              <a href={link}>
                {post.title && (
                  <div class="max-h-[52px] mobile:max-h-[44px] overflow-hidden">
                    <h2
                      class={clx(
                        "text-24 mobile:text-20 n1-blog__title font-archimoto-medium font-black",
                        "line-clamp-2",
                      )}
                    >
                      {post.title}
                    </h2>
                  </div>
                )}
              </a>
            </div>
          )}

          {post.content && (
            <div class="n1-moreContentBlog__description">
              <BlogDescription description={post.content} clamp={3} />
            </div>
          )}

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
  );
}

function BlogPostGrid({
  posts,
  disableAside,
  showTag,
  layout,
}: {
  posts?: BlogPost[];
  disableAside?: boolean;
  showTag: boolean;
  layout?: Layout;
}) {
  return (
    <div
      class={clx(
        "mobile:flex mobile:gap-[30px] mobile:flex-col md:gap-[30px]",
        disableAside
          ? "flex flex-wrap md:max-w-[1440px]"
          : "md:grid md:grid-cols-[repeat(2,380px)] md:max-w-[790px]",
      )}
    >
      {posts?.map((post, index) => {
        const link = `/nosso-blog/post?slug=${post.slug}`;
        const key = `${post.slug}-${index}`;
        return (
          <div
            key={key}
            class={clx(
              "n1-blog__content-item rounded-[10px]",
              "bg-[linear-gradient(181.01deg,_#FFFFFF_-176.1%,_rgba(255,_255,_255,_0.29)_-85.87%,_rgba(255,_255,_255,_0)_124.35%)]",
              disableAside
                ? "w-[calc(25%_-_30px)] min-w-[270px]"
                : "my-0 mx-auto",
            )}
          >
            <BlogPostCard
              post={post}
              link={link}
              showTag={showTag}
              layout={layout}
            />
          </div>
        );
      })}
    </div>
  );
}

function MoreContentBlog({
  title,
  posts,
  disableAside,
  layout,
  showTag = true,
}: Props) {
  return (
    <section
      class={clx(
        "n1-moreContentBlog px-[20px] n1-blog md:n1-container",
        "md:px-[120px] mb-[60px] mt-[40px] md:my-0 md:mb-[60px]",
        "md:mx-auto text-[#ffffff]",
      )}
    >
      <div>
        <h2 class="md:text-[32px] md:leading-[38.4px] text-24 font-archimoto-medium font-black mb-[30px]">
          {title || "Mais conteúdos"}
        </h2>

        <BlogPostGrid
          posts={posts}
          disableAside={disableAside}
          showTag={showTag}
          layout={layout}
        />
      </div>
    </section>
  );
}

export function LoadingFallback() {
  return <></>;
}
export default MoreContentBlog;
