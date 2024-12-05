import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Icon from "site/components/ui/Icon.tsx";
import SidebarInput from "site/components/Blog/SidebarInput.tsx";
import SidebarTitle from "site/components/Blog/SidebarTitle.tsx";
import SidebarContainer from "site/components/Blog/SidebarContainer.tsx";

export interface Props {
  title?: string;
  placeholder?: string;
}

export default function SidebarSearch({
  title = "Buscar",
  placeholder,
}: Props) {
  const loading = useSignal(false);
  const searchValue = useSignal("");

  const handleSubmit = useCallback((event: Event) => {
    event.preventDefault();
    const searchTerm = searchValue.value.trim();
    const url = new URL(globalThis.window.location.href);

    if (searchTerm) {
      url.searchParams.set("search", searchTerm);
    } else {
      url.searchParams.delete("search");
    }

    url.searchParams.delete("tag");
    url.searchParams.delete("category");
    url.searchParams.set("page", "1");
    globalThis.window.history.pushState({}, "", url.toString());
    globalThis.window.location.reload();
  }, []);

  return (
    <SidebarContainer>
      <SidebarTitle title={title} />
      <form onSubmit={handleSubmit} class="relative">
        <button class="absolute left-[15px] top-1/2 transform -translate-y-1/2 text-primary">
          <Icon
            id="MagnifyingGlass"
            size={20}
          />
        </button>
        <SidebarInput
          type="search"
          placeholder={placeholder}
          className="pl-[45px]"
          disabled={loading.value}
          value={searchValue.value}
          onInput={(e) => {
            searchValue.value = (e.target as HTMLInputElement).value;
          }}
        />
      </form>
    </SidebarContainer>
  );
}
