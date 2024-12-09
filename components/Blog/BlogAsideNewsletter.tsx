import type { JSX } from "preact";
import { clx } from "site/sdk/clx.ts";
import { signal } from "@preact/signals";
import { useRef } from "preact/hooks";

const isLoading = signal(false);
const showSuccess = signal(false);

export interface Props {
  /**@title Título */
  title?: string;
  /**@title Texto de exemplo para o campo nome */
  namePlaceholder?: string;
  /**@title Texto de exemplo para o campo email */
  emailPlaceholder?: string;
  /**@title Texto do botão */
  submitButtonText?: string;
}

function BlogAsideNewsletter({
  title = "Newsletter",
  namePlaceholder,
  emailPlaceholder,
  submitButtonText = "Cadastrar",
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    isLoading.value = true;

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim();
    const name = formData.get("name")?.toString().trim();

    if (!email || !name) return;

    try {
      const response = await fetch("/api/newsletterform", {
        method: "POST",
        body: JSON.stringify({ email, name }),
        headers: {
          "content-type": "application/json",
          "accept": "application/json",
        },
      });

      if (!response.ok) return;

      formRef.current?.reset();
      showSuccess.value = true;
    } catch (err) {
      console.error("Newsletter submission error:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return (
    <div class="news">
      <h2 class="mb-[20px] text-24 font-archimoto-medium font-black">
        {title}
      </h2>

      <form
        ref={formRef}
        class={clx(
          "flex flex-col gap-y-[10px] relative",
          showSuccess.value && "hidden",
        )}
        onSubmit={handleSubmit}
      >
        <input
          id="name"
          name="name"
          placeholder={namePlaceholder}
          disabled={isLoading.value}
          class={clx(
            "rounded-[100px] py-[14px] px-[20px] max-h-[48px] bg-[#ffffff]",
            "font-normal text-primary text-[14px] leading-[18.2px]",
            "font-noto-sans outline-none",
            isLoading.value && "opacity-50 cursor-not-allowed",
          )}
        />
        <input
          id="email"
          name="email"
          type="email"
          placeholder={emailPlaceholder}
          disabled={isLoading.value}
          class={clx(
            "rounded-[100px] py-[14px] px-[20px] max-h-[48px] bg-[#ffffff]",
            "font-normal text-primary text-[14px] leading-[18.2px]",
            "font-noto-sans outline-none",
            isLoading.value && "opacity-50 cursor-not-allowed",
          )}
        />
        <div>
          <button
            disabled={isLoading.value}
            class={clx(
              "mt-[10px] px-[20px] pt-[15px] pb-[11px] rounded-[100px]",
              "bg-accent hover:bg-[#F8BC33] text-primary",
              "text-14 font-archimoto-medium font-black",
              "leading-none inline-block",
              isLoading.value && "opacity-50 cursor-not-allowed",
            )}
          >
            {submitButtonText}
          </button>
        </div>
        <div
          class={clx(
            "absolute inset-0 bg-white/50 flex items-center justify-center",
            isLoading.value ? "flex" : "hidden",
          )}
        >
          <div class="w-8 h-8 border-4 border-[#3CCBDA] border-t-transparent rounded-full animate-spin">
          </div>
        </div>
      </form>

      <div
        class={clx(
          "flex-col gap-[20px] rounded-[10px] bg-[#232a3d] items-center justify-center self-stretch p-8",
          showSuccess.value ? "flex" : "hidden",
        )}
      >
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
        <span class="text-14 font-normal text-white">
          Cadastro realizado com sucesso!
        </span>
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return <></>;
}

export default BlogAsideNewsletter;
