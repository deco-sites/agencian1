import type AppContext from "site/apps/deco/records.ts";
import { postViews } from "site/db/schema.ts";
import { eq } from "drizzle-orm";

export interface Props {
  postSlug: string;
}

/**
 * @title Count View
 * @description Counts the number of views for a post
 */
const action = async (
  { postSlug }: Props,
  _req: Request,
  { invoke }: AppContext,
): Promise<void> => {
  const drizzle = await invoke.records.loaders.drizzle();

  const existing = await drizzle.select()
    .from(postViews)
    .where(eq(postViews.postSlug, postSlug))
    .get();

  if (existing) {
    await drizzle.update(postViews)
      .set({
        views: existing.views + 1,
        lastViewed: new Date().toISOString(),
      })
      .where(eq(postViews.postSlug, postSlug));
  } else {
    await drizzle.insert(postViews).values({
      postSlug,
      views: 1,
      lastViewed: new Date().toISOString(),
    });
  }
};

export default action;