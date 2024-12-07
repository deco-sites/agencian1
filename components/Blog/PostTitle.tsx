import { clx } from "site/sdk/clx.ts";

export default function PostTitle({
  title,
  link,
  clamp = 0,
  fontSizeDesktop = 32,
  fontSizeMobile = 20,
  leadingDesktop = 38,
  leadingMobile = 24,
  heading = "h2",
}: {
  title: string;
  link?: string;
  clamp?: number;
  fontSizeDesktop?: number;
  fontSizeMobile?: number;
  leadingDesktop?: number;
  leadingMobile?: number;
  heading?: "h1" | "h2" | "h3";
}) {
  const classNames = clx(
    `mb-[-10px] font-archimoto-medium font-black text-white `,
    `text-[${fontSizeDesktop}px] mobile:text-[${fontSizeMobile}px]`,
    `leading-[${leadingDesktop}px] mobile:leading-[${leadingMobile}px]`,
    clamp ? `line-clamp-${clamp}` : "",
  );

  const HeadingTag = heading;

  return link
    ? (
      <a
        href={link}
      >
        <HeadingTag class={classNames}>
          {title}
        </HeadingTag>
      </a>
    )
    : <HeadingTag class={classNames}>{title}</HeadingTag>;
}
