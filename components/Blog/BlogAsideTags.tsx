import { clx } from "site/sdk/clx.ts";

export interface Tag {
  /**
   * @title Nome da tag
   */
  name?: string;
  /**
   * @title Link da tag
   */
  link?: string;
}

export interface Props {
  /**
   * @title Título da seção
   */
  title?: string;
  /**
   * @title Tags
   */
  tags?: Tag[];
}

function BlogAsideTags({ title, tags }: Props) {
  return (
    <>
      <div class="flex flex-col gap-y-[20px]">
        <div class="text-24 font-archimoto-medium font-black">
          {title || "Tags"}
        </div>

        {tags?.length && (
          <ul class="flex flex-wrap gap-[10px]">
            {tags.map((tag) => {
              return (
                <li class="inline-flex">
                  <a
                    href={tag.link}
                    class={clx(
                      "flex px-[14px] text-center rounded-[30px] border border-[#ffffff]",
                      "text-14 hover:bg-[#ffffff] hover:text-[#585858]  leading-[38px]",
                      "font-noto-sans duration-300",
                    )}
                  >
                    {tag.name}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export function LoadingFallback() {
  return <></>;
}

export default BlogAsideTags;
