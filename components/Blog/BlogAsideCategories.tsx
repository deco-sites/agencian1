import { clx } from "$store/sdk/clx.ts";

interface ArrayCategory {
  category?: string;
  count?: string;
}

interface AsideCategories {
  title?: string;
  arrayCategories?: ArrayCategory[];
}

interface Props {
  categories?: AsideCategories;
}

function BlogAsideCategories({ categories }: Props) {
  return (
    <>
      <div
        class={clx(`flex flex-col gap-y-[20px]`)}
      >
        {categories?.title && (
          <div
            class={clx(
              `[&_*]:text-24 [&_*]:font-archimoto-medium [&_*]:font-black`,
            )}
            dangerouslySetInnerHTML={{ __html: categories.title }}
          >
          </div>
        )}
        {categories?.arrayCategories &&
          categories?.arrayCategories.length > 0 && (
          <ul
            class={clx(`flex flex-col gap-y-[10px]`)}
          >
            {categories?.arrayCategories.map((category) => {
              return (
                <>
                  {category && (
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