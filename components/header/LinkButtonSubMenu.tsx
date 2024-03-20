interface Props {
  btnUrlMenu?: string;
  btnTextMenu?: string;
}

function LinkButtonSubMenu({ btnUrlMenu, btnTextMenu }: Props) {
  if (!btnTextMenu) return null;

  return (
    <>
      <a
        href={btnUrlMenu}
        target="_blank"
        aria-label={btnTextMenu}
        alt={btnTextMenu}
        class="inline-flex items-center btn bg-transparent n1-btn-header-item--rounded px-[20px] py-[11px] !border !border-[#585858]"
      >
        <span class="text-primary text-16 uppercase font-archimoto-medium mt-[3px]">
          {btnTextMenu}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.25 5.25C5.25 4.83579 5.58579 4.5 6 4.5H12.75C13.1642 4.5 13.5 4.83579 13.5 5.25V12C13.5 12.4142 13.1642 12.75 12.75 12.75C12.3358 12.75 12 12.4142 12 12V7.06066L5.78033 13.2803C5.48744 13.5732 5.01256 13.5732 4.71967 13.2803C4.42678 12.9874 4.42678 12.5126 4.71967 12.2197L10.9393 6H6C5.58579 6 5.25 5.66421 5.25 5.25Z"
            fill="#585858"
          />
        </svg>
      </a>
    </>
  );
}

export default LinkButtonSubMenu;
