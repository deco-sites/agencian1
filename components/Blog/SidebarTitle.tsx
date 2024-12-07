export default function SidebarTitle({
  title,
  heading = "h3",
}: {
  title: string;
  heading?: "h2" | "h3";
}) {
  const HeadingTag = heading;
  return (
    <HeadingTag class="text-24 font-archimoto-medium font-black text-white">
      {title}
    </HeadingTag>
  );
}
