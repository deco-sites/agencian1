import { clx } from "$store/sdk/clx.ts";
import Icon from "$store/components/ui/Icon.tsx";

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

export default function BlogAsideSearch({ title, placeholder }: Props) {
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
        {title || "Buscar"}
      </h2>
      <div class="relative">
        <Icon
          id="MagnifyingGlass"
          width={20}
          height={20}
          class="absolute left-[15px] top-1/2 transform -translate-y-1/2 text-primary"
        />
        <input
          type="text"
          placeholder={placeholder}
          onKeyPress={handleSearch}
          class="rounded-[100px] py-[14px] pl-[45px] pr-[20px] max-h-[48px] w-full bg-[#ffffff] font-normal text-primary text-[14px] leading-[18.2px] font-noto-sans outline-none"
        />
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return <></>;
}
