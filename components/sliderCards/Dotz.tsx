
import Slider from "deco-sites/agencian1/components/ui/Slider.tsx";
import { Banner } from "deco-sites/agencian1/components/sliderCards/SliderCards.tsx";


 type Props = {
    /** @format html */
    title?: string;

    images?: Banner[];

    interval?: number;
}

export default function Dots({ images, interval = 0 }: Props) {
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
            @property --dot-progress {
              syntax: '<percentage>';
              inherits: false;
              initial-value: 0%;
            }
            `,
                }}
            />
            <ul class="mobile:relative mobile:top-0 carousel justify-center col-span-full gap-6 z-10 row-start-4">
                {images?.map((_, index) => (
                    <li class="carousel-item">
                        <Slider.Dot index={index}>
                            <div class="py-5">
                                <div
                                    class="n1-banner-btn__dot--item w-8 sm:w-20 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-[#06ADC2] from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
                                    style={{ animationDuration: `${interval}s` }}
                                />
                            </div>
                        </Slider.Dot>
                    </li>
                ))}
            </ul>
        </>
    );
}