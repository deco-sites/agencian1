import { clx } from "site/sdk/clx.ts";

export default function PostTitle({
  title,
  link,
  clamp = 0,
  fontSizeDesktop = 32,
  fontSizeMobile = 20,
}: {
  title: string;
  link?: string;
  clamp?: number;
  fontSizeDesktop?: number;
  fontSizeMobile?: number;
}) {
  const classNames = clx(
    `mb-[-10px] text-[${fontSizeDesktop}px] mobile:text-[${fontSizeMobile}px] font-archimoto-medium font-black text-white`,
    clamp ? `line-clamp-${clamp}` : "",
  );

  return link
    ? (
      <a
        href={link}
      >
        <h2 class={classNames}>
          {title}
        </h2>
      </a>
    )
    : <h2 class={classNames}>{title}</h2>;
}
