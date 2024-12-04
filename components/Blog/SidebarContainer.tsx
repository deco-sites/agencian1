export default function SidebarContainer({
  children,
}: {
  children: preact.ComponentChildren;
}) {
  return <div class="flex flex-col gap-y-[20px]">{children}</div>;
}
