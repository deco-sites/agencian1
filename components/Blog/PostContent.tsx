import { clx } from "site/sdk/clx.ts";

export default function PostContent({
  content,
  clamp = 0,
}: {
  content: string;
  clamp?: number;
}) {
  console.log(content);
  return (
    <div
      class={clx(
        "text-14 text-white font-noto-sans leading-6",
        "[&_p:empty]:hidden [&_*]:!text-14 [&_*]:!leading-6",
        "[&_span]:!text-white [&_p_span:first-child]:inline-block [&_p_span:first-child]:mt-4",
        "[&_a]:!text-secondary [&_a_span]:!text-secondary",
        clamp ? `line-clamp-${clamp}` : "",
      )}
    >
      <p dangerouslySetInnerHTML={{ __html: cleanContent(content) }} />
    </div>
  );
}

function cleanContent(content: string) {
  return content
    .replaceAll("<p><br></p>", "")
    .replaceAll("<p><p/>", "");
}
