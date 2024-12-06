import { type AppContext } from "site/apps/deco/blog.ts";
import {
  fetchPosts,
  handlePosts,
  mapPostPreviews,
  type PreviewPost,
  type SortBy,
} from "site/sdk/posts.ts";

export interface Props {
  page: number;
  postsPerPage: number;
  keyword: string;
  tag: string;
  category: string;
  sort: SortBy;
}

async function loader(
  { page, postsPerPage, keyword, tag, category, sort }: Props,
  _req: Request,
  ctx: AppContext,
): Promise<{ posts: PreviewPost[]; hasMorePosts: boolean }> {
  const posts = await fetchPosts(ctx);

  const filteredPosts = handlePosts(posts, sort as SortBy, {
    page: Number(page),
    postsPerPage,
    keyword,
    tag,
    category,
  });

  return {
    posts: mapPostPreviews(filteredPosts.posts),
    hasMorePosts: filteredPosts.hasMorePosts,
  };
}

export default loader;
