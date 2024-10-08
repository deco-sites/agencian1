import { FnContext } from "deco/mod.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "$store/sdk/clx.ts";
import Ellipse from "site/components/ui/Ellipse.tsx";

export interface Img {
  /**@title Image Desktop*/
  imageDesktop?: ImageWidget;

  alt?: string;

  /** @description width ex: 500 */
  widthDesktop?: number;
  /** @description height ex: 300 */
  heightDesktop?: number;

  /**@title Image Mobile*/
  imageMobile: ImageWidget;
  /** @description width ex: 500 */
  widthMobile?: number;
  /** @description height ex: 300 */
  heightMobile?: number;
}

export interface TextList {
  /** @format rich-text */
  descriptionList?: string;
}

export interface Tags {
  /**@title Tags Desktop*/
  iconsDesktop: ImageWidget;
  widthDesktop?: number;
  heightDesktop?: number;

  /**@title Tags Mobile*/
  iconsMobile: ImageWidget;
  widthMobile?: number;
  heightMobile?: number;
}

export interface CardInfo {
  /**@description ex: +12,85% */
  percentage?: string;

  /**@description short text ex: Aumento da receita */
  about?: string;
}

export interface List {
  /**@description Adicione o icon para o check list */
  iconCheck?: ImageWidget;

  textList?: TextList[];

  widthContainerList: "400" | "500";

  tags?: Tags[];

  cardInfo?: CardInfo[];

  /** @title Ocultar o card no mobile */
  hiddenCardInfo?: boolean;
}

export interface Button {
  textButton: string;
  link: string;
}

export interface Content {
  /** @format rich-text */
  title?: string;
  /** @title adicionar barra "/" antes da frase? */
  addBar?: boolean;
  /** @title adicionar chaves "{}" antes e depois da frase? */
  addKeysInWords?: boolean;
  /** @format rich-text */
  description?: string;
  /** @title Tamanho de fonte Desktop */
  /** @description fonte de descrição (ex: text-14 = 14px) */
  fontSize?: "text-14" | "text-16" | "text-20";
  /** @title Tamanho de fonte Mobile */
  /** @description fonte de descrição (ex: text-14 = 14px) */
  fontSizeMobile?: "text-20" | "text-24";

  alignmentContent?: "center" | "normal";

  list?: List;

  button?: Button;
}

export interface Ellipse {
  horizontal: "left" | "center" | "right";
  vertical: "top" | "center" | "bottom";
  width: "100" | "200" | "300";
  height: "100" | "200" | "300";
  color: "yellow" | "blue";
  activeDesktop?: boolean;
  activeMobile?: boolean;
}

export interface Props {
  bannerImg: Img;

  contentText?: Content;

  /** @title Espaçamento do container*/
  /** @description margem do container para deixar conteúdo centralizado ou normal */
  styleContainer?: "center" | "normal";

  /** @title Posicionamento */
  placement?: "esquerdo" | "direito";

  /** @tilte Margin top */
  /** @description Espaçamento entre uma section e outra ex:10px*/
  marginTop?: string;

  /** @tilte Margin Bottom*/
  /** @description espaçamento entre uma section e outra ex:10px*/
  marginBottom?: string;

  /** @description espaçamento entre uma section e outra ex:10px*/
  marginTopMobile?: string;

  /** @description espaçamento entre uma section e outra ex:10px*/
  marginBottomMobile?: string;

  /** @description imagem de fundo */
  imageBackground?: ImageWidget;

  /** @description cor no fundo */
  ellipse?: Ellipse;
}

const PLACEMENT = {
  esquerdo: "flex-col lg:flex-row-reverse",
  direito: "flex-col lg:flex-row",
};

const variants = {
  center: "center",
  normal: "normal",
};

export default function BannerWithTextColumn({
  bannerImg,
  contentText,
  placement = "direito",
  styleContainer = "normal",
  marginTop,
  marginBottom,
  marginBottomMobile,
  marginTopMobile,
  device,
  imageBackground,
  ellipse,
}: Props & { device: string }) {
  const widthContainerValue = contentText && contentText.list
    ? contentText.list.widthContainerList
    : 400;
  const ishidden = contentText && contentText.list?.hiddenCardInfo
    ? contentText.list?.hiddenCardInfo
    : false;

  const {
    fontSize = "text-16",
    fontSizeMobile = "text-14",
    alignmentContent = "normal",
  } = contentText || {};

  const isDesktop = device === "desktop";

  return (
    <div class="w-full relative overflow-x-clip">
      <div
        class={`w-full max-w-[1200px] m-auto z-10 px-5 lg:px-0 lg:py-0 flex ${
          PLACEMENT[placement]
        } justify-between `}
        style={isDesktop
          ? { marginTop: `${marginTop}`, marginBottom: `${marginBottom}` }
          : {
            marginTop: `${marginTopMobile || marginTop}`,
            marginBottom: `${marginBottomMobile || marginBottom}`,
          }}
      >
        <div class="lg:w-1/2 z-10">
          {device === "desktop"
            ? (
              bannerImg?.imageDesktop && (
                <Image
                  src={bannerImg.imageDesktop}
                  width={bannerImg.widthDesktop || 632}
                  height={bannerImg.heightDesktop || 372}
                  alt={bannerImg.alt}
                  loading="eager"
                  className="hidden  mx-auto lg:block"
                />
              )
            )
            : (
              bannerImg.imageMobile && (
                <Image
                  src={bannerImg.imageMobile}
                  width={bannerImg.widthMobile || 358}
                  height={bannerImg.heightMobile || 229}
                  alt={bannerImg.alt}
                  loading="eager"
                  className="block w-full mx-auto lg:hidden"
                />
              )
            )}
        </div>

        {/** content text */}
        {contentText && (
          <div
            class={`flex flex-col gap lg:w-1/2 ${
              variants[alignmentContent] === "center" && (`justify-center`)
            }`}
          >
            <div
              class={`w-full max-w-[526px] ${`${
                variants[styleContainer] === "center" ? "mx-auto" : ""
              }`}
                 `}
            >
              {contentText.title && (
                <div
                  class={clx(
                    `!flex text-20 lg:text-[40px] text-[#fff] font-black not-italic font-archimoto-black mb-6 mt-7 lg:mb-[30px] lg:mt-[12px] !leading-[120%]
                    ${
                      contentText?.addKeysInWords
                        ? "is-keys-custom"
                        : contentText?.addBar
                        ? "is-bar-custom"
                        : ""
                    }`,
                  )}
                  dangerouslySetInnerHTML={{ __html: contentText.title }}
                >
                </div>
              )}

              {/** tags */}

              {contentText.list?.tags && (
                <div>
                  <ul class="flex gap-4 pb-6">
                    {contentText.list.tags.map((tag, index) => (
                      <li key={index}>
                        {device === "desktop"
                          ? (
                            <Image
                              src={tag.iconsDesktop}
                              width={tag.widthDesktop || 135}
                              height={tag.heightDesktop || 33}
                              class=""
                            />
                          )
                          : (
                            <Image
                              src={tag.iconsMobile}
                              width={tag.widthMobile || 117}
                              height={tag.heightMobile || 33}
                              class=""
                            />
                          )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(!ishidden || device === "desktop") &&
                contentText.list?.cardInfo && (
                <div>
                  <ul class="flex gap-6 pb-6">
                    {contentText.list?.cardInfo.map((card, index) => (
                      <li
                        key={index}
                        class="flex flex-col items-center justify-center n1-custom-cardsInfo w-full max-w-[206px] py-6 px-5"
                      >
                        <span class=" font-archimoto-black text-24 lg:text-40 font-black text-[#3CCBDA]">
                          {card.percentage}
                        </span>
                        <p class=" font-noto-sans text-14 lg:text-18 font-normal text-[#fff]">
                          {card.about}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {contentText.description && (
                <div
                  class={` ${fontSizeMobile} lg:${fontSize} font-noto-sans font-normal  text-[#F3F4F7] !leading-[160%]`}
                  dangerouslySetInnerHTML={{ __html: contentText.description }}
                >
                </div>
              )}
            </div>

            {/** text List */}

            {contentText.list && (
              <div class={`flax ${variants[styleContainer]}`}>
                <ul class=" flex flex-col gap-4 ">
                  {contentText.list.textList &&
                    contentText.list.textList.map((text, index) => (
                      <li key={index} class="flex gap-4">
                        {text.descriptionList && (
                          <div class=" flex gap-4 items-start">
                            <img src={contentText.list?.iconCheck} />
                            <div
                              class={`text-14 lg:text-15 font-noto-sans font-normal  text-[#F3F4F7] !leading-[160%]
                               w-full max-w-[${widthContainerValue}]`}
                              dangerouslySetInnerHTML={{
                                __html: text.descriptionList,
                              }}
                            >
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {contentText.button && (
              <a
                href={contentText.button.link}
                target="_blank"
                className={`flex mt-6 hover:brightness-90 w-full max-w-[469px] ${
                  variants[styleContainer]
                }`}
              >
                <button className="bg-[#3CCBDA] rounded-[100px] px-[25px] py-[15px]">
                  <span className="text-16 font-black text-[#0C1F59] uppercase font-archimoto-black">
                    {contentText.button.textButton}
                  </span>
                </button>
              </a>
            )}
          </div>
        )}
      </div>

      {imageBackground && (
        <div class="absolute -top-[300px] left-0 z-0 ">
          <Image
            src={imageBackground}
            width={400}
            alt="icon background"
            class="hidden lg:block"
          />
        </div>
      )}

      {ellipse && <Ellipse ellipse={ellipse} />}
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device || "desktop",
  };
};
