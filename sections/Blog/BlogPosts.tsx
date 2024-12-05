import { type Section } from "@deco/deco/blocks";
import { type SectionProps } from "@deco/deco";
import { type AppContext } from "apps/blog/mod.ts";
import { type SocialMedia } from "site/components/Blog/PostShare.tsx";
import { type Category } from "site/components/Blog/SidebarCategories.tsx";
import { type Tag } from "site/components/Blog/SidebarTags.tsx";
import { type TopViewedPost } from "site/loaders/posts/views.ts";
import {
  fetchPosts,
  getMostReadPosts,
  getUniqueCategories,
  getUniqueTags,
  mapPostPreviews,
  type PreviewPost,
  type SortBy,
} from "site/sdk/posts.ts";
import { populateSidebar } from "site/sdk/blogSidebar.tsx";
import PostList from "site/components/Blog/PostList.tsx";
import handlePosts from "site/sdk/posts.ts";
import PostContainer from "site/components/Blog/PostContainer.tsx";
import PostLoadMoreButton from "site/components/Blog/PostLoadMoreButton.tsx";
import MostReadPostsList from "site/components/Blog/MostReadPostsList.tsx";

interface BlogPosts {
  /**
   * @ignore
   */
  posts: PreviewPost[];
  /**
   * @ignore
   */
  categories: Category[];
  /**
   * @ignore
   */
  mostReadPosts?: PreviewPost[];
  /**
   * @title Número de posts por página
   * @description Padrão: 5
   */
  postsPerPage?: number;
  /**
   * @ignore
   */
  tags: Tag[];
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
}: SectionProps<typeof loader>) {
  const Sidebar = populateSidebar(sidebar, categories, tags);

  return (
    <div class="flex flex-col max-w-[1440px] mx-auto">
      <PostContainer>
        <PostList posts={posts} socialMedia={socialMedia} />
        {Sidebar}
      </PostContainer>
      {hasMorePosts && (
        <PostContainer>
          <PostLoadMoreButton buttonText={buttonLoadMoreText} />
        </PostContainer>
      )}
      <PostContainer>
        <MostReadPostsList
          title={mostReadPostsTitle}
          posts={mostReadPosts}
        />
      </PostContainer>
    </div>
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
  const mappedPosts = mapPostPreviews(filteredPosts.posts);
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

  return {
    ...props,
    posts: mappedPosts,
    hasMorePosts: filteredPosts.hasMorePosts,
    total: filteredPosts.total,
    categories,
    tags,
    mostReadPosts,
  };
}
