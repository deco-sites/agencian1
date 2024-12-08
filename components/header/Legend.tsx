import { clx } from "$store/sdk/clx.ts";

interface Props {
  nameItemScape?: string;
  mobile?: boolean;
  selectedLanguage?: string;
}

function setCookie(cname: string, cvalue: string) {
  document.cookie = cname + "=" + cvalue + ";path=/";
}

function handleOnClick(id: string) {
  setCookie("N1_SelectedLanguage", id);

  setTimeout(() => {
    globalThis?.window.location.reload();
  }, 500);
}

function Legend({ nameItemScape, mobile, selectedLanguage }: Props) {
  const legend = [
    { language: "Espanhol", code: "es-es" },
    { language: "Inglês", code: "en-en" },
    { language: "Português", code: "pt-br" },
  ];

  const idioma = {
    "pt-br": "Idioma",
    "es-es": "Idioma",
    "en-en": "Language",
  };

  return (
    <>
      <li
        class={clx(
          `mobile:font-black mobile:flex-col mobile:items-start mobile:py-[20px] n1-header__navlink--active 
           duration-300 group flex items-center text-16 font-archimoto-medium uppercase legend 
           relative pr-[25px] pl-[10px] cursor-pointer hover:is-active md:hover:before:rotate-[135deg] md:before:right-[0]
           md:hover:after:rotate-[45deg] md:hover:before:border-secondary md:hover:after:border-secondary md:after:-right-[7px] 
           md:hover:text-secondary is-${nameItemScape}`,
        )}
      >
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded="false"
          aria-label={`${idioma[selectedLanguage as keyof typeof idioma]} menu`}
          class="flex items-center"
        >
          <img
            class="hidden md:flex w-[36px] h-[24px] min-w-[36px]"
            src={`/image/header-item-menu-${selectedLanguage}.png`}
            alt={`${selectedLanguage} - ${
              idioma[selectedLanguage as keyof typeof idioma]
            }`}
            loading="lazy"
          />

          {selectedLanguage && (
            <span
              class={`mobile:ml-[10px] mobile:flex hidden text-14 font-archimoto-medium text-accent-content`}
            >
              {idioma[selectedLanguage as keyof typeof idioma]}
            </span>
          )}
        </button>

        <ul
          class={clx(
            `mobile:ml-[10px] md:absolute md:hidden top-full hover:flex right-[-50px] 
             group-hover:flex w-[180px] z-50 flex-col gap-[8px] items-start justify-center`,
          )}
        >
          <li
            class={`mobile:px-0 mobile:py-0 mobile:gap-x-[20px] flex bg-[#fff] rounded-[10px] items-start md:flex-col w-full gap-y-[8px] px-[8px] py-[10px] mt-[15px]`}
          >
            {legend.map(({ language, code }) => (
              <button
                key={code}
                onClick={() => handleOnClick(code)}
                type="button"
                class={clx(
                  `mobile:px-0 mobile:py-0 mobile:mx-0 mobile:my-0 flex items-center capitalize rounded-[10px] cursor-pointer
                   py-[8px] bg-[#fff] duration-100 text-primary w-full md:hover:bg-primary hover:text-[#fff]`,
                )}
              >
                {mobile
                  ? (
                    <img
                      class="pointer-events-none mx-0"
                      src={`/image/header-sub-menu-${code}-mobile.png`}
                      width={40}
                      height={40}
                      alt={language}
                    />
                  )
                  : (
                    <>
                      <img
                        class="w-[20px] h-[20px] mr-[10px] ml-[20px]"
                        src={`/image/header-sub-menu-${code}.png`}
                        alt={language}
                      />
                      <span class="text-14 font-noto-sans">{language}</span>
                    </>
                  )}
              </button>
            ))}
          </li>
        </ul>
      </li>
    </>
  );
}

export default Legend;
