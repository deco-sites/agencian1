import { type SectionProps } from "@deco/deco";
import { type ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "site/sdk/clx.ts";
import Image from "apps/website/components/Image.tsx";
import { detectDevice } from "site/sdk/deviceDetection.ts";

interface HeroProps {
  /**
   * @title Título
   */
  title: string;
  /**
   * @title Descrição
   */
  description: string;
  /**
   * @title Imagem
   * @description A imagem será exibida apenas no Desktop
   */
  image: ImageWidget;
  /**
   * @title Largura da imagem
   * @description A largura será limitada a 500px
   */
  imageWidth: number;
  /**
   * @title Altura da imagem
   * @description A altura será limitada a 280px
   */
  imageHeight: number;
  /**
   * @title Alt da imagem
   */
  imageAlt: string;
  /**
   * @ignore
   */
  isBlogListPage: boolean;
  /**
   * @ignore
   */
  isMobile: boolean;
}

export default function BlogHero({
  title,
  description,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  isBlogListPage,
  isMobile,
}: SectionProps<typeof loader>) {
  if (!title || !description) return null;

  const HeadingTag = isBlogListPage ? "h1" : "span";

  return (
    <div
      class={clx(
        "w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800",
        "h-fit mobile:h-[260px]",
        "flex relative",
      )}
    >
      <div class="absolute inset-0 bg-gradient-to-t from-transparent via-secondary/30 to-transparent backdrop-blur-sm">
      </div>
      <div
        class={clx(
          "md:n1-container md:px-[120px] mobile:px-[20px]",
          "flex justify-center items-center gap-8",
          "w-full relative",
        )}
      >
        {/* Left Content */}
        <div class="w-[440px] py-[30px] text-white tablet:w-full mobile:w-full flex-shrink-0">
          <div class="inline-flex items-center text-60 mobile:text-40 font-mono font-bold font-archimoto-black w-full">
            <span class="text-secondary">{"{"}</span>
            <HeadingTag>{title}</HeadingTag>
            <span class="text-secondary">{"}"}</span>
          </div>
          {description && (
            <p class="text-18 leading-7 mobile:text-14 max-w-md font-noto-sans mt-2">
              {description}
            </p>
          )}
        </div>

        {/* Right Content - Illustration */}
        {!isMobile && (
          <div class="max-w-[500px] flex flex-shrink-0 justify-center">
            {image && (
              <Image
                src={image}
                class="w-full object-contain"
                width={imageWidth > 500 ? imageWidth : 500}
                height={imageHeight > 330 ? imageHeight : 330}
                loading="eager"
                alt={imageAlt || "Hero image"}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function loader(props: HeroProps, req: Request) {
  const path = req.url.split("/blog")[1] || "";
  const isBlogListPage = path === "" || path === "/";

  const { isMobile } = detectDevice(req.headers.get("user-agent") || "");

  return { ...props, isBlogListPage, isMobile };
}
