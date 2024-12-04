import { signal } from "@preact/signals";
import { clx } from "site/sdk/clx.ts";
import { useCallback, useState } from "preact/hooks";
import { invoke } from "site/runtime.ts";
import SidebarTitle from "site/components/Blog/SidebarTitle.tsx";
import SidebarInput from "site/components/Blog/SidebarInput.tsx";
import SidebarContainer from "site/components/Blog/SidebarContainer.tsx";
import type { Props as ActionProps } from "site/actions/blog/submitNewsletter.ts";

const isLoading = signal(false);
const showSuccess = signal(false);
const showError = signal(false);

export interface Props {
  title?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  submitButtonText?: string;
}

export default function SidebarNewsletter({
  title = "Newsletter",
  namePlaceholder = "Nome",
  emailPlaceholder = "Email",
  submitButtonText = "Enviar",
}: Props) {
  const [formData, setFormData] = useState<ActionProps>({
    name: "",
    email: "",
  });

  const handleSubmit = useCallback(async (e: Event) => {
    e.preventDefault();
    showError.value = false;

    if (!formData.email || !formData.name) return;

    try {
      isLoading.value = true;
      await invoke.site.actions.blog.submitNewsletter(formData);
      showSuccess.value = true;
      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error("Failed to submit:", error);
      showError.value = true;
    } finally {
      isLoading.value = false;
    }
  }, [formData]);

  if (showSuccess.value) return <SuccessMessage title={title} />;
  if (showError.value) return <ErrorMessage title={title} />;

  return (
    <SidebarContainer>
      <SidebarTitle title={title} />
      <form
        onSubmit={handleSubmit}
        class="h-[162px] flex flex-col gap-y-[20px] relative"
        disabled={isLoading.value}
      >
        <SidebarInput
          placeholder={namePlaceholder}
          value={formData.name}
          disabled={isLoading.value}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.currentTarget.value }))}
          className={clx(isLoading.value && "opacity-50 cursor-not-allowed")}
        />
        <SidebarInput
          placeholder={emailPlaceholder}
          type="email"
          value={formData.email}
          disabled={isLoading.value}
          className={clx(
            "mt-[-10px]",
            isLoading.value && "opacity-50 cursor-not-allowed",
          )}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.currentTarget.value }))}
        />
        <Button submitButtonText={submitButtonText} />
        <LoadingSpinner />
      </form>
    </SidebarContainer>
  );
}

function Button({ submitButtonText }: { submitButtonText: string }) {
  return (
    <button
      type="submit"
      disabled={isLoading.value}
      class={clx(
        "w-fit px-[20px] pt-[4px] rounded-[100px] leading-[36px]",
        "bg-accent hover:bg-[#F8BC33] text-primary duration-300",
        "text-14 font-archimoto-medium font-black",
        "flex items-center justify-center gap-2",
        isLoading.value && "opacity-50 cursor-not-allowed",
      )}
    >
      {submitButtonText}
    </button>
  );
}

function SuccessMessage({ title }: { title: string }) {
  return (
    <SidebarContainer>
      <SidebarTitle title={title} />
      <div class="h-[162px] flex flex-col items-center justify-center gap-[20px] rounded-[10px] bg-[#232a3d] self-stretch p-8">
        <svg
          width="40"
          height="41"
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.9999 37.1667C29.2047 37.1667 36.6666 29.7048 36.6666 20.5C36.6666 11.2953 29.2047 3.83334 19.9999 3.83334C10.7952 3.83334 3.33325 11.2953 3.33325 20.5C3.33325 29.7048 10.7952 37.1667 19.9999 37.1667ZM27.8913 16.6305C28.5156 15.9541 28.4734 14.8997 27.7971 14.2753C27.1207 13.651 26.0663 13.6932 25.4419 14.3696L17.4358 23.0428L14.5579 19.9251C13.9336 19.2487 12.8792 19.2066 12.2028 19.8309C11.5264 20.4552 11.4842 21.5097 12.1086 22.186L16.2112 26.6305C16.5267 26.9723 16.9707 27.1667 17.4358 27.1667C17.901 27.1667 18.345 26.9723 18.6605 26.6305L27.8913 16.6305Z"
            fill="#3CCBDA"
          />
        </svg>
        <p class="font-noto-sans text-18 font-normal text-white text-center">
          Cadastro realizado com sucesso!
        </p>
      </div>
    </SidebarContainer>
  );
}

function ErrorMessage({ title }: { title: string }) {
  return (
    <SidebarContainer>
      <SidebarTitle title={title} />
      <div class="h-[162px] flex flex-col items-center justify-around rounded-[10px] bg-[#232a3d] self-stretch px-8 py-4">
        <svg
          width="40"
          height="41"
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.9999 37.1667C29.2047 37.1667 36.6666 29.7048 36.6666 20.5C36.6666 11.2953 29.2047 3.83334 19.9999 3.83334C10.7952 3.83334 3.33325 11.2953 3.33325 20.5C3.33325 29.7048 10.7952 37.1667 19.9999 37.1667ZM20 12.1667C20.9205 12.1667 21.6667 12.9129 21.6667 13.8334V20.5C21.6667 21.4205 20.9205 22.1667 20 22.1667C19.0795 22.1667 18.3333 21.4205 18.3333 20.5V13.8334C18.3333 12.9129 19.0795 12.1667 20 12.1667ZM20 25.5C20.9205 25.5 21.6667 26.2462 21.6667 27.1667C21.6667 28.0872 20.9205 28.8334 20 28.8334C19.0795 28.8334 18.3333 28.0872 18.3333 27.1667C18.3333 26.2462 19.0795 25.5 20 25.5Z"
            fill="#FF6B6B"
          />
        </svg>
        <p class="font-noto-sans text-14 font-normal text-white text-center">
          Ocorreu um erro. Por favor, tente novamente.
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

function LoadingSpinner() {
  return (
    <div
      class={clx(
        "absolute inset-0 flex items-center justify-center",
        isLoading.value ? "flex" : "hidden",
      )}
    >
      <div class="w-8 h-8 border-4 border-[#3CCBDA] border-t-transparent rounded-full animate-spin">
      </div>
    </div>
  );
}
