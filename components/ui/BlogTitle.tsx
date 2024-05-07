import { clx } from "$store/sdk/clx.ts";

interface Props {
  title?: string;
  fontSizeDesk?: string;
  fontSizeMobile?: string;
}

function BlogTitle({ title, fontSizeDesk, fontSizeMobile }: Props) {
  return (
    <>
      {title && (
        <div
          class={clx(`
                        [&_*]:n1-blog__title
                        ${fontSizeMobile ? fontSizeMobile : "text-20"} 
                        ${fontSizeDesk ? fontSizeDesk : "text-32"} 
                        [&_*]:font-archimoto-medium [&_*]:font-black mb-[10px]`)}
          dangerouslySetInnerHTML={{ __html: title }}
        >
        </div>
      )}
    </>
  );
}

export default BlogTitle;
