import { type Section } from "@deco/deco/blocks";
import { type SectionProps } from "@deco/deco";
import { type AppContext } from "site/apps/site.ts";
import { type SocialMedia } from "site/components/Blog/PostShare.tsx";
import { type Category } from "site/components/Blog/SidebarCategories.tsx";
import { type Tag } from "site/components/Blog/SidebarTags.tsx";
import { type TopViewedPost } from "site/loaders/posts/views.ts";
import { type BlogPost } from "apps/blog/types.ts";
import {
  fetchPosts,
  getMostReadPosts,
  getUniqueCategories,
  getUniqueTags,
  handlePosts,
  type SortBy,
} from "site/sdk/posts.ts";
import { detectDevice } from "site/sdk/deviceDetection.ts";
import { populateSidebar } from "site/sdk/blogSidebar.tsx";
import PostLoadMoreButton from "site/islands/Blog/PostLoadMoreButton.tsx";
import PostList from "site/components/Blog/PostList.tsx";
import PostContainer from "site/components/Blog/PostContainer.tsx";
import MostReadPostsList from "site/components/Blog/MostReadPostsList.tsx";
import PostListSEO from "site/components/Blog/SEO/PostListSEO.tsx";

interface BlogPosts {
  /**
   * @ignore
   */
  posts: BlogPost[];
  /**
   * @ignore
   */
  categories: Category[];
  /**
   * @ignore
   */
  mostReadPosts?: BlogPost[];
  /**
   * @ignore
   */
  searchQuery?: string;
  /**
   * @ignore
   */
  baseUrl?: string;
  /**
   * @ignore
   */
  isMobile?: boolean;
  /**
   * @ignore
   */
  tags: Tag[];
  /**
   * @title Número de posts por página
   * @description Padrão: 5
   */
  postsPerPage?: number;
  /**
   * @title Redes sociais
   */
  socialMedia?: SocialMedia[];
  /**
   * @title Sidebar
   */
  sidebar?: Section[];
  /**
   * @title Texto do botão "Ver mais"
   */
  buttonLoadMoreText?: string;
  /**
   * @title Título da lista de posts mais acessados
   */
  mostReadPostsTitle?: string;
  /**
   * @title Quantidade de posts mais acessados
   * @description Padrão: 4
   */
  mostReadPostsLimit?: number;
}

export default function BlogPosts({
  posts,
  categories,
  tags,
  socialMedia,
  sidebar,
  hasMorePosts,
  buttonLoadMoreText,
  mostReadPostsTitle,
  mostReadPosts,
  postsPerPage = 5,
  searchQuery,
  baseUrl,
  isMobile,
}: SectionProps<typeof loader>) {
  const Sidebar = populateSidebar(sidebar, categories, tags);

  return (
    <>
      <div class="flex flex-col max-w-[1440px] mx-auto">
        <PostContainer>
          <PostList
            posts={posts}
            socialMedia={socialMedia}
            searchQuery={searchQuery}
          />
          {!isMobile && Sidebar}
        </PostContainer>
        {hasMorePosts && (
          <PostContainer>
            <PostLoadMoreButton
              buttonText={buttonLoadMoreText}
              postsPerPage={postsPerPage}
              socialMedia={socialMedia}
            />
          </PostContainer>
        )}
        <PostContainer>
          <MostReadPostsList
            title={mostReadPostsTitle}
            posts={mostReadPosts}
          />
        </PostContainer>
        {isMobile && Sidebar}
      </div>
      <PostListSEO posts={[...posts, ...mostReadPosts]} baseUrl={baseUrl} />
    </>
  );
}

export async function loader(
  props: BlogPosts,
  req: Request,
  ctx: AppContext,
) {
  const url = new URL(req.url);
  const urlParams = new URLSearchParams(url.search);
  const page = urlParams.get("page") ?? 1;
  const sort = urlParams.get("sort") ?? "date_desc";
  const search = urlParams.get("search") ?? "";
  const tag = urlParams.get("tag") ?? "";
  const category = urlParams.get("category") ?? "";

  const posts = await fetchPosts(ctx);

  const filteredPosts = handlePosts(posts, sort as SortBy, {
    page: Number(page),
    postsPerPage: props.postsPerPage,
    keyword: search,
    tag,
    category,
  });
  const categories = getUniqueCategories(posts);
  const tags = getUniqueTags(posts);

  const { topViewedPosts } = await ctx.invoke.site.loaders.posts.views({
    top: 4,
  }) as { topViewedPosts: TopViewedPost[] };

  const mostReadSlugs = topViewedPosts.map(({ postSlug }) =>
    postSlug
  ) as string[];
  const mostReadPosts = getMostReadPosts(
    posts,
    mostReadSlugs,
    props.mostReadPostsLimit ?? 4,
  );

  const { isMobile } = detectDevice(req.headers.get("user-agent") ?? "");

  return {
    ...props,
    posts: filteredPosts.posts,
    hasMorePosts: filteredPosts.hasMorePosts,
    total: filteredPosts.total,
    categories,
    tags,
    mostReadPosts,
    searchQuery: search,
    baseUrl: url.origin,
    isMobile,
  };
}
