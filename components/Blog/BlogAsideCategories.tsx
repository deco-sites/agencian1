import { clx } from "$store/sdk/clx.ts";
import { AppContext } from "apps/blog/mod.ts";
import { Category } from "apps/blog/types.ts";
import { getRecordsByPath } from "apps/blog/utils/records.ts";

export interface ArrayCategory {
  category?: string;
  count?: string;
  slug?: string;
}

export interface AsideCategories {
  /**
   * @title Nome do campo Categorias
   * @format html
   */
  title?: string;
  arrayCategories?: ArrayCategory[];
}

export interface Props {
  categories?: AsideCategories;
}

function BlogAsideCategories({ categories }: Props) {
  return (
    <>
      <div class={clx(`flex flex-col gap-y-[20px]`)}>
        {categories?.title && (
          <div
            class={clx(
              `text-24 font-archimoto-medium font-black`
            )}
            dangerouslySetInnerHTML={{ __html: categories.title }}
          ></div>
        )}
        {categories?.arrayCategories &&
          categories?.arrayCategories.length > 0 && (
            <ul class={clx(`flex flex-col gap-y-[10px]`)}>
              {categories?.arrayCategories.map((category) => {
                return (
                  <>
                    {category && (
                      <a href={`/nosso-blog?categories=${category?.slug}`}>
                        <li
                          class={clx(`
                                                rounded-[30px] bg-[rgba(255,_255,_255,_0.10)] flex pl-[20px] 
                                                pr-[8px] py-[8px] justify-between items-center font-noto-sans`)}
                        >
                          {category.category}

                          {category?.count && (
                            <span
                              class={clx(`
                                                        text-[#585858] text-14 leading-[22.4px] flex p-[7px] flex-col md:size-[36px]
                                                        justify-center items-center rounded-[30px] bg-secondary font-noto-sans `)}
                            >
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
    </>
  );
}

export default BlogAsideCategories;

export const loader = async (props: Props, _: Request, ctx: AppContext) => {
  // const categories = await ctx.invoke.blog.loaders.Category();
  // console.log("ddd", categories);

  // const COLLECTION_PATH = "collections/blog/posts";
  // const ACCESSOR = "post";
  const COLLECTION_PATH = "collections/blog/categories";
  const ACCESSOR = "category";

  const categories = await getRecordsByPath<Category>(
    ctx,
    COLLECTION_PATH,
    ACCESSOR
  );

  const arrayCategories: ArrayCategory[] = categories
    .filter((n) => n !== undefined)
    .map(({ name, slug }) => {
      return {
        category: name,
        count: "1",
        slug,
      };
    });

  return {
    ...props,
    categories: {
      ...props.categories,
      arrayCategories,
    },
  };
};
