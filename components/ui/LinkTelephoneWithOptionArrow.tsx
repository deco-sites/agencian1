import { clx } from "$store/sdk/clx.ts";

interface Props {
  text?: string;
  telephone?: string;
  activeArrow?: boolean;
  width?: string;
  height?: string;
  customClass?: string;
  fontSize?: string;
}

function LinkTelephoneWithOptionArrow(
  { text, telephone, activeArrow, width, customClass, fontSize, height }: Props,
) {
  const formatNumber = telephone && telephone.replace(/\D/g, "");

  console.log(formatNumber);

  if (!formatNumber) {
    return null;
  }

  return (
    <a
      href={`https://wa.me/${formatNumber}`}
      target="_blank"
      aria-label="Converse no WhatsApp"
      alt="Converse no WhatsApp"
      class={clx(`${width ? `mobile:my-0 mobile:mx-auto` : "mobile:w-[130px]"} 
          mobile:relative mobile:py-[7px] mobile:mr-[20px] px-[10px] py-[10px] group flex items-center relative
          text-16 uppercase bg-accent n1-btn-header-item--rounded border-none w-[142px] ml-[40px] hover:bg-[#F8BC33] duration-300 
          ${customClass ? customClass : ""}`)}
      style={{
        width: `${width ? width + "px" : "130px"} `,
        height: `${height && height + "px"}`,
      }}
    >
      <span
        class={`${
          fontSize ? "text-16" : "mobile:text-14"
        } text-primary text-16 mobile:text-14 font-archimoto-medium pt-[3px] !mobile:mr-[25px] font-black`}
        style={{ marginRight: `${activeArrow ? "30px" : "0"}` }}
      >
        {text ? text : "WhatsApp"}
      </span>

      {activeArrow && (
        <div class="rounded-[50%] p-[5px] bg-[#F8BC33] mobile:absolute mobile:right-[8px] absolute right-[10px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.83333 5.83333C5.83333 5.3731 6.20643 5 6.66667 5H14.1667C14.6269 5 15 5.3731 15 5.83333V13.3333C15 13.7936 14.6269 14.1667 14.1667 14.1667C13.7064 14.1667 13.3333 13.7936 13.3333 13.3333V7.84518L6.42259 14.7559C6.09715 15.0814 5.56951 15.0814 5.24408 14.7559C4.91864 14.4305 4.91864 13.9028 5.24408 13.5774L12.1548 6.66667H6.66667C6.20643 6.66667 5.83333 6.29357 5.83333 5.83333Z"
              fill="#0C1F59"
            />
          </svg>
        </div>
      )}
    </a>
  );
}

export default LinkTelephoneWithOptionArrow;
