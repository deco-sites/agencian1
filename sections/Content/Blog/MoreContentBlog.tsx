import { clx } from "$store/sdk/clx.ts";
import BlogTitle from "$store/components/Blog/BlogTitle.tsx";
import BlogImage from "$store/components/Blog/BlogImage.tsx";
import BlogDescription from "$store/components/Blog/BlogDescription.tsx";
import { BlogPost } from "apps/blog/types.ts";
import { Button } from "$store/sections/Content/Blog/DetailPost.tsx";

export interface Layout {
  /**@title Botão do Blog */
  button?: Button;
}

interface Props {
  /**
   * @title Título
   * @format html
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

function MoreContentBlog({ title, posts, disableAside, layout, showTag = true }: Props) {
  return (
    <>
      <section
        class={clx(
          `n1-moreContentBlog px-[20px] n1-blog md:n1-container md:px-[120px] mb-[60px] mt-[40px] md:my-0 md:mb-[60px] md:mx-auto text-[#ffffff]`
        )}
      >
        <div>
          {title && (
            <div
              class={clx(`
                                md:[&_*]:text-[32px] md:[&_*]:leading-[38.4px] [&_*]:text-24
                                [&_*]:font-archimoto-medium [&_*]:font-black mb-[30px]`)}
              dangerouslySetInnerHTML={{ __html: title }}
            ></div>
          )}

          <div
            class={clx(`mobile:flex mobile:gap-[30px] mobile:flex-col md:gap-[30px] ${
                              disableAside
                                ? "flex flex-wrap md:max-w-[1440px]"
                                : "md:grid md:grid-cols-2-auto md:max-w-[790px]"
                            }
                        `)}
          >
            {posts &&
              posts.length > 0 &&
              posts.map((post) => {
                return (
                  <>
                    <div
                      class={clx(`
                                                n1-blog__content-item 
                                                ${
                                                  disableAside
                                                    ? "w-[calc(25%_-_30px)] min-w-[270px]"
                                                    : "my-0 mx-auto"
                                                }
                                            `)}
                    >
                      <div
                        class={`n1-blog__content-subitem py-[30px] px-[20px] rounded-[10px] `}
                      >
                        <div class={`n1-blog relative`}>
                          {
                            (post?.categories?.length > 0 && showTag) && (
                              <div class="left-3 top-3 absolute w-fit font-semibold text-14 text-[#0C1F59] py-[6px] px-[14px] rounded-[30px] bg-[#3CCBDA]">{post?.categories?.[0]?.name}</div>
                            )
                          }
                          <div >
                            {/* {post.image && <BlogImage imageBlog={post.image} />} */}

                            {post.image && (
                              <img
                                class="rounded-[10px] mb-[30px]"
                                src={post.image}
                                width={340}
                                height={297}
                                loading={"lazy"}
                              />
                            )}

                            {post?.title && (
                              <div class={clx(`n1-moreContentBlog__title mb-[10px]`)}>
                                {/* <BlogTitle
                                  title={post?.title}
                                  fontSizeDesk={`md:[&_*]:text-24`}
                                  fontSizeMobile={`[&_*]:text-16`}
                                /> */}
                                <a href={`/nosso-blog/post?slug=${post?.slug}`}>
                                  {title && (
                                    <div
                                      class={clx(`text-24 n1-blog__title font-archimoto-medium font-black`)}
                                      dangerouslySetInnerHTML={{
                                        __html: title,
                                      }}
                                    ></div>
                                  )}
                                </a>
                              </div>
                            )}

                            {post?.content && (
                              <div
                                class={clx(`n1-moreContentBlog__description`)}
                              >
                                <BlogDescription
                                  description={post?.content}
                                  fontSizeDesk={`md:[&_*]:text-16 md:[&_*]:leading-[25.6px]`}
                                  fontSizeMobile={`[&_*]:text-16 [&_*]:leading-[25.6px]`}
                                />
                              </div>
                            )}

                            {layout?.button?.text && (
                              <a
                                href={`/nosso-blog/post?slug=${post?.slug}`}
                                class={clx(`w-fit mt-[30px] py-[15px] px-[20px] rounded-[100px] hover:bg-[#ffffff] hover:text-[#585858] border border-[#ffffff] flex items-center
                             text-[14px] leading-[14px] font-archimoto-medium font-black max-h-[40px]`)}
                              >
                                {layout?.button.text}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}

export default MoreContentBlog;
