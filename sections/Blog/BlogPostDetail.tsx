import { type Section } from "@deco/deco/blocks";
import { type SectionProps } from "@deco/deco";
import { type BlogPost } from "apps/blog/types.ts";
import { type AppContext } from "apps/blog/mod.ts";
import { type SocialMedia } from "site/components/Blog/PostShare.tsx";
import { type Category } from "site/components/Blog/SidebarCategories.tsx";
import { type Tag } from "site/components/Blog/SidebarTags.tsx";
import {
  fetchPosts,
  getUniqueCategories,
  getUniqueTags,
  mapMostReadPosts,
  type PreviewPost,
} from "site/sdk/posts.ts";
import { populateSidebar } from "site/sdk/blogSidebar.tsx";
import PostDetails from "site/components/Blog/PostDetails.tsx";
import PostContainer from "site/components/Blog/PostContainer.tsx";
import MostReadPostsList from "site/components/Blog/MostReadPostsList.tsx";

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
  mostReadPosts?: PreviewPost[];
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
}

export default function BlogPostDetail({
  post,
  categories,
  tags,
  socialMedia,
  sidebar,
  mostReadPostsTitle,
  mostReadPosts,
}: SectionProps<typeof loader>) {
  const Sidebar = populateSidebar(sidebar, categories, tags);

  return (
    <div class="flex flex-col max-w-[1440px] mx-auto">
      <PostContainer>
        <PostDetails post={post} socialMedia={socialMedia} />
        {Sidebar}
      </PostContainer>
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
  props: BlogPostDetail,
  req: Request,
  ctx: AppContext,
) {
  const url = new URL(req.url);
  const urlParams = new URLSearchParams(url.search);
  const slug = urlParams.get("slug") ?? "";

  const posts = await fetchPosts(ctx);
  const post = posts.find((post) => post.slug === slug);

  const mostReadPosts = mapMostReadPosts(posts);
  const categories = getUniqueCategories(posts);
  const tags = getUniqueTags(posts);

  return {
    ...props,
    post,
    categories,
    tags,
    mostReadPosts,
  };
}
