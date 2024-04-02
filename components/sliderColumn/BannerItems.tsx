import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

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

/**
 * @titleBy alt
 */
interface Banner {
  /** @title Imagem Desktop */
  desktop: ImageWidget;
  /** @title Imagem Mobile */
  mobile: ImageWidget;
  /** @title Texto da imagem */
  alt: string;
  action?: ActionProps;
}

export function BannerItem(
  { image, lcp, id }: { image: Banner; lcp?: boolean; id: string },
) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;

  return (
    <>
      <div class="w-full overflow-y-hidden">
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
              height={590}
            />
            <Source
              media="(min-width: 768px)"
              fetchPriority={lcp ? "high" : "auto"}
              src={desktop}
              width={1440}
              height={600}
            />
            <img
              class="mobile:object-none mobile:h-auto mobile:max-w-full object-cover w-full h-full"
              loading={lcp ? "eager" : "lazy"}
              src={desktop}
              alt={alt}
            />
          </Picture>
        </a>
      </div>
    </>
  );
}
