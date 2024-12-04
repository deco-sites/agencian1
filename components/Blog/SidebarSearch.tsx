import Icon from "site/components/ui/Icon.tsx";
import SidebarInput from "site/components/Blog/SidebarInput.tsx";
import SidebarTitle from "site/components/Blog/SidebarTitle.tsx";
import SidebarContainer from "site/components/Blog/SidebarContainer.tsx";

interface Props {
  title?: string;
  placeholder?: string;
}

export default function SidebarSearch({
  title = "Buscar",
  placeholder,
}: Props) {
  return (
    <SidebarContainer>
      <SidebarTitle title={title} />
      <div class="relative">
        <Icon
          id="MagnifyingGlass"
          size={20}
          class="absolute left-[15px] top-1/2 transform -translate-y-1/2 text-primary"
        />
        <SidebarInput placeholder={placeholder} className="pl-[45px]" />
      </div>
    </SidebarContainer>
  );
}
