import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";
import Image from "apps/website/components/Image.tsx";
import { LogoMobile } from "$store/components/header/Header.tsx";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));

export interface Props {
  logoMobile?: LogoMobile;
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
  logoMobile?: LogoMobile;
  whatsapp?: string;
}

const Aside = (
  { title, onClose, children, logoMobile, whatsapp }: PropsAside,
) => {
  const titleScape = title ? "is-" + title?.toLocaleLowerCase() : "";

  if (titleScape === "is-menu") {
    return (
      <div class="bg-[#ffffff] grid grid-rows-[auto_1fr] h-full divide-y w-[85%] px-[20px] pt-[20px] pb-[40px]">
        <div class={`flex justify-between items-center ${titleScape}`}>
          {logoMobile && (
            <div class="n1-header-mobile__logo">
              <Image
                src={logoMobile.src}
                alt={logoMobile.alt}
                width={logoMobile.width || 100}
                height={logoMobile.height || 13}
              />
            </div>
          )}
          {onClose && (
            <Button
              onClick={onClose}
              class="btn btn-ghost absolute right-[-50px] top-[10px] p-0"
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
          <h1 class="px-4 py-3">
            <span class="font-medium text-2xl">{title}</span>
          </h1>
          {onClose && (
            <Button class="btn btn-ghost" onClick={onClose}>
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

function Drawers({ menu, children, logoMobile, selectedLanguage }: Props) {
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
            logoMobile={logoMobile}
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
