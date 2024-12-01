import { clx } from "site/sdk/clx.ts";

interface Props {
  title?: string;
  fontSizeDesk?: string;
  fontSizeMobile?: string;
  link?: string;
}

function BlogTitle({ title, fontSizeDesk, fontSizeMobile, link }: Props) {
  if (!title) return null;

  const classes = clx(
    "text-32 n1-blog__title",
    fontSizeMobile ? fontSizeMobile : "mobile:text-20",
    fontSizeDesk ? fontSizeDesk : "text-32",
    "font-archimoto-medium font-black",
    "mb-[10px]",
  );

  const TitleComponent = <h2 class={classes}>{title}</h2>;

  return link ? <a href={link}>{TitleComponent}</a> : TitleComponent;
}

export default BlogTitle;
