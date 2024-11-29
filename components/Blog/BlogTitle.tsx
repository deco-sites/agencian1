import { clx } from "$store/sdk/clx.ts";

interface Props {
  title?: string;
  fontSizeDesk?: string;
  fontSizeMobile?: string;
  link?: string;
}

function BlogTitle({ title, fontSizeDesk, fontSizeMobile, link }: Props) {
  if (link) {
    return (
      <>
        <a href={link}>
          {title && (
            <div
              class={clx(`text-32
                        n1-blog__title
                        ${fontSizeMobile ? fontSizeMobile : "text-20"} 
                        ${fontSizeDesk ? fontSizeDesk : "text-32"} 
                        font-archimoto-medium font-black mb-[10px] mobile:text-20`)}
              dangerouslySetInnerHTML={{ __html: title }}
            >
            </div>
          )}
        </a>
      </>
    );
  }

  return (
    <>
      {title && (
        <div
          class={clx(`text-32
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
