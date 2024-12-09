import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { type FnContext } from "@deco/deco";
export interface TagsIcons {
  /**@title Tags Desktop*/
  IconsDesktop: ImageWidget;
  widthDesktop?: number;
  heightDesktop?: number;
  /**@title Tags Mobile*/
  IconsMobile: ImageWidget;
  widthMobile?: number;
  heightMobile?: number;
}
export interface Card {
  /**@title Icon Seal Check */
  Iconcheck: ImageWidget;
  /** @title  description */
  /** @format rich-text */
  description: string;
}
export interface Props {
  /** @title Título */
  /** @format rich-text */
  title?: string;
  tags?: TagsIcons[];
  cards?: Card[];
  /** @tilte Margin top */
  /** @description Espaçamento entre uma section e outra ex:10px*/
  marginTop?: string;
  /** @tilte Margin Bottom*/
  /** @description spaçamento entre uma section e outra ex:10px*/
  marginBottom?: string;
}
export default function Result_achievements(
  { title, tags, cards, device, marginTop, marginBottom }: Props & {
    device: string;
  },
) {
  return (
    <div
      class={`w-full max-w-[1200px] m-auto px-5 lg:py-0 `}
      style={{ marginTop: `${marginTop}`, marginBottom: `${marginBottom}` }}
    >
      {title && (
        <div
          class=" text-20 lg:text-[40px] text-[#fff]  font-black not-italic font-archimoto-black mb-[18px]"
          dangerouslySetInnerHTML={{ __html: title }}
        >
        </div>
      )}
      <div class="mb-8">
        <ul class=" flex gap-4 items-center">
          {tags && tags.map((tag, index) => (
            <li key={index}>
              {device === "desktop"
                ? (
                  <Image
                    src={tag.IconsDesktop}
                    width={tag.widthDesktop || 135}
                    height={tag.heightDesktop || 33}
                    alt="tags"
                    className="hidden lg:block"
                  />
                )
                : (
                  <Image
                    src={tag.IconsMobile}
                    width={tag.widthMobile || 119}
                    height={tag.heightMobile || 33}
                    alt="tags"
                    className="block lg:hidden"
                  />
                )}
            </li>
          ))}
        </ul>
      </div>

      {/**  Cards **/}

      <div class="">
        <ul class=" gap-4 items-center grid  grind-cols-1 lg:grid-cols-2 ">
          {cards &&
            cards.map((card, index) => (
              <li
                key={index}
                class="flex flex-col lg:flex-row items-start gap-4 mb-6 py-5 px-5 n1-custom-cards-description w-full lg:max-w-[580px] lg:h-[215px]"
              >
                {card.Iconcheck && (
                  <Image
                    src={card.Iconcheck}
                    alt="tags"
                    width={42}
                    height={42}
                  />
                )}
                {card.description && (
                  <div
                    class=" text-14 text-[#F3F4F7] font-noto-sans font-normal leading-[180%]"
                    dangerouslySetInnerHTML={{ __html: card.description }}
                  >
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  const device = ctx.device;
  return {
    ...props,
    device: device || "desktop",
  };
};
