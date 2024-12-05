import { clx } from "site/sdk/clx.ts";
import SidebarContainer from "site/components/Blog/SidebarContainer.tsx";
import SidebarTitle from "site/components/Blog/SidebarTitle.tsx";

export interface Tag {
  name: string;
  slug: string;
}

interface SidebarTagsProps {
  title?: string;
  tags?: Tag[];
}

export default function SidebarTags({
  title = "Tags",
  tags,
}: SidebarTagsProps) {
  if (!tags?.length) return null;
  return (
    <SidebarContainer>
      <SidebarTitle title={title} />
      <ul class="flex flex-wrap gap-[10px]">
        {tags?.map((tag) => <TagItem {...tag} key={tag.name} />)}
      </ul>
    </SidebarContainer>
  );
}

function TagItem({ name, slug }: Tag) {
  return (
    <li class="inline-flex">
      <a
        href={`/blog?tag=${slug}`}
        class={clx(
          "flex px-[14px] rounded-[30px] border border-white",
          "text-14 text-white text-center font-noto-sans duration-300",
          "hover:bg-white hover:text-gray-58 leading-[38px]",
        )}
      >
        {name}
      </a>
    </li>
  );
}
