import Icon from "deco-sites/agencian1/components/ui/Icon.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { propsLoader } from "deco/blocks/propsLoader.ts";
import Image from "apps/website/components/Image.tsx";
import EllipseSnippet from "deco-sites/agencian1/components/ui/EllipseSnippet.tsx";
import Ellipse from "deco-sites/agencian1/components/ui/Ellipse.tsx";
import { FnContext } from "deco/types.ts";

export interface Ellipse {
  horizontal: "left" | "center" | "right";
  vertical: "top" | "center" | "bottom";
  width: "100" | "200" | "300";
  height: "100" | "200" | "300";
  color: "yellow" | "blue";
  activeDesktop?: boolean;
  activeMobile?: boolean;
}

/** @title {{{description}}}  */
export interface Lists {
  /** @title Descrição */
  /** @format html */
  description: string;
}
export interface Props {
  /** @title Título */
  /** @format html */
  title?: string;

  titleStyle: {
    alignment?: "center" | "left" | "right";
  };

  /**@description Quantidade de colunas */
  columns?: "1" | "2" | "3" | "4";

  /**@title Lista */
  lists: Lists[];

  /** @description Largura máxima do container de lista */
  maxWidth?: "285" | "392";

  /** @description Icon backgroud */
  icon?: ImageWidget;

  ellipse?: Ellipse;

  activeBackgroundImage: boolean;
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
}

const positionTitle: { [key: string]: string } = {
  center: "text-center",
  left: "text-left",
  right: "text-right",
};

const containerMaxWidth = {
  285: "285",
  392: "392",
};

const qtyColumns = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

export default function BenefitsList(
  {
    title,
    marginBottom,
    marginTop,
    marginBottomMobile,
    marginTopMobile,
    lists,
    icon,
    activeBackgroundImage,
    titleStyle,
    maxWidth = "285",
    columns = "4",
    ellipse,
    device,
  }: Props & { device?: string },
) {
  const { alignment = "center" } = titleStyle || {};

  const isDesktop = device === "desktop";

  return (
    <div
      className={`relative w-full overflow-x-clip ${
        activeBackgroundImage && (`n1-custom-bg-img md:n1-custom-bg-img-2`)
      }`}
      style={isDesktop
        ? { marginTop: `${marginTop}`, marginBottom: `${marginBottom}` }
        : {
          marginTop: `${marginTopMobile || marginTop}`,
          marginBottom: `${marginBottomMobile || marginBottom}`,
        }}
    >
      <div
        className={`w-full max-w-[1200px] m-auto pb-20 md:py-[70px] px-5`}
      >
        {title && (
          <div
            className={`w-full text-20 lg:text-48 text-[#fff] font-black not-italic font-archimoto-black mb-8 ${
              positionTitle[alignment] ?? "text-left"
            }`}
            dangerouslySetInnerHTML={{ __html: title }}
          >
          </div>
        )}

        <ul
          className={`grid grid-cols-1 ${
            qtyColumns[columns]
          }  lg:grid-cols-3 gap-8 justify-evenly"`}
        >
          {lists && lists?.length > 0 &&
            lists.map((list, index) => (
              <li className="flex justify-center items-center gap-5 n1-custom-card-benefits py-4 px-4">
                <div
                  className={`flex justify-center items-center gap-4 w-full   max-w-[${
                    containerMaxWidth[maxWidth]
                  }px]`}
                >
                  <div className="w-9 h-9">
                    <Icon
                      id="Check"
                      size={36}
                      strokeWidth={2}
                      className=" text-center"
                    />
                  </div>

                  <div
                    className="text-14 text-[#F3F4f7] font-normal font-noto-sans !leading-[140%]"
                    dangerouslySetInnerHTML={{ __html: list.description }}
                  >
                  </div>
                </div>
              </li>
            ))}
        </ul>

        {icon && (
          <Image
            src={icon}
            width={200}
            height={200}
            alt="icon"
            className="absolute -top-20 left-0 hidden md:block"
            loading="lazy"
          />
        )}

        {ellipse && <Ellipse ellipse={ellipse} />}
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
