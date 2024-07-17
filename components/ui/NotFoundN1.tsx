import { ImageWidget } from "apps/admin/widgets.ts";
import { FnContext } from "deco/mod.ts";
import Image from "apps/website/components/Image.tsx";

export interface ButtonProps {
  text: string;
  href: string;
}

export interface Props {
  image404Desktop: ImageWidget;
  image404Mobile: ImageWidget;
  title?: string;
  button: ButtonProps;
}

export default function NotFoundN1(
  { image404Desktop, image404Mobile, button, device, title }: Props & {
    device?: string;
  },
) {
  return (
    <>
      <div class="w-full container pb-12">
        <div class="flex flex-col items-center justify-center">
          <div>
            {device !== "mobile"
              ? (
                <Image
                  src={image404Desktop}
                  width={1200}
                  height={658}
                  alt="image 404"
                  fetchPriority="high"
                  class="w-full object-contain"
                />
              )
              : (
                <Image
                  src={image404Mobile}
                  width={375}
                  height={658}
                  alt="image 404"
                  fetchPriority="high"
                  class="w-full object-contain"
                />
              )}
          </div>
        </div>
        <div class="flex flex-col items-center justify-center pt-4 gap-5">
          <h1 class="text-[#fff] uppercase font-archimoto-black font-black text-center text-32 md:text-[70px]">
            {title}
          </h1>
          <a
            href={button.href}
            class=" rounded-[30px] w-44 md:w-48 h-9 md:h-[51px]   flex items-center justify-center hover:brightness-90 bg-[#3CCBDA] text-[#0C1F59] text-14 md:text-16 font-archimoto-black font-black "
          >
            <span
              class={`py-4 px-5 md:py-5 md:px-8 !text-nowrap flex items-center justify-center`}
            >
              {button.text}
            </span>
          </a>
        </div>
      </div>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return { ...props, device: ctx.device };
};
