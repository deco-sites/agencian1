import { Picture, Source } from "apps/website/components/Picture.tsx";

interface Content {
  imageBlog?: string;
  link?: string;
  borderRadius?: number;
}

function BlogImage({ imageBlog, link, borderRadius }: Content) {
  if (!imageBlog) return null;

  const borderRadiusClass = borderRadius ? `rounded-[${borderRadius}px]` : "";

  const ImageContent = (
    <div class="my-[20px]">
      <Picture
        class={`flex justify-center overflow-hidden ${borderRadiusClass}`}
      >
        <Source
          media="(min-width: 1025px)"
          src={imageBlog}
          width={750}
          height={268}
        />
        <Source
          media="(max-width: 1024px)"
          src={imageBlog}
          width={310}
          height={170}
        />
        <img
          src={imageBlog}
          width={750}
          height={268}
          loading={"lazy"}
        />
      </Picture>
    </div>
  );

  return link ? <a href={link}>{ImageContent}</a> : ImageContent;
}

export default BlogImage;
