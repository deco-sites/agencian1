import Loading from "$store/components/ui/Loading.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { lazy, Suspense } from "preact/compat";

import type { Props as MenuProps } from "$store/components/header/Menu.tsx";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));

interface Props {
  menu?: MenuProps;
}

function Modals({ menu }: Props) {
  const { displayMenu } = useUI();

  const fallback = (
    <div class="flex justify-center items-center w-full h-full">
      <span class="loading loading-ring" />
    </div>
  );

  return (
    <>
      {menu && (
        <Modal
          open={displayMenu.value}
          onClose={() => displayMenu.value = false}
          class="backdrop:bg-base-content backdrop:opacity-70"
          loading="lazy"
        >
          {/* <Suspense fallback={fallback}>
            <Menu {...menu} />
          </Suspense> */}
        </Modal>
      )}
    </>
  );
}

export default Modals;
