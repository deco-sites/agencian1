import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Logo from "site/components/header/Logo.tsx";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));

interface ImageGeneric {
  /**@title Imagem */
  src?: ImageWidget;
  /**@title Largura */
  width?: number;
  /**@title Altura */
  height?: number;
}
export interface Props {
  menu: MenuProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
  selectedLanguage?: string;
}

interface PropsAside {
  title: string;
  onClose?: () => void;
  children: ComponentChildren;
  /**@title Logo do menu mobile */
  drawer?: ImageGeneric;
  /**@title Nome da imagem */
  alt?: string;
  whatsapp?: string;
}

const Aside = (
  { title, onClose, children }: PropsAside,
) => {
  const titleScape = title ? "is-" + title?.toLocaleLowerCase() : "";

  if (titleScape === "is-menu") {
    return (
      <div class="bg-[#ffffff] grid grid-rows-[auto_1fr] h-full divide-y w-[85%] px-[20px] pt-[20px] pb-[40px]">
        <div class={`flex justify-between items-center ${titleScape}`}>
          <a href="/">
            <Logo class="w-auto h-[44px]" variant="dark" />
          </a>
          {onClose && (
            <Button
              onClick={onClose}
              class="btn btn-ghost absolute right-[-50px] top-[10px] p-0"
              aria-label="Fechar"
            >
              <Icon id="CloseMenuMobile" size={38} strokeWidth={2} />
            </Button>
          )}
        </div>
        <Suspense
          fallback={
            <div class="w-screen flex items-center justify-center">
              <span class="loading loading-ring" />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    );
  } else {
    return (
      <div class="bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y max-w-[100vw]">
        <div class={`flex justify-between items-center ${titleScape}`}>
          {title && (
            <h1 class="px-4 py-3">
              <span class="font-medium text-2xl">{title}</span>
            </h1>
          )}
          {onClose && (
            <Button
              class="btn btn-ghost"
              onClick={onClose}
              ariaLabel="Fechar"
            >
              <Icon id="XMark" size={24} strokeWidth={2} />
            </Button>
          )}
        </div>
        <Suspense
          fallback={
            <div class="w-screen flex items-center justify-center">
              <span class="loading loading-ring" />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    );
  }
};

function Drawers({ menu, children, selectedLanguage }: Props) {
  const { displayMenu, displaySearchDrawer } = useUI();

  return (
    <>
      <Drawer // left drawer
        open={displayMenu.value || displaySearchDrawer.value}
        onClose={() => {
          displayMenu.value = false;
          displaySearchDrawer.value = false;
        }}
        aside={
          <Aside
            onClose={() => {
              displayMenu.value = false;
              displaySearchDrawer.value = false;
            }}
            title={displayMenu.value ? "Menu" : ""}
          >
            {displayMenu.value && (
              <Menu {...menu} selectedLanguage={selectedLanguage} />
            )}
          </Aside>
        }
      >
        {children}
      </Drawer>
    </>
  );
}

export default Drawers;
