import { clx } from "$store/sdk/clx.ts";

interface Thead {
  th?: string;
  textCenter?: boolean;
}

interface Td {
  name?: string;
  td?: string;
  textCenter?: boolean;
}

interface Tbody {
  name?: string;
  row: Td[];
}

interface Table {
  thead?: Thead[];
  tbody?: Tbody[];
}

interface Props {
  table?: Table;
}

function PolicyTable({ table }: Props) {
  return (
    <>
      {table && (
        <table
          class={clx(
            `                                                            
                        n1-policy__table border-separate border-spacing-0 
                        rounded-tr-[10px] rounded-tl-[10px] rounded-bl-[20px] rounded-br-[20px]
                        ${table.thead?.length === 2 ? "is-two-column" : ""}
                    `,
          )}
        >
          <tr>
            {table.thead && table.thead?.length > 0 &&
              table.thead.map(({ th, textCenter }) => {
                return (
                  <th
                    class={clx(`
                                        font-archimoto-medium text-24 font-black bg-accent text-primary 
                                        p-[10px] md:py-[16px] md:px-[10px] first:rounded-tl-[10px] last:rounded-tr-[10px]
                                        ${textCenter ? "text-center" : ""}
                                    `)}
                  >
                    {th}
                  </th>
                );
              })}
          </tr>

          {table.tbody && table.tbody?.length > 0 &&
            table.tbody.map(({ row }) => (
              <tr>
                {row && row.map(({ td, textCenter }) => {
                  return (
                    <>
                      {td && (
                        <td
                          class={clx(`
                                                    [&_*]:font-noto-sans [&_*]:text-[14px] py-[14px] px-[30px]                                                                                    
                                                    ${
                            textCenter ? "text-center" : ""
                          }
                                                `)}
                          dangerouslySetInnerHTML={{ __html: td }}
                        >
                        </td>
                      )}
                    </>
                  );
                })}
              </tr>
            ))}
        </table>
      )}
    </>
  );
}

export default PolicyTable;
