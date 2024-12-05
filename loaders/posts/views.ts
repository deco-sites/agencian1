import { type AppContext } from "site/apps/deco/records.ts";
import { postViews } from "site/db/schema.ts";
import { desc } from "drizzle-orm";

export interface Props {
  top: number;
}

export type TopViewedPost = {
  postSlug: string;
};

async function loader(
  { top }: Props,
  _req: Request,
  { invoke }: AppContext,
): Promise<{ topViewedPosts: TopViewedPost[] }> {
  const drizzle = await invoke.records.loaders.drizzle();
  const viewsData = await drizzle
    .select({
      postSlug: postViews.postSlug,
    }).from(postViews).orderBy(desc(postViews.views)).limit(top);

  return { topViewedPosts: viewsData };
}

export default loader;
