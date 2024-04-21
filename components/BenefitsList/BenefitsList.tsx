import Icon from "deco-sites/agencian1/components/ui/Icon.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { propsLoader } from "deco/blocks/propsLoader.ts";
import Image from "apps/website/components/Image.tsx";

export interface Lists {
  /** @title Descrição */
  /** @format html */
  description: string;
}
export interface Props {
  /** @title Título */
  /** @format html */
  title?: string;

  /** @tilte Margin top */
  /** @description Espaçamento entre uma section e outra ex:10px*/
  marginTop?: string;

  /** @tilte Margin Bottom*/
  /** @description espaçamento entre uma section e outra ex:10px*/
  marginBottom?: string;

  /**@title Lista */
  lists: Lists[];

  /** @description Icon backgroud */
  icon?: ImageWidget;
}

export default function BenefitsList(
  { title, marginBottom, marginTop, lists, icon }: Props,
) {
  return (
    <div
      class=" relative w-full n1-custom-bg-img md:n1-custom-bg-img-2"
      style={{ marginTop: `${marginTop}`, marginBottom: `${marginBottom}` }}
    >
      <div
        class={`w-full max-w-[1200px] m-auto pb-20 md:py-[70px] px-5`}
      >
        {title && (
          <div
            class=" text-20 lg:text-48 text-[#fff] text-center font-black not-italic font-archimoto-black mb-8"
            dangerouslySetInnerHTML={{ __html: title }}
          >
          </div>
        )}

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {lists.map((list, index) => (
            <div class="flex justify-center items-center gap-5 n1-custom-card-benefits py-4 px-4">
              <div class="flex justify-center items-center gap-4 w-full max-x-[285px]">
                <div class="w-9 h-9">
                  <Icon
                    id="Check"
                    size={36}
                    strokeWidth={2}
                    class=" text-center"
                  />
                </div>

                <div
                  class="text-14 text-[#F3F4f7] font-normal font-noto-sans !leading-[140%]"
                  dangerouslySetInnerHTML={{ __html: list.description }}
                >
                </div>
              </div>
            </div>
          ))}
        </div>

        {icon && (
          <Image
            src={icon}
            width={200}
            height={200}
            alt="icon"
            class="absolute -top-20 left-0 hidden md:block"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}
