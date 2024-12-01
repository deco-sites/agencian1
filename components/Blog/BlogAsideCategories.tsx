import { clx } from "site/sdk/clx.ts";
import { type AppContext } from "apps/blog/mod.ts";
import { type Category as CategoryRecord } from "apps/blog/types.ts";
import { getRecordsByPath } from "apps/blog/utils/records.ts";

export interface AsideCategories {
  /**
   * @title Título da seção
   */
  title?: string;
}

interface Category {
  name?: string;
  count?: string;
  slug?: string;
}

interface Props extends AsideCategories {
  categories: Category[];
}

function BlogAsideCategories({ title, categories }: Props) {
  if (!categories.length) return null;
  return (
    <div class={clx(`flex flex-col gap-y-[20px]`)}>
      <h2 class="text-24 font-archimoto-medium font-black">
        {title || "Categorias"}
      </h2>
      {Boolean(categories?.length) && (
        <ul class={clx(`flex flex-col gap-y-[10px]`)}>
          {categories?.map((category) => {
            return (
              <>
                {category.name && (
                  <a href={`/nosso-blog?categories=${category?.slug}`}>
                    <li class="rounded-[30px] bg-[rgba(255,_255,_255,_0.10)] flex pl-[20px] pr-[8px] py-[8px] justify-between items-center font-noto-sans">
                      <span class="text-14">
                        {category.name}
                      </span>
                      {category?.count && (
                        <span class="text-[#585858] text-14 leading-[22.4px] flex p-[7px] flex-col size-[30px] md:size-[36px] justify-center items-center rounded-[30px] bg-secondary font-noto-sans">
                          {category.count}
                        </span>
                      )}
                    </li>
                  </a>
                )}
              </>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export const loader = async (
  props: AsideCategories,
  _: Request,
  ctx: AppContext,
) => {
  const COLLECTION_PATH = "collections/blog/categories";
  const ACCESSOR = "category";

  const categories = await getRecordsByPath<CategoryRecord>(
    ctx,
    COLLECTION_PATH,
    ACCESSOR,
  );

  const categoryCounts = categories.reduce((acc, curr) => {
    if (!curr) return acc;
    const { slug } = curr;
    acc[slug] = (acc[slug] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filteredCategories: Category[] = categories
    .filter((n): n is CategoryRecord => n !== undefined)
    .reduce((acc, { name, slug }) => {
      if (!acc.find((c) => c.slug === slug)) {
        acc.push({
          name,
          count: String(categoryCounts[slug]),
          slug,
        });
      }
      return acc;
    }, [] as Category[]);

  return {
    ...props,
    categories: filteredCategories,
  };
};

export function LoadingFallback() {
  return <></>;
}

export default BlogAsideCategories;
