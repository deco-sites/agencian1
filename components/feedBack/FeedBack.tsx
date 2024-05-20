import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
export interface Props {
  comment: string;
  photo: ImageWidget;
  name: string;
  profession: string;

  /** @tilte Margin top */
  /** @description Espaçamento entre uma section e outra ex:10px*/
  marginTop?: string;

  /** @tilte Margin Bottom*/
  /** @description spaçamento entre uma section e outra ex:10px*/
  marginBottom?: string;

  /**@title ativar imagem de fundo (eclipse)? */
  backgroundImage?: boolean;
}

export default function FeedbackSection({
  comment,
  photo,
  name,
  profession,
  marginTop,
  marginBottom,
  backgroundImage,
}: Props) {
  return (
    <div class="relative w-full">
      <div
        class="w-full max-w-[1200px] m-auto z-10 px-5 lg:px-0 lg:py-0 flex items-center justify-center border-y-[1px] border-solid border-[#69C7F0]"
        style={{ marginTop: `${marginTop}`, marginBottom: `${marginBottom}` }}
      >
        <div class="flex flex-col w-full max-w-[900px] gap-8 py-16 lg:py-9">
          <div class="flex flex-col lg:flex-row justify-between items-start">
            <Icon
              id="Quotes"
              size={73}
              strokeWidth={2}
              class="pb-5 lg:pb-0"
            />

            <p class=" text-14 lg:text-18 font-noto-sans text-[#F3F4F7] font-normal !leading-[160%] w-full max-w-[340px] lg:max-w-[798px] mobile:max-w-[76%] mobile:ml-[20px]">
              {comment && comment}
            </p>
          </div>

          <div class="w-full max-w-[704px] mx-auto flex gap-5">
            <div>
              <Image
                src={photo}
                width={80}
                height={80}
                loading="lazy"
                alt="photo user"
                class=""
              />
            </div>
            <div class="flex flex-col justify-center">
              <p class="lg:text-24 font-black font-noto-sans text-[#40C3DB]  ">
                {name}
              </p>
              <p class=" text-16 font-normal text-[#fff] font-noto-sans">
                {profession}
              </p>
            </div>
          </div>
        </div>
      </div>

      {backgroundImage && (
        <div class="n1-feedback__eclipse absolute lg:is--desk top-0 left-0 z-0 hidden lg:block">
        </div>
      )}
    </div>
  );
}
