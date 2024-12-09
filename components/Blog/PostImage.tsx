import { clx } from "site/sdk/clx.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  src?: string;
  alt?: string;
  link?: string;
  borderRadius?: number;
  height: number;
  width: number;
  eager?: boolean;
}

export default function PostImage(
  { src, link, borderRadius, height, width, alt, eager }: Props,
) {
  if (!src) return null;

  const classNames = clx(
    "w-full h-auto object-cover min-h-[170px]",
    borderRadius ? `rounded-[${borderRadius}px]` : "",
  );

  const ImageComponent = (
    <Image
      src={src}
      class={classNames}
      height={height}
      width={width}
      alt={alt}
      preload={eager}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
    />
  );

  return link ? <a href={link}>{ImageComponent}</a> : ImageComponent;
}
