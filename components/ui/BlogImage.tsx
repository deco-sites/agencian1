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
  imageBlog?: ImageBlog;
}

function BlogImage({ imageBlog }: Content) {
  return (
    <>
      <div
        class={clx(`my-[20px]`)}
      >
        <Picture class={`flex justify-center`}>
          {imageBlog && imageBlog.desktop?.src &&
            imageBlog.desktop?.width &&
            imageBlog.desktop?.height && (
            <Source
              media="(min-width: 1025px)"
              src={imageBlog.desktop.src}
              width={imageBlog.desktop.width}
              height={imageBlog.desktop.height}
            />
          )}
          {imageBlog && imageBlog.mobile?.src &&
            imageBlog.mobile?.width &&
            imageBlog.mobile?.height && (
            <Source
              media="(max-width: 1024px)"
              src={imageBlog.mobile.src}
              width={imageBlog.mobile.width}
              height={imageBlog.mobile.height}
            />
          )}
          {imageBlog && (
            <img
              src={imageBlog.desktop?.src}
              width={imageBlog.desktop?.width}
              height={imageBlog.desktop?.height}
              loading={"lazy"}
            />
          )}
        </Picture>
      </div>
    </>
  );
}

export default BlogImage;
