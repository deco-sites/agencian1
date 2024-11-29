import { clx } from "$store/sdk/clx.ts";

interface Props {
  description?: string;
  fontSizeDesk?: string;
  fontSizeMobile?: string;
}

function BlogDescription({ description, fontSizeDesk, fontSizeMobile }: Props) {
  return (
    <>
      {description && (
        <div
          class={clx(`
                        n1-blog__description 
                        ${fontSizeDesk ? fontSizeDesk : "text-14"} 
                        ${fontSizeMobile ? fontSizeMobile : "text-14"} 
                        font-noto-sans`)}
          dangerouslySetInnerHTML={{ __html: description }}
        >
        </div>
      )}
    </>
  );
}

export default BlogDescription;
