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

    if (!formData.email || !formData.name) return;

    try {
      isLoading.value = true;
      await invoke.site.actions.blog.submitNewsletter(formData);
      showSuccess.value = true;
      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      isLoading.value = false;
    }
  }, [formData]);

  if (showSuccess.value) {
    return (
      <SidebarContainer>
        <div class="flex flex-col items-center gap-4 py-4">
          <span class="text-16 font-bold text-primary">
            Inscrição realizada com sucesso!
          </span>
        </div>
      </SidebarContainer>
    );
  }

  return (
    <SidebarContainer>
      <form onSubmit={handleSubmit} class="flex flex-col gap-y-[20px]">
        <SidebarTitle title={title} />
        <SidebarInput
          placeholder={namePlaceholder}
          value={formData.name}
          disabled={isLoading.value}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.currentTarget.value }))}
        />
        <SidebarInput
          placeholder={emailPlaceholder}
          type="email"
          value={formData.email}
          disabled={isLoading.value}
          className="mt-[-10px]"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.currentTarget.value }))}
        />
        <Button submitButtonText={submitButtonText} />
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
        isLoading.value && "opacity-50 cursor-not-allowed",
      )}
    >
      {isLoading.value ? "Enviando..." : submitButtonText}
    </button>
  );
}
