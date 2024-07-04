import Slider from "site/components/ui/Slider.tsx";
import Icon from "site/components/ui/Icon.tsx";

export default function Buttons() {
  return (
    <>
      <div class="relative hidden md:flex justify-start z-10 col-start-1 row-start-3">
        <Slider.PrevButton class="btn btn-circle bg-[#ffffff] w-[40px] !h-[40px]">
          <Icon
            size={18}
            id="Banner-arrow-left"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="relative hidden md:flex justify-end z-10 col-start-3 row-start-3 ">
        <Slider.NextButton class="btn btn-circle bg-[#ffffff] w-[40px] !h-[40px]">
          <Icon
            size={18}
            id="Banner-arrow-right"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}
