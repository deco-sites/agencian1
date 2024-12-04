const CLASS_NAMES =
  "mb-[-10px] text-32 mobile:text-20 font-archimoto-medium font-black text-white";

export default function PostTitle({
  title,
  link,
}: {
  title: string;
  link?: string;
}) {
  return link
    ? (
      <h2 class={CLASS_NAMES}>
        <a
          href={link}
        >
          {title}
        </a>
      </h2>
    )
    : <h2 class={CLASS_NAMES}>{title}</h2>;
}
