import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { SectionProps } from "deco/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

/** @titleBy alt */
interface ImageGeneric {
  /**@title Imagem */
  image: ImageWidget;
  /**@title largura da imagem */
  /**@description (ex: 600) */
  width: string;
  /**@title Altura da imagem */
  /**@description (ex: 300) */
  height: string;
  // Nome da Imagem
  alt: string;
}

interface ImageProps {
  /** @description Image for big screens */
  desktop: ImageGeneric;
  /** @description Image for small screens */
  mobile: ImageGeneric;
}

/**
 * @titleBy matcher
 */
export interface Banner {
  /** @description Para habilitar este banner na URL atual. Usuário /feminino/* para exibir este banner na categoria feminina  */
  matcher: string;
  /** @description Título a ser renderizado no topo da imagem */
  title?: string;
  /** @description Subtítulo a ser renderizado no topo da imagem */
  subtitle?: string;
  /**@title Imagem */
  images: ImageProps;
}

function Banner(props: SectionProps<ReturnType<typeof loader>>) {
  const { banner } = props;

  if (!banner) {
    return null;
  }

  const { title, subtitle, images } = banner;

  // console.log('images --> ', images)

  return (
    <div class="grid grid-cols-1 grid-rows-1">
      <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        {images && images?.desktop && images.desktop?.image &&
          images.desktop?.width && images.desktop?.height && (
          <Source
            src={images.desktop.image}
            width={Number(images.desktop.width)}
            height={Number(images.desktop.height)}
            media="(min-width: 768px)"
          />
        )}

        {images && images?.mobile && images.mobile?.image &&
          images.mobile?.width && images.mobile?.height && (
          <Source
            src={images.mobile.image}
            width={Number(images.mobile.width)}
            height={Number(images.mobile.height)}
            media="(max-width: 767px)"
          />
        )}
        {images && images?.desktop && images.desktop?.image &&
          images.desktop?.width && images.desktop?.height && (
          <img
            class="w-full"
            src={images.desktop.image}
            alt={images.desktop?.alt ?? title}
          />
        )}
      </Picture>

      <div class="container flex flex-col items-center justify-center sm:items-start col-start-1 col-span-1 row-start-1 row-span-1 w-full">
        <h1>
          <span class="text-5xl font-medium text-base-100">
            {title}
          </span>
        </h1>
        <h2>
          <span class="text-xl font-medium text-base-100">
            {subtitle}
          </span>
        </h2>
      </div>
    </div>
  );
}

export interface Props {
  /**@maxItems 1 */
  banners?: Banner[];
}

export const loader = (props: Props, req: Request) => {
  const { banners } = props;

  const banner = banners?.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { banner };
};

export default Banner;
