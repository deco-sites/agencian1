import { clx } from "site/sdk/clx.ts";

export default function PostContent({
  content,
  clamp = 0,
}: {
  content: string;
  clamp?: number;
}) {
  return (
    <div
      class={clx(
        "text-14 text-white font-noto-sans leading-6",
        "[&_p:empty]:hidden [&_*]:!leading-6 [&_>p:not(:last-child)]:mb-3",
        clamp ? `line-clamp-${clamp}` : "",
      )}
    >
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
