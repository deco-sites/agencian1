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
  try {
    const drizzle = await invoke.records.loaders.drizzle();

    if (!drizzle || typeof drizzle.select !== "function") {
      console.error(
        "Error fetching top viewed posts: drizzle.select is not a function",
      );
      return { topViewedPosts: [] };
    }

    const topViewedPosts = await drizzle
      .select({
        postSlug: postViews.postSlug,
      })
      .from(postViews)
      .orderBy(desc(postViews.views))
      .limit(top);

    return { topViewedPosts };
  } catch (error) {
    console.error("Error fetching top viewed posts:", error);
    return { topViewedPosts: [] };
  }
}

export default loader;
