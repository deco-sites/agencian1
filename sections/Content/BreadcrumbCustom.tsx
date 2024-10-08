interface BreadcrumbItem {
  /**@title Nome da Categoria */
  /**@description (ex: Serviços) */
  category?: string;
  /**@title Nome da Subategoria */
  /**@description (ex: Implantação) */
  subcategory?: string;
}

interface Breadcrumb {
  /**@title Itens */
  /**@maxItems 1 */
  items?: BreadcrumbItem[];
}

function Breadcrumb({ items }: Breadcrumb) {
  return (
    <>
      <div class="n1-breadcrumb md:n1-container md:px-[120px] mobile:px-[20px] py-[40px]">
        <ul class="text-[#ffffff] flex gap-x-[35px] rounded-[100px] bg-[rgba(255,_255,_255,_0.10)] p-[20px] font-archimoto-medium text-14 font-black">
          {items && items?.map(({ category, subcategory }) => {
            const categoryScape = category?.normalize("NFD").replaceAll(
              /[\u0300-\u036f]/g,
              "",
            ).replaceAll(/\s/g, "-").toLowerCase();

            return (
              <>
                {category && (
                  <>
                    <li class="relative">
                      <a href={"/"} class="n1-breadcrumb__item hover:underline">
                        Home
                      </a>
                    </li>
                    <li class="relative">
                      <a
                        href={`/${subcategory ? categoryScape : "#"}`}
                        style={{ pointerEvents: subcategory ? "all" : "none" }}
                        class={`${
                          !subcategory
                            ? "text-secondary after:content-[initial]"
                            : "hover:underline"
                        } n1-breadcrumb__item `}
                      >
                        {category}
                      </a>
                    </li>
                    {subcategory && (
                      <li class="relative">
                        <a class="text-secondary">
                          {subcategory}
                        </a>
                      </li>
                    )}
                  </>
                )}
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Breadcrumb;
