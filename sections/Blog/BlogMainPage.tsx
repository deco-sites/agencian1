import { Section } from "deco/mod.ts";

export interface Props {
  mainContainer?: Section[];
  sideBarContainer?: Section[];
}

export default function BlogMainPage({
  mainContainer,
  sideBarContainer,
}: Props) {
  return (
    <div class="container flex">
      <div>
        {mainContainer?.map(({ Component, props }, index) => (
          <Component key={index} {...props} />
        ))}
      </div>
      <div class="w-[200px]">
        {sideBarContainer?.map(({ Component, props }, index) => (
          <Component key={index} {...props} />
        ))}
      </div>
    </div>
  );
}
