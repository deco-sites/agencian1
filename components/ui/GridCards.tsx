import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "site/sdk/clx.ts";
import { type FnContext } from "@deco/deco";
/** @title {{{title}}} */
export interface Card {
  /**@title Icon  */
  Icon: ImageWidget;
  /** @title  title */
  /** @format rich-text */
  title?: string;
  /** @title  description */
  /** @format rich-text */
  description?: string;
}
export interface Props {
  /** @tilte Title */
  /** @format rich-text */
  title?: string;
  /** @title adicionar barra "/" antes da frase? */
  addBar?: boolean;
  /** @title adicionar chaves "{}" antes e depois da frase? */
  addKeysInWords?: boolean;
  cards?: Card[];
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
  };
}
export default function GridCards(
  { title, cards, layout, addBar, addKeysInWords, device }: Props & {
    device?: string;
  },
) {
  const { marginTop, marginBottom, marginBottomMobile, marginTopMobile } =
    layout || {};
  const isDesktop = device === "desktop";
  return (
    <div
      class={`w-full max-w-[1200px] m-auto px-5 lg:py-0 flex flex-col gap-8 lg:gap-10 `}
      style={isDesktop
        ? { marginTop: `${marginTop}`, marginBottom: `${marginBottom}` }
        : {
          marginTop: `${marginTopMobile || marginTop}`,
          marginBottom: `${marginBottomMobile || marginBottom}`,
        }}
    >
      {title && (
        <div
          class={clx(
            `text-20 lg:text-[40px] text-[#fff]  font-black not-italic font-archimoto-black pb-[24px]
            ${
              addKeysInWords ? "is-keys-custom" : addBar ? "is-bar-custom" : ""
            }`,
          )}
          dangerouslySetInnerHTML={{ __html: title }}
        >
        </div>
      )}

      {/**  Cards **/}

      <div class="">
        <ul class=" lg:gap-x-8 gap-y-8 lg:gap-y-10 items-center grid  grind-cols-1 lg:grid-cols-3 xl:grid-cols-4 ">
          {cards &&
            cards.map((card, index) => (
              <li
                key={index}
                class="flex flex-col items-start gap-[11px] mb-6 py-8 px-8 n1-custom-card-grid w-full lg:w-[280px] lg:h-full"
              >
                {card.Icon && (
                  <Image
                    src={card.Icon}
                    width={40}
                    height={40}
                    alt="icon"
                    loading="lazy"
                  />
                )}

                <div>
                  {card.title && (
                    <div
                      class=" text-18 mb-4 text-[#3CCBDA] font-archimoto-black font-black"
                      dangerouslySetInnerHTML={{ __html: card.title }}
                    >
                    </div>
                  )}
                  {card.description && (
                    <div
                      class=" text-[14px] text-[#F3F4F7] font-montserrat font-normal leading-[160%]"
                      dangerouslySetInnerHTML={{ __html: card.description }}
                    >
                    </div>
                  )}
                </div>
              </li>
            ))}
        </ul>
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
