import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { clx } from "$store/sdk/clx.ts";

interface ImageGeneric {
  src?: ImageWidget;
  width?: number;
  height?: number;
}

interface ImageBlog {
  alt?: string;
  desktop?: ImageGeneric;
  mobile?: ImageGeneric;
}

interface Content {
  imageBlog?: string;
}

function BlogImage({ imageBlog }: Content) {
  return (
    <>
      <div
        class={clx(`my-[20px]`)}
      >
        <Picture class={`flex justify-center`}>
          {imageBlog && (
            <Source
              media="(min-width: 1025px)"
              src={imageBlog}
              width={750}
              height={268}
            />
          )}
          {imageBlog && (
            <Source
              media="(max-width: 1024px)"
              src={imageBlog}
              width={310}
              height={170}
            />
          )}
          {imageBlog && (
            <img
              src={imageBlog}
              width={750}
              height={268}
              loading={"lazy"}
            />
          )}
        </Picture>
      </div>
    </>
  );
}

export default BlogImage;