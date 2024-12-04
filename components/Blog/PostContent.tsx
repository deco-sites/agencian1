export default function PostContent({
  content,
  clamp = 0,
}: {
  content: string;
  clamp?: number;
}) {
  return (
    <p
      class={`text-14 text-white font-noto-sans leading-6 line-clamp-${clamp}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
