import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { FnContext } from "deco/types.ts";

export interface Technology {
  /** @title Icon services desktop */
  IconDesktop: ImageWidget;
  /** @title Icon services mobile */
  IconMobile: ImageWidget;

  services: string;
}

interface ImageDevice{
  /** @title Imagem */  
  src: ImageWidget;
  /** @title Largura */    
  width?: string;
  /** @title Altura */    
  height?: string;
  /** @title Nome da Imagem */    
  alt?:string
}

export interface CardCases {
  /** @title Image card desktop */
  imgCardDesktop: ImageWidget;

  alt: string;

  /** @description widht ex: 580 */
  widthDesktop?: number;
  /** @description height ex: 430 */
  heightDesktop?: number;

  /** @title Image card mobile */

  imgCardMobile: ImageWidget;

  /** @description widht ex: 350 */
  widthMobile?: number;
  /** @description height ex: 342 */
  heightMobile?: number;

  /** @title  Logo store desktop */
  imgIconStoreDesktop: ImageDevice;

  /**@title Logo store mobile */
  imgIconStoreMobile: ImageDevice;

  link: string;
  buttonName: string;
  technology: Technology[];
}

export interface Props {
  /** @title Icon do background bottom */
  IconBackgroundBottom?: ImageWidget;
  
  iconBackgroundTop?: ImageWidget;
  
  /** @title Ocultar eclipse de fundo? */
  iconBackgroundLeftBottom?: boolean;

  /** @description Adicione os Cases */
  cardCases?: CardCases[];
}

export default function Cases(props: Props & { device: string }) {
  if (!props.cardCases) {
    return null;
  }

  return (
    <div className="py-16 lg:py-[100px] relative">
      <div className="px-4 md:px-28 grid md:grid-cols-1 lg:grid-cols-2 md:gap-3 gap-9 relative z-10">
        {props.cardCases.map((card, index) => (
          <div
            className="flex items-center justify-center w-full md:mb-8 z-10"
            key={index}
          >
            <div className="relative w-dull max-w-[580px] md:max-h-[430px] rounded-[20px] overflow-hidden">
              <div className="absolute top-0 left-0 n1-card-service">
                <div className=" pl-5 pt-6 md:pl-9 md:pt-9 flex gap-4">
                  {card.technology.map((tech, techIndex) => (
                    <div key={techIndex} className="z-10">
                      {props.device === "desktop"
                        ? (
                          <Image
                            src={tech.IconDesktop}
                            width={99}
                            height={33}
                            className="z-20 hidden md:block"
                            loading="lazy"
                          />
                        )
                        : (
                          <Image
                            src={tech.IconMobile}
                            width={107}
                            height={38}
                            className="z-10 block md:hidden"
                            loading="lazy"
                          />
                        )}
                    </div>
                  ))}
                </div>
              </div>

              {props.device === "desktop" && card.imgCardDesktop && (
                <a href={card.link}>
                  <Image
                    src={card.imgCardDesktop}
                    alt={card.alt}
                    width={card.widthDesktop ?? 580}
                    height={card.heightDesktop ?? 430}
                    loading="lazy"
                    className="hidden md:block rounded-[20px] ease-linear duration-300 hover:scale-105 hover:transition hover:ease-linear hover:duration-300"
                  />
                </a>
              )}

              {props.device !== "desktop" && card.imgCardMobile && (
                <a href="/">
                  <Image
                    src={card.imgCardMobile}
                    alt={card.alt}
                    width={card.widthMobile ?? 350}
                    height={card.heightMobile ?? 342}
                    loading="lazy"
                    className="block md:hidden rounded-[20px] transition ease-linear delay-75 hover:scale-105"
                  />
                </a>
              )}

              <div className="absolute flex justify-center items-center bottom-0 left-0 w-full md:px-11 md:py-4 pt-3 px-5 pb-3 n1-custon-container-buttons-service rounded-b-[20px] h-[64px] md:h-[91px]">
                <div className="flex items-center justify-between w-full max-w-[490px]">
                
                <Picture>
                  {card.imgIconStoreMobile?.src && card.imgIconStoreMobile?.width && card.imgIconStoreMobile?.height && (
                    <Source
                      media="(max-width: 767px)"
                      src={card.imgIconStoreMobile.src}
                      width={Number(card.imgIconStoreMobile?.width)}
                      height={Number(card.imgIconStoreMobile?.height)}
                    />
                  )}
                  {card.imgIconStoreDesktop?.src && card.imgIconStoreDesktop?.width && card.imgIconStoreDesktop?.height && (
                    <Source
                      media="(min-width: 768px)"
                      src={card.imgIconStoreDesktop.src}
                      width={Number(card.imgIconStoreDesktop.width)}
                      height={Number(card.imgIconStoreDesktop.height)}
                    />
                  )}
                  <img
                    src={card.imgIconStoreDesktop?.src}
                    width={card.imgIconStoreDesktop?.width}
                    height={card.imgIconStoreDesktop?.height}
                  />
                </Picture>                  

                  {card.link && card.buttonName && (
                    <a
                      href={card.link}
                      className="md:w-36 flex gap-2 border border-[#fff]  px-3 pb-3 pt-3 rounded-[100px] justify-center items-center min-w-[145px] text-[#ffff] cursor-pointer hover:bg-[#fff] hover:text-[#494848]"
                    >
                      <button
                        type="button"
                        className="text-[14px] font-black font-archimoto-regular uppercase hover:text-[#494848] "
                      >
                        {card.buttonName}
                      </button>
                      <Icon
                        id="ArrowMoreInfor"
                        size={18}
                        strokeWidth={2}
                        fill={`blue`}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {props.device === "desktop" && (
        <>
          {props.IconBackgroundBottom && (
            <div className="hidden md:block absolute -bottom-[150px] right-0">
              <Image
                src={props.IconBackgroundBottom}
                alt="icon background"
                width={450}
                height={133}
                loading="lazy"
              />
            </div>
          )}

          {props.iconBackgroundTop && (
            <div className="hidden md:block absolute -top-[150px] right-0 z-10">
              <Image
                src={props.iconBackgroundTop}
                alt="icon background"
                width={450}
                height={133}
                loading="lazy"
              />
            </div>
          )}

          <div className={`${!props.iconBackgroundLeftBottom ? 'is-active--bottom' : '' }  n1-cases__item hidden md:flex absolute bottom-0 left-0 z-0 rotate-180`}></div>
        </>
      )}
    </div>
  );
}

export const loader = (
  props: Props,
  _req: Request,
  ctx: FnContext,
) => {
  const device = ctx.device;
  return {
    ...props,
    device: device || "desktop",
  };
};
