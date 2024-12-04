import { signal } from "@preact/signals";
import { clx } from "site/sdk/clx.ts";
import SidebarTitle from "site/components/Blog/SidebarTitle.tsx";
import SidebarInput from "site/components/Blog/SidebarInput.tsx";
import SidebarContainer from "site/components/Blog/SidebarContainer.tsx";

const isLoading = signal(false);
// const showSuccess = signal(false);

interface Props {
  title?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  submitButtonText?: string;
}

export default function SidebarNewsletter({
  title = "Newsletter",
  namePlaceholder,
  emailPlaceholder,
  submitButtonText = "Enviar",
}: Props) {
  return (
    <SidebarContainer>
      <SidebarTitle title={title} />
      <SidebarInput placeholder={namePlaceholder} />
      <SidebarInput placeholder={emailPlaceholder} className="mt-[-10px]" />
      <Button submitButtonText={submitButtonText} />
    </SidebarContainer>
  );
}

function Button({ submitButtonText }: { submitButtonText: string }) {
  return (
    <button
      disabled={isLoading.value}
      class={clx(
        "w-fit px-[20px] pt-[4px]  rounded-[100px] leading-[36px]",
        "bg-accent hover:bg-[#F8BC33] text-primary duration-300",
        "text-14 font-archimoto-medium font-black",
        isLoading.value && "opacity-50 cursor-not-allowed",
      )}
    >
      {submitButtonText}
    </button>
  );
}
