import SidebarContainer from "site/components/Blog/SidebarContainer.tsx";
import SidebarTitle from "site/components/Blog/SidebarTitle.tsx";
import { clx } from "site/sdk/clx.ts";

export interface Category {
  name: string;
  count: number;
  slug: string;
}

interface Props {
  title?: string;
  categories?: Category[];
}

export default function SidebarCategories({
  title = "Categorias",
  categories,
}: Props) {
  if (!categories?.length) return null;
  return (
    <SidebarContainer>
      <SidebarTitle title={title} />
      <ul class="flex flex-col gap-y-[10px]">
        {categories?.map((category) => (
          <CategoryItem {...category} key={category.name} />
        ))}
      </ul>
    </SidebarContainer>
  );
}

function CategoryItem({ name, slug, count }: Category) {
  const link = `/blog?category=${slug}`;
  return (
    <li
      class={clx(
        "h-[50px] flex justify-between items-center",
        "rounded-[30px] bg-[rgba(255,_255,_255,_0.10)]",
        "font-noto-sans text-14 duration-300",
        "hover:bg-[rgba(255,_255,_255,_0.15)]",
      )}
    >
      <a href={link} class="flex items-center justify-between w-full">
        <span class="ml-5 text-white leading-none">{name}</span>
        <span
          class={clx(
            "flex justify-center items-center size-[36px] mr-2 rounded-[30px]",
            "bg-secondary font-noto-sans text-gray-58 duration-300",
            "group-hover:bg-white",
          )}
        >
          {count}
        </span>
      </a>
    </li>
  );
}
