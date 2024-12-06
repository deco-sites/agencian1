import { type AppContext } from "site/apps/site.ts";
import { fetchPosts } from "site/sdk/posts.ts";
import { handlePosts } from "site/sdk/posts.ts";

export interface Props {
  page: number;
  postsPerPage: number;
  keyword: string;
  tag: string;
  category: string;
}

async function loader(
  { page, postsPerPage, keyword, tag, category }: Props,
  _req: Request,
  ctx: AppContext,
): Promise<{ posts: Post[] }> {
  const posts = await fetchPosts(ctx);

  const filteredPosts = handlePosts(posts, sort as SortBy, {
    page: Number(page),
    postsPerPage,
    keyword,
    tag,
    category,
  });

  return { posts: filteredPosts };
}

export default loader;
