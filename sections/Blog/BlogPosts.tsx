import { type Section } from "@deco/deco/blocks";
import { type SectionProps } from "@deco/deco";
import { type AppContext } from "apps/blog/mod.ts";
import { type BlogPost } from "apps/blog/types.ts";
import { type SocialMedia } from "site/components/Blog/PostShare.tsx";
import { type Category } from "site/components/Blog/SidebarCategories.tsx";
import { type Tag } from "site/components/Blog/SidebarTags.tsx";
import {
  fetchPosts,
  getUniqueCategories,
  getUniqueTags,
  mapPostPreviews,
  type SortBy,
} from "site/sdk/posts.ts";
import PostList from "site/components/Blog/PostList.tsx";
import handlePosts from "site/sdk/posts.ts";
import PostContainer from "site/components/Blog/PostContainer.tsx";
import PostLoadMoreButton from "site/components/Blog/PostLoadMoreButton.tsx";

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
}

export default function BlogPosts({
  posts,
  categories,
  tags,
  socialMedia,
  sidebar,
  hasMorePosts,
  buttonLoadMoreText = "Ver mais notícias",
}: SectionProps<typeof loader>) {
  const Sidebar = populateSidebar(sidebar, categories, tags);

  return (
    <div class="max-w-[1440px] mx-auto">
      <PostContainer>
        <PostList posts={posts} socialMedia={socialMedia} />
        {Sidebar}
      </PostContainer>
      {hasMorePosts && (
        <PostContainer>
          <PostLoadMoreButton buttonText={buttonLoadMoreText} />
        </PostContainer>
      )}
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
  const sort: SortBy = urlParams.get("sort") ?? "date_desc";
  const search = urlParams.get("search") ?? "";
  const tag = urlParams.get("tag") ?? "";
  const category = urlParams.get("category") ?? "";

  const posts = await fetchPosts(ctx);

  const filteredPosts = handlePosts(posts, sort, {
    page: Number(page),
    postsPerPage: props.postsPerPage,
    keyword: search,
    tag,
    category,
  });
  const mappedPosts = mapPostPreviews(filteredPosts.posts);
  const categories = getUniqueCategories(posts);
  const tags = getUniqueTags(posts);

  return {
    ...props,
    posts: mappedPosts,
    hasMorePosts: filteredPosts.hasMorePosts,
    total: filteredPosts.total,
    categories,
    tags,
  };
}

function populateSidebar(
  sidebar?: Section[],
  categories?: Category[],
  tags?: Tag[],
) {
  const [SidebarSection] = sidebar ?? [];
  if (!SidebarSection) return null;

  checkComponent(SidebarSection);

  const { Component } = SidebarSection;
  const props = buildSidebarProps(SidebarSection, categories, tags);

  return <Component {...props} />;
}

function buildSidebarProps(
  SidebarSection: Section,
  categories?: Category[],
  tags?: Tag[],
) {
  const isLazy = "section" in SidebarSection.props;

  if (isLazy) {
    return {
      ...SidebarSection.props,
      section: {
        ...SidebarSection.props.section,
        props: {
          ...SidebarSection.props.section.props,
          categories: {
            ...SidebarSection.props.section.props.categories,
            categories,
          },
          tags: {
            ...SidebarSection.props.section.props.tags,
            tags,
          },
        },
      },
    };
  }

  return {
    ...SidebarSection.props,
    categories: {
      ...SidebarSection.props.categories,
      categories,
    },
    tags: {
      ...SidebarSection.props.tags,
      tags,
    },
  };
}

function checkComponent(section: Section) {
  const expectedPath = "site/sections/Blog/BlogSidebar.tsx";
  const normalPath = section.metadata?.component;
  const lazyPath = section.props?.section?.metadata?.component;

  if (normalPath !== expectedPath && lazyPath !== expectedPath) {
    throw new Error(
      `Expected component to be ${expectedPath} but got ${
        lazyPath ?? normalPath
      }`,
    );
  }
}
