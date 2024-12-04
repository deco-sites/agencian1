import { type Section } from "@deco/deco/blocks";
import { clx } from "site/sdk/clx.ts";
import { BlogPost } from "apps/blog/types.ts";
// import { Layout, Pagination } from "site/sections/Blog/MainPost.tsx";
import { useState } from "preact/hooks";
import BlogPosting from "site/components/Blog/BlogPosting.tsx";

type Layout = unknown;
type Pagination = unknown;

interface Props {
  posts: BlogPost[];
  pagination?: Pagination;
  asideContent?: Section[];
  layout?: Layout;
}

function BlogContentPartial({
  posts: postsInitial,
  asideContent,
  pagination,
  layout,
}: Props) {
  const [posts, setPosts] = useState(
    slicePosts(postsInitial, pagination?.page ?? 1, pagination?.count ?? 12),
  );
  const [page, setPage] = useState(pagination?.page ?? 1);
  const [postsPerPage] = useState(pagination?.count ?? 12);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  function slicePosts(posts: BlogPost[], page: number, postsPerPage: number) {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
  }

  function loadMorePosts() {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newPage = page + 1;
      const slicedPosts = slicePosts(postsInitial, newPage, postsPerPage);

      if (slicedPosts?.length > 0) {
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
  }

  function renderEmptyState() {
    return (
      <div
        class={clx(
          "n1-blog__content-item",
          !asideContent?.length ? "my-0 mx-auto" : "",
          "md:max-w-[790px]",
        )}
      >
        <div class="n1-blog__content-subitem py-[30px] px-[20px] rounded-[10px]">
          <div class="n1-blog">
            <div>
              <h1 class="w-[300px] md:w-[790px]">Nenhuma postagem</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderLoadMoreButton() {
    return (
      <button
        class={clx(
          "w-fit m-auto bg-accent hover:bg-[#F8BC33] rounded-[100px]",
          "h-[50px] mobile:h-[40px] mt-[10px] px-[30px] mobile:px-[20px] pt-[2px]",
          "flex items-center justify-center duration-300",
          loading && "opacity-50 cursor-not-allowed",
        )}
        onClick={loadMorePosts}
      >
        <span
          class={clx(
            "font-archimoto-medium font-black textarea-md mobile:textarea-sm text-center",
            "text-16 mobile:text-14 text-[#0C1F59] leading-none",
          )}
        >
          Ver mais notícias
        </span>
      </button>
    );
  }

  return (
    <div class={clx("n1-blog__content flex flex-col gap-y-[30px]")}>
      {posts?.length > 0
        ? (
          posts.map((post: BlogPost) => {
            if (!post?.title) return null;
            return (
              <BlogPosting
                post={post}
                asideContent={asideContent}
                layout={layout}
              />
            );
          })
        )
        : (
          renderEmptyState()
        )}

      {hasMore && !loading && renderLoadMoreButton()}
      {loading && <p>Carregando...</p>}
    </div>
  );
}

export default BlogContentPartial;
