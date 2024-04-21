import Slider from "deco-sites/agencian1/components/ui/Slider.tsx";
import Icon from "deco-sites/agencian1/components/ui/Icon.tsx";

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
