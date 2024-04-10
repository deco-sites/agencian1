import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Banner {
  /** @title Imagem Desktop */
  desktop: ImageWidget;
  /** @title Imagem Mobile */
  mobile: ImageWidget;
  /** @title Alt */
  alt: string;

  action?: ActionProps;

  /** @format html */
  subTitle?: string;

  /** @format html */
  description?: string;
}

interface ActionProps {
  /** @title link */
  /** @description (ex: https://agencian1.com.br/) */
  href: string;
  /** @title Título da imagem */
  title: string;
  /** @title Subtítulo da imagem */
  subTitle: string;
  /** @title Texto do botão */
  label: string;
}

export function BannerItem(
  { image, lcp, id, title }: {
    image: Banner;
    lcp?: boolean;
    id: string;
    title?: string;
  },
) {
  const {
    alt,
    mobile,
    desktop,
    description,
    subTitle,
    action,
  } = image;

  return (
    <div class="flex flex-col-reverse lg:flex-row lg:px-16 justify-end w-full items-center">
      <div class="flex flex-col w-full max-w-[583px]  h-auto lg:h-[200px]">
        {subTitle && (
          <div
            class=" text-14 lg:text-24  font-archimoto-black font-black  text-[#F3F4F7] !leading-[120%] mt-6 "
            dangerouslySetInnerHTML={{ __html: subTitle }}
          >
          </div>
        )}
        {description && (
          <div
            class=" text-14 lg:text-16 font-noto-sans font-normal  text-[#F3F4F7] !leading-[160%] mt-5  w-full max-w-[530px]"
            dangerouslySetInnerHTML={{ __html: description }}
          >
          </div>
        )}
      </div>

      <div class="w-full overflow-y-hidden rounded-[20px] max-w-[623px] h-[289px] md:h-auto">
        <a
          id={id}
          href={action?.href ?? "#"}
          aria-label={action?.label}
          class=" overflow-y-hidden w-full"
        >
          <Picture preload={lcp}>
            <Source
              media="(max-width: 767px)"
              fetchPriority={lcp ? "high" : "auto"}
              src={mobile}
              width={390}
              height={289}
            />
            <Source
              media="(min-width: 768px)"
              fetchPriority={lcp ? "high" : "auto"}
              src={desktop}
              width={1440}
              height={600}
            />
            <img
              class="mobile:h-auto mobile:max-w-full object-cover w-full h-full"
              loading={lcp ? "eager" : "lazy"}
              src={desktop}
              alt={alt}
            />
          </Picture>
        </a>
      </div>
    </div>
  );
}
