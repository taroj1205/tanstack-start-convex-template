import type { ComponentMultiStyle } from "@yamada-ui/react";
import { mergeMultiStyle } from "@yamada-ui/react";
import { HueSlider } from "./hue-slider";

export const AlphaSlider: ComponentMultiStyle<"AlphaSlider"> =
  mergeMultiStyle(HueSlider)();
