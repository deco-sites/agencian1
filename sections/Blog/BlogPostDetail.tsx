import { type AppContext } from "site/apps/site.ts";
import { type Section } from "@deco/deco/blocks";
import { type SectionProps } from "@deco/deco";
import { type BlogPost } from "apps/blog/types.ts";
import { type SocialMedia } from "site/components/Blog/PostShare.tsx";
import { type Category } from "site/components/Blog/SidebarCategories.tsx";
import { type Tag } from "site/components/Blog/SidebarTags.tsx";
import {
  fetchPosts,
  getMostReadPosts,
  getUniqueCategories,
  getUniqueTags,
} from "site/sdk/posts.ts";
import { detectDevice } from "site/sdk/deviceDetection.ts";
import { populateSidebar } from "site/sdk/blogSidebar.tsx";
import PostDetails from "site/components/Blog/PostDetails.tsx";
import PostContainer from "site/components/Blog/PostContainer.tsx";
import MostReadPostsList from "site/components/Blog/MostReadPostsList.tsx";
import PostDetailsSEO from "site/components/Blog/SEO/PostDetailsSEO.tsx";

interface BlogPostDetail {
  /**
   * @ignore
   */
  post: BlogPost;
  /**
   * @ignore
   */
  categories: Category[];
  /**
   * @ignore
   */
  tags: Tag[];
  /**
   * @ignore
   */
  mostReadPosts?: BlogPost[];
  /**
   * @ignore
   */
  baseUrl?: string;
  /**
   * @ignore
   */
  isMobile?: boolean;
  /**
   * @title Redes sociais
   */
  socialMedia?: SocialMedia[];
  /**
   * @title Sidebar
   */
  sidebar?: Section[];
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

export default function BlogPostDetail({
  post,
  categories,
  tags,
  socialMedia,
  sidebar,
  mostReadPostsTitle,
  mostReadPosts,
  baseUrl,
  isMobile,
}: SectionProps<typeof loader>) {
  const Sidebar = populateSidebar(sidebar, categories, tags);

  return (
    <>
      <div class="flex flex-col max-w-[1440px] mx-auto">
        <PostContainer>
          <PostDetails
            post={post}
            socialMedia={socialMedia}
          />
          {!isMobile && Sidebar}
        </PostContainer>
        <PostContainer>
          <MostReadPostsList
            title={mostReadPostsTitle}
            posts={mostReadPosts}
          />
        </PostContainer>
        {isMobile && Sidebar}
      </div>
      <PostDetailsSEO
        post={post}
        mostReadPosts={mostReadPosts}
        baseUrl={baseUrl}
      />
    </>
  );
}

export async function loader(
  props: BlogPostDetail,
  req: Request,
  ctx: AppContext,
) {
  const url = new URL(req.url);
  const slug = url.pathname.split("/blog/")[1] ?? "";

  const posts = await fetchPosts(ctx);
  const post = posts.find((post) => post.slug === slug);

  const categories = getUniqueCategories(posts);
  const tags = getUniqueTags(posts);

  if (post) {
    await ctx.invoke("site/actions/blog/countView.ts", { postSlug: slug });
  }

  const { topViewedPosts } = await ctx.invoke.site.loaders.posts.views({
    top: 4,
  });

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
    post,
    categories,
    tags,
    mostReadPosts,
    baseUrl: url.origin,
    isMobile,
  };
}
