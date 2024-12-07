import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import { clx } from "site/sdk/clx.ts";
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
    loading.value = true;
    event.preventDefault();
    const searchTerm = searchValue.value.trim();
    const url = new URL(globalThis.window.location.href);

    const pathSegments = url.pathname.split("/").filter(Boolean);
    const basePath = pathSegments.length > 0 ? `/${pathSegments[0]}` : "/";
    url.pathname = basePath;

    if (searchTerm) {
      url.searchParams.set("search", searchTerm);
    } else {
      url.searchParams.delete("search");
    }

    url.searchParams.delete("tag");
    url.searchParams.delete("category");
    url.searchParams.set("page", "1");

    globalThis.window.history.pushState({}, "", url.toString());

    const element = document.getElementById("post-list");
    if (element) {
      const elementPosition = element.getBoundingClientRect().top +
        globalThis.window.scrollY - 90;
      globalThis.window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      globalThis.window.location.reload();
    }, 1000);
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
          placeholder={placeholder}
          className={clx("pl-[45px]", loading.value && "opacity-50")}
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
