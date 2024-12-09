import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { type FnContext } from "@deco/deco";
export interface content {
  /** @format rich-text */
  title?: string;
  /** @format rich-text */
  email?: string;
  /** @format rich-text */
  description?: string;
}
export interface Props {
  content?: content;
  layout?: {
    /** @tilte Margin top */
    /** @description Espaçamento entre uma section e outro ex:10px*/
    marginTop?: string;
    /** @tilte Margin Bottom */
    /** @description spaçamento entre uma section  e outro ex:10px*/
    marginBottom?: string;
    /** @description espaçamento entre uma section e outra ex:10px*/
    marginTopMobile?: string;
    /** @description espaçamento entre uma section e outra ex:10px*/
    marginBottomMobile?: string;
    /** Icon Background */
    icon?: ImageWidget;
  };
}
const defaultContent = {
  title: "Envie seu portfólio + currículo atualizado para",
  email: "contato@agencian1.com.br",
  description:
    "Dê o próximo passo em sua jornada conosco! Aguardamos ansiosamente para conhecê-lo melhor 💖",
};
export default function EmailContact({ layout, content, device }: Props & {
  device?: string;
}) {
  const { title, email, description } = content || defaultContent;
  const { marginTop, marginBottom, marginBottomMobile, marginTopMobile, icon } =
    layout || {};
  const isDesktop = device === "desktop";
  return (
    <div
      class={` w-full px-5 lg:py-0 flex flex-col gap-8 lg:gap-10 lg:relative  overflow-x-clip `}
      style={isDesktop
        ? { marginTop: `${marginTop}`, marginBottom: `${marginBottom}` }
        : {
          marginTop: `${marginTopMobile || marginTop}`,
          marginBottom: `${marginBottomMobile || marginBottom}`,
        }}
    >
      <div class=" w-full max-w-[1200px] m-auto flex text-start flex-col  justify-start gap-6">
        {title && (
          <div
            class=" lg:text-38 text-18 text-[#f3f4f7] font-noto-sans font-medium"
            dangerouslySetInnerHTML={{ __html: title }}
          >
          </div>
        )}

        {email && (
          <div
            class=" text-25 lg:text-68 text-start text-[#3CCBDA] font-archimoto-black font-black"
            dangerouslySetInnerHTML={{ __html: email }}
          >
          </div>
        )}

        {description && (
          <div
            class="text-16 lg:text-18 text-start text-[#FFF]  font-noto-sans  font-normal"
            dangerouslySetInnerHTML={{ __html: description }}
          >
          </div>
        )}
      </div>

      {device === "desktop" && icon
        ? (
          <Image
            src={icon}
            width={200}
            height={125}
            alt="icon"
            class="absolute right-0 bottom-0"
          />
        )
        : (
          <div class="relative w-full h-32">
            {icon && (
              <Image
                src={icon}
                width={125}
                height={125}
                alt="icon"
                class="absolute -right-6 -top-16"
              />
            )}
          </div>
        )}

      <div class=" hidden lg:block absolute top-[-100px] right-1/2 transfor translate-x-1/2 rounded-[838.699px] bg-[#F6AB00]  blur-[92px] opacity-30 w-[838px] h-[220px] ">
      </div>
      <div class=" hidden lg:block absolute top-[-100px]  -right-40 rounded-[445.277px] bg-[#3CCBDA]  blur-[92px] opacity-30 w-[445.277px] h-[220px] ">
      </div>
      <div class=" hidden lg:block absolute top-[-100px] left-28 rounded-[464.441px]  blur-[92px] opacity-50 w-[464.441px] h-[220px] n1-custom-color-yello-linear ">
      </div>
      <div class=" hidden lg:block absolute top-[-100px] right-1/2 transfor translate-x-1/2 rounded-[445.277px] bg-[#3CCBDA]  blur-[92px] opacity-30 w-[445.277px] h-[220px] ">
      </div>
      <div class=" hidden lg:block absolute top-[-100px] -left-40 rounded-[445.277px] bg-[#3CCBDA]  blur-[92px] opacity-30 w-[445.277px] h-[220px] ">
      </div>
    </div>
  );
}
export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device || "desktop",
  };
};
