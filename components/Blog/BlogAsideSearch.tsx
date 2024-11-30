import { clx } from "$store/sdk/clx.ts";

export interface Props {
  /**
   * @title Título da seção
   */
  title?: string;
  /**
   * @title Texto de exemplo
   */
  placeholder?: string;
}

function BlogAsideSearch({ title, placeholder }: Props) {
  const handleSearch = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      const searchValue = (event.currentTarget as HTMLInputElement).value;
      const currentUrl = new URL(globalThis.location.href);
      currentUrl.searchParams.set("slug", searchValue);
      globalThis.location.href = currentUrl.toString();
    }
  };

  return (
    <div
      class={clx(`flex flex-col gap-y-[20px]`)}
    >
      <h2 class="text-24 font-archimoto-medium font-black">
        {title || "Buscar no blog"}
      </h2>
      <input
        type="text"
        placeholder={placeholder}
        onKeyPress={handleSearch}
        class="rounded-[100px] py-[14px] px-[20px] max-h-[48px] bg-[#ffffff] font-normal text-primary text-[14px] leading-[18.2px] font-noto-sans outline-none"
      />
    </div>
  );
}

export function LoadingFallback() {
  return <></>;
}

export default BlogAsideSearch;
