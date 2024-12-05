import Image from "apps/website/components/Image.tsx";
import { clx } from "site/sdk/clx.ts";

interface Props {
  src?: string;
  alt?: string;
  link?: string;
  borderRadius?: number;
  height: number;
  width: number;
}

export default function PostImage(
  { src, link, borderRadius, height, width, alt }: Props,
) {
  if (!src) return null;

  const classNames = clx(
    `w-full h-auto lg:h-[${height}px] object-cover min-h-[170px]`,
    borderRadius ? `rounded-[${borderRadius}px]` : "",
  );

  return link
    ? (
      <a href={link}>
        <Image
          src={src}
          class={classNames}
          height={height}
          width={width}
          alt={alt}
        />
      </a>
    )
    : (
      <Image
        src={src}
        class={classNames}
        height={height}
        width={width}
        alt={alt}
      />
    );
}
