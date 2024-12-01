import { clx } from "site/sdk/clx.ts";

interface Props {
  description?: string;
  clamp?: number;
  fontSizeDesk?: string;
  fontSizeMobile?: string;
}

function BlogDescription({
  description,
  clamp = 2,
  fontSizeDesk,
  fontSizeMobile,
}: Props) {
  if (!description) return null;

  const classes = clx(
    "n1-blog__description text-14",
    fontSizeDesk ? fontSizeDesk : "",
    fontSizeMobile ? fontSizeMobile : "",
    `font-noto-sans leading-6 line-clamp-${clamp}`,
  );

  return (
    <div
      class={classes}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}

export default BlogDescription;
