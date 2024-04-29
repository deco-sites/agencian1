import { Picture, Source } from "apps/website/components/Picture.tsx";
import { Banner } from "deco-sites/agencian1/components/sliderCards/SliderCards.tsx";

export default function CardItem(
  { image, lcp, id }: { image: Banner; lcp?: boolean; id: string },
) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;

  return (
    <div
      id={id}
      class="relative overflow-hidden w-[270px] h-[270px] rounded-[20px] shadow-[0px 20.64px 61.92px 0px rgba(0, 0, 0, 0.05)] "
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 270px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={270}
          height={270}
        />
        <Source
          media="(min-width: 200px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={200}
          height={200}
        />
        <img
          class="mobile:h-auto mobile:max-w-full object-cover w-full h-full  hover:scale-110 transition-transform duration-300 ease-in-out"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>

      {action && (
        <div class="absolute bottom-0 left-0 right-0 sm:right-auto w-full flex items-center justify-center n1-custom-card-sliderCards z-10">
          <span class="font-normal text-14 py-3 px-14 text-[#fff]">
            {action.title}
          </span>
        </div>
      )}
    </div>
  );
}
