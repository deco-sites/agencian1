export default function SidebarContainer({
  children,
  ref,
}: {
  children: preact.ComponentChildren;
  ref?: preact.Ref<HTMLDivElement>;
}) {
  return <div class="flex flex-col gap-y-[20px]" ref={ref}>{children}</div>;
}
