import type { ImageWidget } from "apps/admin/widgets.ts";

/**@titleBy alt */
interface Image {
  /**@title Imagem */
  src?: ImageWidget;
  /**@title Largura da Imagem */
  width?: number;
  /**@title Altura da Imagem */
  height?: number;
  /**@title Nome da Imagem */
  alt?: string;
}

interface Props {
  /**@title Título */
  /**@format html */
  title?: string;
  /**@title Marca */
  /**@format maxItems 50 */
  /**@description (limite 50 itens) */
  brand?: Image[];
}

function BrandImage({ title, brand }: Props) {
  return (
    <>
      <div class="md:n1-container md:px-[120px]">
        <div class="mobile:px-[20px] pt-[80px] pb-[30px]">
          {title && title !== '<p><br data-mce-bogus="1"></p>' && (
            <div
              class="[&_*]:font-archimoto-medium mobile:text-32 text-48 font-black text-[#ffffff] mobile:pb-[30px] pb-[40px]"
              dangerouslySetInnerHTML={{ __html: title }}
            >
            </div>
          )}
          <div class="relative z-10 grid mobile:grid-cols-3-auto tablet:grid-cols-4-auto md:grid-cols-5-auto mobile:gap-[10px] gap-[40px]">
            {brand && brand.map(({ src, width, height, alt }) => {
              return (
                <>
                  {src && width && height && (
                    <img
                      class="mobile:w-[110px] mobile:h-[80px]"
                      src={src}
                      width={width}
                      height={height}
                      alt={`${alt ? alt : "Marcas"}`}
                    />
                  )}
                </>
              );
            })}

            <div class="hidden md:flex w-[839px] h-[336px] rounded-full bottom-0 right-0 absolute -z-10 opacity-40 bg-accent filter blur-[92px]">
            </div>
            <div class="hidden md:flex -right-[100px] w-[445px] absolute bottom-[0] h-[336px] rounded-full -z-50 opacity-30 bg-secondary filter blur-[92px]">
            </div>
            <div class="hidden md:flex w-[464px] h-[336px] md:absolute md:bottom-[0] md:-z-10 left-0 md:opacity-50 bg-[linear-gradient(180deg,_#F6AB00_0%,_rgba(246,_171,_0,_0.00)_100%)] filter blur-[92px]">
            </div>
            <div class="hidden md:flex left-[260px] w-[445px] h-[336px] -z-20 absolute bottom-[0] rounded-full opacity-30 bg-secondary filter blur-[92px]">
            </div>
            <div class="hidden md:flex -left-[300px] w-[445px] h-[336px] absolute -z-20 bottom-[0] rounded-full opacity-30 bg-secondary filter blur-[92px]">
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BrandImage;
