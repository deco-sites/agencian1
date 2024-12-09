import { type Signal } from "@preact/signals";
import SidebarContainer from "site/components/Blog/SidebarContainer.tsx";
import SidebarTitle from "site/components/Blog/SidebarTitle.tsx";
import ErrorIcon from "site/components/Blog/SidebarNewsletter/ErrorIcon.tsx";

export default function ErrorMessage(
  { title, showError, errorMessage }: {
    title: string;
    showError: Signal<boolean>;
    errorMessage: string;
  },
) {
  const isValidationError = errorMessage.includes("nome") ||
    errorMessage.includes("e-mail");

  return (
    <SidebarContainer>
      <SidebarTitle title={title} />
      <div class="h-[162px] flex flex-col items-center justify-around rounded-[10px] bg-[#232a3d] self-stretch px-8 py-4">
        <ErrorIcon />
        <p class="font-noto-sans text-14 font-normal text-white text-center">
          {isValidationError ? errorMessage : "Ocorreu um erro inesperado"}
        </p>
        <button
          onClick={() => showError.value = false}
          class="text-14 font-archimoto-medium font-black text-secondary"
        >
          Tentar novamente
        </button>
      </div>
    </SidebarContainer>
  );
}
