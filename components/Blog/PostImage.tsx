import Image from "apps/website/components/Image.tsx";

interface Props {
  src?: string;
  link?: string;
  borderRadius?: number;
}

export default function PostImage({ src, link, borderRadius }: Props) {
  if (!src) return null;

  const classNames = borderRadius ? `rounded-[${borderRadius}px]` : "";

  return link
    ? (
      <a href={link}>
        <Image src={src} class={classNames} height={265} width={750} />
      </a>
    )
    : <Image src={src} class={classNames} height={265} width={750} />;
}
