import { clx } from "$store/sdk/clx.ts";
import { BlogPost } from "apps/blog/types.ts";
import { Layout, Pagination } from "$store/sections/Content/Blog/MainPost.tsx";
import BlogPosting from "$store/components/Blog/BlogPosting.tsx";
import { useState } from "preact/hooks";

export interface Props {
  posts: BlogPost[];
  pagination?: Pagination;
  asideContent?: unknown[];
  layout?: Layout;
}

export default function BlogContentPartial({
  posts: postsInitial,
  asideContent,
  pagination,
  layout,
}: Props) {
  const slicePosts = (
    posts: BlogPost[],
    page: number,
    postsPerPage: number,
  ) => {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
  };

  const [posts, setPosts] = useState(
    slicePosts(postsInitial, pagination?.page ?? 1, pagination?.count ?? 12),
  );
  const [page, setPage] = useState(pagination?.page ?? 1);
  const [postsPerPage, _] = useState(pagination?.count ?? 12);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // const checkForDuplicates = (
  //   newPosts: BlogPost[],
  //   existingPosts: BlogPost[],
  // ) => {
  //   const existingPostIds = new Set(existingPosts.map((post) => post.slug));
  //   for (const post of newPosts) {
  //     if (existingPostIds.has(post.slug)) {
  //       return true;
  //     }
  //   }

  //   return false;
  // };

  const loadMorePosts = () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newPage = page + 1;
      const slicedPosts = slicePosts(postsInitial, newPage, postsPerPage);
      //   console.log(checkForDuplicates(slicedPosts, posts));

      if (slicedPosts && slicedPosts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...slicedPosts]);
        setPage(newPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div class={clx(`n1-blog__content flex flex-col gap-y-[30px]`)}>
        {posts && posts.length > 0
          ? (
            posts.map((post: BlogPost) => {
              if (!post) return null;
              if (!post?.title) return null;
              return (
                <>
                  <BlogPosting
                    post={post}
                    asideContent={asideContent}
                    layout={layout}
                  />
                </>
              );
            })
          )
          : (
            <>
              <div
                class={`n1-blog__content-item ${
                  !(asideContent && asideContent?.length > 0)
                    ? "my-0 mx-auto"
                    : ""
                } md:max-w-[790px] `}
              >
                <div
                  class={`n1-blog__content-subitem py-[30px] px-[20px] rounded-[10px]`}
                >
                  <div class={`n1-blog`}>
                    <div>
                      <h1 class="w-[300px] md:w-[790px]">Sem Post</h1>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

        {hasMore && !loading && (
          <button
            // disabled={historico.value?.number == 0}
            class="w-fit  m-auto font-archimoto-medium font-black textarea-md text-center flex justify-center items-center rounded-[100px] bg-accent hover:bg-[#F8BC33]  px-[30px] py-[10px] text-[#0C1F59]"
            onClick={loadMorePosts}
          >
            Ver mais notícias
          </button>
        )}

        {/* Mensagem de carregamento */}
        {loading && <p>Carregando...</p>}
      </div>
    </>
  );
}
