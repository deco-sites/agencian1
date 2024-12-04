export default function PostContainer({
  children,
}: {
  children: preact.ComponentChildren;
}) {
  return (
    <div class="mb-[40px] grid grid-cols-[1fr_380px] gap-x-[30px]">
      {children}
    </div>
  );
}
