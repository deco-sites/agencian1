import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";

export default function Buttons() {
  return (
    <>
      <div class="flex items-center justify-start z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="btn btn-circle bg-[#ffffff] w-[40px] !h-[40px]">
          <Icon
            size={18}
            id="Banner-arrow-left"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-end z-10 col-start-3 row-start-2">
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
