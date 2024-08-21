import { clx } from "$store/sdk/clx.ts";
import PolicyTable from "site/components/ui/PolicyTable.tsx";

/**@titleBy th */
interface Thead {
  /**@title Título */
  th?: string;
  /**@title Título centralizado? */
  textCenter?: boolean;
}

/**@titleBy name */
interface Td {
  /**@title Nome da Coluna */
  name?: string;
  /**
   * @title Dados da Coluna
   * @format rich-text
   */
  td?: string;
  /**@title Texto centralizado? */
  textCenter?: boolean;
}

/**@titleBy name */
interface Tbody {
  /**@title Linha */
  name?: string;
  /**
   * @title Coluna
   * @maxItems 4
   * @description (max: 4)
   */
  row: Td[];
}

interface Table {
  /**
   * @title Cabeçalho
   * @maxItems 4
   * @description (max: 4)
   */
  thead?: Thead[];
  /**@title Dados da Tabela */
  tbody?: Tbody[];
}

/**@titleBy name */
interface Accordion {
  /**@title Nome do Bloco */
  name?: string;
  /**@title Título */
  title?: string;
  /**
   * @title Descrição
   * @format rich-text
   */
  description?: string;
  /** @title Existe fonte Archimoto? (Se sim, tranforme-o em H4) */
  existsFontArchimoto?: boolean;
  /**@title Existe Bullet List (ordenação com pontos) Colorido? */
  existsBulletListColor?: boolean;
  /**@title Abrir accordion para edição de texto (selecionar somente para edição) */
  allAccordionOpen?: boolean;
  /**@title Tabela */
  table?: Table;
  /**@title desabilitar Tabela? */
  disableTable?: boolean;
  /**
   * @title Texto pós tabela
   * @format rich-text
   */
  descriptionAfterTable?: string;
}

interface Props {
  /**
   * @title Título
   * @format rich-text
   */
  title?: string;
  accordion?: Accordion[];
  /**@title Deixa 1° accordion aberto? */
  accordionOpen?: boolean;
}

function Policy({ title, accordion, accordionOpen }: Props) {
  return (
    <>
      <div class={`n1-policy md:n1-container md:px-[120px] text-[#ffffff]`}>
        <div
          class={clx(`mb-[100px] px-[16px] md:px-0`)}
        >
          {title && (
            <div
              class={clx(
                `[&_*]:font-noto-sans [&_*]:text-[14px] [&_*]:leading-[25.2px]`,
              )}
              dangerouslySetInnerHTML={{ __html: title }}
            >
            </div>
          )}

          {accordion && (
            <div
              class={clx(`flex flex-col gap-y-[50px] mt-[20px] `)}
            >
              {accordion && accordion.length > 0 &&
                accordion.map((item, index) => {
                  return (
                    <>
                      {item.title && (
                        <details
                          open={index === 0 && accordionOpen
                            ? true
                            : item.allAccordionOpen
                            ? true
                            : false}
                        >
                          <summary
                            class={clx(`
                                                font-archimoto-medium text-[18px] leading-[21.6px] font-black marker:content-[""] 
                                                rounded-[100px] bg-[linear-gradient(161deg,_rgba(255,_255,_255,_0.10)_0%,_rgba(255,_255,_255,_0.05)_101.7%)]
                                                py-[13px] px-[26px] relative cursor-pointer`)}
                          >
                            {item.title}
                          </summary>

                          {item.description && (
                            <div
                              class={clx(
                                `                                                    
                                                    n1-policy__description [&_*]:list-[unset] py-[14px] px-[20px] 
                                                    [&_*]:font-noto-sans [&_*]:text-[14px] [&_*]:leading-[22.4px]
                                                    ${
                                  item?.existsFontArchimoto
                                    ? "exists-archimoto"
                                    : ""
                                }
                                                    ${
                                  item.existsBulletListColor
                                    ? "exists-bullet"
                                    : ""
                                }
                                                `,
                              )}
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            >
                            </div>
                          )}

                          {item?.table && item.table.thead &&
                            item.table.thead?.length > 0 &&
                            !item.disableTable && (
                            <div
                              class={clx(
                                `overflow-auto md:overflow-hidden px-[20px]`,
                              )}
                            >
                              <PolicyTable table={item.table} />

                              {item?.descriptionAfterTable && (
                                <div
                                  class={clx(`
                                                            [&_*]:font-noto-sans [&_*]:text-[14px] pt-[16px] md:px-[30px]`)}
                                  dangerouslySetInnerHTML={{
                                    __html: item.descriptionAfterTable,
                                  }}
                                >
                                </div>
                              )}
                            </div>
                          )}
                        </details>
                      )}
                    </>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Policy;
