import { AppContext } from "apps/blog/mod.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Section, SectionProps } from "deco/mod.ts";
import { BlogPost } from "apps/blog/types.ts";
import { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import handlePosts, {
  SortBy,
} from "$store/components/Blog/utils/handlePosts.ts";
import { getRecordsByPath } from "apps/blog/utils/records.ts";
import BlogContent from "$store/components/Blog/BlogContent.tsx";

export interface AsideSearch {
  /**
   * @title Titulo de bloco busca
   * @format html
   */
  titleSearch?: string;
  /**@title Máscara do campo busca */
  maskSearch?: string;
}

export interface AsideNewsletter {
  /**
   * @title Titulo de bloco Email/News
   * @format html
   */
  titleNewsletter?: string;
  /**@title Máscara nome */
  maskNewsletterName?: string;
  /**@title Máscara e-mail */
  maskNewsletterEmail?: string;
  /**@title Texto do botão */
  textButton?: string;
}

/**@titleBy category*/
export interface ArrayCategory {
  /**@title Nome da categoria */
  category?: string;
  /**@title Quantidade categoria */
  count?: string;
}

export interface AsideCategories {
  /**
   * @title Titulo de bloco Categoria
   * @format html
   */
  title?: string;
  /**
   * @title Categoria
   * @description (max: 4)
   * @maxItems 4
   */
  arrayCategories?: ArrayCategory[];
}

export interface AsideTags {
  /**
   * @title Nome do campo Tag
   * @format html
   */
  title?: string;
  /**
   * @title Tag
   * @description (max: 9)
   * @maxItems 9
   */
  nameTag?: string[];
}

export interface Aside {
  /**@title Campo de Busca */
  search?: AsideSearch;
  /**@title Campo de Newsletter */
  newsletter?: AsideNewsletter;
  categories?: AsideCategories;
  tag?: AsideTags;
}

export interface Button {
  /**@title Texto do botão */
  text?: string;
  /**@title Link do botão */
  link?: string;
}

export interface ImageGeneric {
  /**@title Imagem */
  src?: ImageWidget;
  /**
   * @title Largura
   * @description (ex: 150, resultado é em pixel)
   */
  width?: number;
  /**
   * @title Altura
   * @description (ex: 150, resultado é em pixel)
   */
  height?: number;
}

/**@titleBy alt */
export interface SocialMedia {
  /**@title Nome da Mídia */
  alt?: string;
  /**@title Link da Mídia */
  link?: string;
  /**@title Desktop */
  desktop?: ImageGeneric;
  /**@title Mobile */
  mobile?: ImageGeneric;
}

export interface Layout {
  /**@title Botão do Blog */
  button?: Button;
  /**@title Botão de continue lendo? */
  btnContinue?: boolean;
  /**
   * @title Social Mídia
   * @description (ex: máximo de 6 itens)
   * @maxItems 6
   */
  socialMedia?: SocialMedia[];
}

export interface Pagination {
  /**
   * @title Category Slug
   * @description Filter by a specific category slug.
   */
  slug?: RequestURLParam;
  /**
   * @title Items per page
   * @description Number of posts per page to display.
   */
  count?: number;
  /**
   * @title Page query parameter
   * @description The current page number. Defaults to 1.
   */
  page?: number;
  /**
   * @title Page sorting parameter
   * @description The sorting option. Default is "date_desc"
   */
  sortBy?: SortBy;
}

export interface Props {
  posts?: BlogPost[];
  pagination?: Pagination;
  /**@title Ocultar seção Aside */
  asideCotent?: Section[];
  /**@title Blog layout */
  layout?: Layout;
}

const COLLECTION_PATH = "collections/blog/posts";
const ACCESSOR = "post";

export default function MainPost({
  posts,
  asideCotent,
  layout,
  pagination,
}: SectionProps<typeof loader>) {
  if (!posts) return <></>;

  return (
    <>
      <BlogContent
        posts={posts}
        asideCotent={asideCotent}
        pagination={pagination}
        layout={layout}
      />
    </>
  );
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const url = new URL(req.url);
  const params = url.searchParams;
  const postsPerPage = Number(
    props?.pagination?.count ?? params.get("count") ?? 12
  );
  const pageNumber = Number(props?.pagination?.page ?? params.get("page") ?? 1);
  const pageSort =
    props?.pagination?.sortBy ??
    (params.get("sortBy") as SortBy) ??
    "date_desc";
  const slug = props?.pagination?.slug ?? (params.get("slug") as SortBy) ?? "";
  const categories = (params.get("categories") as SortBy) ?? "";

  const posts = await getRecordsByPath<BlogPost>(
    ctx,
    COLLECTION_PATH,
    ACCESSOR
  );

  const handledPosts = handlePosts(posts, pageSort, slug, categories);

  return {
    ...props,
    pagination: {
      slug,
      count: postsPerPage,
      page: pageNumber,
      sortBy: pageSort,
    },
    posts: handledPosts,
  };
};
