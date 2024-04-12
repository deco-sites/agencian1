import { clx } from "$store/sdk/clx.ts";

interface Props {
  nameItemScape?: string;
  mobile?: boolean;
  selectedLanguage?:string;
}

function handleOnClick(id:string){
  document.cookie = `N1_SelectedLanguage=${id};path=/`;
  globalThis?.window.location.reload();
}

function Legend({ nameItemScape, mobile, selectedLanguage }: Props) {
  const legend = [
    { language: "Espanhol", code: "es-es" },
    { language: "Inglês", code: "en-en" },
    { language: "Português", code: "pt-br" },
  ];

  const idioma = [
    {"pt-br": "Idioma"},
    {"es-es": "Idioma"},
    {"en-en": "Language"},
  ]

  console.log('selectedLanguage Legend --> ', selectedLanguage)

  return (
    <>
      <li
        class={clx(
          `mobile:font-black mobile:flex-col mobile:items-start mobile:py-[20px] n1-header__navlink--active 
                hover:before:rotate-[-135deg] duration-300 hover:after:rotate-[135deg] pr-[35px] group flex items-center 
                text-16 font-archimoto-medium uppercase legend relative is-${nameItemScape}`,
        )}
      >
        {!mobile && (
          <img
            class="w-[36px] h-[24px] min-w-[36px]"
            src={`/image/header-item-menu-${selectedLanguage}.png`}
            loading="lazy"
          />
        )}
        {selectedLanguage && mobile && (
          <span class={`mobile:ml-[20px] text-14`}>{idioma[selectedLanguage]}</span>
        )}
        <ul
          class={clx(
            `mobile:ml-[20px] md:absolute md:hidden top-full hover:flex right-[-50px] 
                        group-hover:flex w-[180px] z-50 flex-col gap-[8px] items-start justify-center`,
          )}
        >
          <li
            class={`mobile:px-0 mobile:py-0 mobile:gap-x-[20px] flex bg-[#fff] rounded-[10px]  items-start md:flex-col w-full gap-y-[8px] px-[8px] py-[10px] mt-[15px]`}
          >
            {legend.map(({ language, code }) => {
              return (
                <>
                  <a
                    onClick={() => handleOnClick(code)}
                    class={clx(
                      `mobile:px-0 mobile:py-0 mobile:mx-0 mobile:my-0 flex items-center capitalize rounded-[10px]
                                            py-[8px] bg-[#fff] duration-100 text-primary w-full md:hover:bg-primary hover:text-[#fff]`,
                    )}
                  >
                    {mobile && (
                      <img
                        class="pointer-events-none mx-0 w-[40px] h-[40px]"
                        src={`/image/header-sub-menu-${code}-mobile.png`}
                      />
                    )}
                    {!mobile && (
                      <>
                        <img
                          class="w-[20px] h-[20px] mr-[10px] ml-[20px]"
                          src={`/image/header-sub-menu-${code}.png`}
                        />
                        <span class="text-14 font-noto-sans">{language}</span>
                      </>
                    )}
                  </a>
                </>
              );
            })}
          </li>
        </ul>
      </li>
    </>
  );
}

export default Legend;
