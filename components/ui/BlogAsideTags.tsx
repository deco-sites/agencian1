import { clx } from "$store/sdk/clx.ts";

interface AsideTags {
  title?: string;
  nameTag?: string[];
}

interface Props {
  tag?: AsideTags;
}

function BlogAsideTags({ tag }: Props) {
  return (
    <>
      <div
        class={clx(`flex flex-col gap-y-[20px]`)}
      >
        {tag?.title && (
          <div
            class={clx(`
                        [&_*]:text-24 [&_*]:font-archimoto-medium [&_*]:font-black`)}
            dangerouslySetInnerHTML={{ __html: tag.title }}
          >
          </div>
        )}

        {tag?.nameTag && tag.nameTag.length > 0 && (
          <ul
            class={clx(`flex flex-wrap gap-[10px]`)}
          >
            {tag.nameTag.map((tag) => {
              return (
                <>
                  <li class={clx(`inline-flex`)}>
                    <span
                      class={clx(`
                                                flex px-[14px] py-[8px] items-center rounded-[30px] border border-[#ffffff]
                                                text-[14px] leading-[22.4px] font-noto-sans`)}
                    >
                      {tag}
                    </span>
                  </li>
                </>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default BlogAsideTags;
