import commerce, { Props as CommerceProps } from "apps/commerce/mod.ts";
import { color as vtex } from "apps/vtex/mod.ts";
import { rgb24 } from "std/fmt/colors.ts";
import manifest, { Manifest } from "../manifest.gen.ts";
import { type Section } from "@deco/deco/blocks";
import { type App as A, type AppContext as AC } from "@deco/deco";
export type Props = {
  /**
   * @title Active Commerce Platform
   * @description Choose the active ecommerce platform
   * @default custom
   */
  platform: Platform;
  theme?: Section;
} & CommerceProps;
export type Platform = "vtex" | "custom";
export let _platform: Platform = "custom";
export type App = ReturnType<typeof Site>;
export type AppContext = AC<App>;
const color = (platform: string) => {
  switch (platform) {
    case "vtex":
      return vtex;
    case "deco":
      return 0x02f77d;
  }
};
let firstRun = true;
export default function Site({ theme, ...state }: Props): A<Manifest, Props, [
  ReturnType<typeof commerce>,
]> {
  _platform = state.platform || state.commerce?.platform || "custom";
  // Prevent console.logging twice
  if (firstRun) {
    firstRun = false;
    console.info(
      ` 🐁 ${rgb24("Storefront", color("deco"))} | ${
        rgb24(_platform, color(_platform))
      } \n`,
    );
  }
  return {
    state,
    manifest,
    dependencies: [
      commerce({
        ...state,
        global: theme ? [...(state.global ?? []), theme] : state.global,
      }),
    ],
  };
}
export { onBeforeResolveProps } from "apps/website/mod.ts";
