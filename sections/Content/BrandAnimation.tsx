import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { type FnContext, type SectionProps } from "@deco/deco";
/** @title {{{alt}}}  */
interface PropsImage {
  /** @title Insira a imagem */
  image?: ImageWidget;
  /** @title Insira o nome da imagem */
  alt?: string;
  /** @title Insira o link da imagem */
  href?: string;
  /**
   * @title Insira a largura da imagem
   * @description (ex: 112)
   */
  width?: number;
  /**
   * @title Insira a altura da imagem
   * @description (ex: 111)
   */
  height?: number;
}
/** @title Marca */
interface Props {
  /** @title Imagem  */
  allImage: PropsImage[];
  /** @title Deseja animação ? */
  animationAction?: boolean;
  /**
   * @title Insira cor de fundo
   * @description (ex: #ffffff)
   * @format color
   */
  backgroundColor?: string;
  /**
   * @title Insira o espaço entre as imagens
   * @description (ex: 30)
   */
  columnGap?: string;
}
function BrandAnimation(props: SectionProps<ReturnType<typeof loader>>) {
  const { allImage, animationAction, backgroundColor, columnGap, device } =
    props;
  const sizeImage = allImage?.length;
  const arryTest = allImage && allImage.map(({ width }) => width);
  const sumColumn = sizeImage && columnGap
    ? sizeImage * Number(columnGap)
    : null;
  const sumAllWidthImage = arryTest &&
    arryTest.reduce((acc, curr) => acc && curr && (acc + curr));
  const sumWidthTotal = sumAllWidthImage && sumColumn &&
    sumAllWidthImage + sumColumn + (50 * 12);
  return (
    <>
      <div class="n1-brand-animation mobile:h-[250px] h-[300px] 2xl:h-[340px] overflow-x-hidden relative">
        <div class="n1-brand-animation__container mobile:top-[50px] mobile:w-[105%] mobile:pl-[10px] pl-[30px] rotate-[6.44deg] bg-[#ffffff] h-[110px] 2xl:top-[110px] w-[102%] left-[-10px] overflow-hidden top-[90px] relative">
          <div
            class={`n1-brand-animation__wrapper ${
              animationAction ? "animation-section-brand rotate-[6.44deg]" : ""
            }`}
            style={{
              minWidth: `${device === "desktop" ? "1690px" : "2750px"}`,
            }}
          >
            <div class="n1-brand-animation__wrapper-item">
              <div
                class="n1-brand-animation__wrapper-slide"
                style={{
                  width: sumWidthTotal && device === "desktop"
                    ? sumWidthTotal + "px"
                    : sumWidthTotal && device === "mobile"
                    ? "initial"
                    : "3700px",
                  display: "grid",
                  gridTemplateColumns: `repeat(${sizeImage}, auto)`,
                  columnGap: `${columnGap ? columnGap + "px" : "30px"}`,
                  backgroundColor: `${
                    backgroundColor ? backgroundColor : "#ffffff"
                  }`,
                }}
              >
                {allImage &&
                  allImage.map(({ alt, image, width, height, href }) => {
                    if (!image) {
                      return null;
                    }
                    return (
                      <>
                        {image && (
                          <a
                            href={`${href ? href : "javascript:void(0)"}`}
                            style={{
                              pointerEvents: `${href ? "all" : "none"}`,
                            }}
                          >
                            <Image
                              style={{ minWidth: width ? width : "112px" }}
                              src={image}
                              alt={alt ? alt : "Marca"}
                              width={width ? width : 112}
                              height={height ? height : 111}
                              loading="lazy"
                            />
                          </a>
                        )}
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};
export default BrandAnimation;
