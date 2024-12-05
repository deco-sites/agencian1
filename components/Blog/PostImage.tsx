import Image from "apps/website/components/Image.tsx";

interface Props {
  src?: string;
  link?: string;
  borderRadius?: number;
  height: number;
  width: number;
}

export default function PostImage(
  { src, link, borderRadius, height, width }: Props,
) {
  if (!src) return null;

  const classNames = borderRadius ? `rounded-[${borderRadius}px]` : "";

  return link
    ? (
      <a href={link}>
        <Image src={src} class={classNames} height={height} width={width} />
      </a>
    )
    : <Image src={src} class={classNames} height={height} width={width} />;
}
