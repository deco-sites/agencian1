import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "site/sdk/clx.ts";

export interface Cards {
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

  cards?: Cards[];

  /** @tilte Margin top */
  /** @description Espaçamento entre uma section e outro ex:10px*/
  marginTop?: string;

  /** @tilte Margin Bottom */
  /** @description spaçamento entre uma section  e outro ex:10px*/
  marginBottom?: string;
}

export default function Challenges(
  { title, cards, marginTop, marginBottom, addBar, addKeysInWords }: Props,
) {
  return (
    <div
      class={`w-full max-w-[1200px] m-auto px-5 lg:py-0 flex flex-col gap-6 `}
      style={{ marginTop: `${marginTop}`, marginBottom: `${marginBottom}` }}
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
        <ul class=" gap-7 items-center grid  grind-cols-1 lg:grid-cols-3 xl:grid-cols-4 ">
          {cards &&
            cards.map((card, index) => (
              <li
                key={index}
                class="flex flex-col items-start gap-5 mb-6 py-6 px-6 n1-custom-cards-challenge w-full lg:w-[280px] lg:h-full"
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
                      class=" text-18 mb-3 text-[#3CCBDA] font-archimoto-black font-black"
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
