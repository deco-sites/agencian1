import SidebarContainer from "site/components/Blog/SidebarContainer.tsx";
import SidebarTitle from "site/components/Blog/SidebarTitle.tsx";
import SuccessIcon from "site/components/Blog/SidebarNewsletter/SuccessIcon.tsx";

export default function SuccessMessage({ title }: { title: string }) {
  return (
    <SidebarContainer>
      <SidebarTitle title={title} />
      <div class="h-[162px] flex flex-col items-center justify-center gap-[20px] rounded-[10px] bg-[#232a3d] self-stretch p-8">
        <SuccessIcon />
        <p class="font-noto-sans text-18 font-normal text-white text-center">
          Cadastro realizado com sucesso!
        </p>
      </div>
    </SidebarContainer>
  );
}
