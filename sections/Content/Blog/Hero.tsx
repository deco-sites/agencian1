import { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "site/sdk/clx.ts";

export interface Props {
  /** @title Título */
  title: string;
  /** @title Descrição */
  description: string;
  /** @title Imagem */
  image: ImageWidget;
}

export default function BlogHero({ title, description, image }: Props) {
  if (!title || !description) return null;
  return (
    <div
      class={clx(
        "w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 min-h-[360px] mobile:min-h-[260px] relative",
        image ? "flex" : "flex-col",
      )}
    >
      <div class="absolute inset-0 bg-gradient-to-t from-transparent via-[#3CCBDA]/30 to-transparent backdrop-blur-sm">
      </div>
      <div
        class={clx(
          "md:n1-container md:px-[120px] mobile:px-[20px] py-[40px] mobile:py-[20px]",
          "flex justify-center items-center tablet:justify-start mobile:justify-start py-3 gap-[50px] relative",
        )}
      >
        {/* Left Content */}
        <div class="w-[440px] text-[#FFF] tablet:w-full mobile:w-full">
          <h1 class="text-60 mobile:text-40 font-mono font-bold font-archimoto-black text-left">
            <span class="text-secondary">{"{"}</span>
            <span>{title}</span>
            <span class="text-secondary">{"}"}</span>
          </h1>
          {description && (
            <p class="text-18 leading-7 mobile:text-14 max-w-md font-noto-sans mt-2 text-left">
              {description}
            </p>
          )}
        </div>

        {/* Right Content - Illustration */}
        {image && (
          <div class="w-1/2 mobile:hidden tablet:hidden">
            <img
              src={image}
              class="w-full max-w-lg object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}