import { clx } from "$store/sdk/clx.ts";

export interface AsideSearch {
  /**
   * @title Nome do campo Pesquisa
   * @format html
   */
  titleSearch?: string;
  maskSearch?: string;
}

export interface Props {
  search?: AsideSearch;
}

function BlogAsideSearch({ search }: Props) {

  const handleSearch = (event:KeyboardEvent) => {
    if (event.key === "Enter") {
      const val = (event.currentTarget as HTMLInputElement).value;
      location.href = `/nosso-blog?slug=${val}`;
    }
    
  } 

  return (
    <>
      <div
        class={clx(`flex flex-col gap-y-[20px]`)}
      >
        {search?.titleSearch && (
          <div
            name="search"
            htmlFor="search"
            class={clx(
              `[&_*]:text-24 [&_*]:font-archimoto-medium [&_*]:font-black`,
            )}
            dangerouslySetInnerHTML={{ __html: search.titleSearch }}
          >
          </div>
        )}
        {search?.maskSearch && (
          <input
            id="search"
            type="text"
            placeholder={search.maskSearch}
            onKeyPress={handleSearch}
            class={clx(
              `rounded-[100px] py-[14px] px-[20px] max-h-[48px] bg-[#ffffff]
                            font-normal text-primary text-[14px] leading-[18.2px] font-noto-sans outline-none`,
            )}
          />
        )}
      </div>
    </>
  );
}

export default BlogAsideSearch;