type ColorHash = `#${string}`;
type ColorRgba = `rgba(${number},${number},${number},${number})`;
export interface ColorModeColors {
  background: ColorHash;
  text: ColorHash;
  textAccent: ColorHash;
  success: ColorHash;
  warning: ColorHash;
  danger: ColorHash;
  accentHeavy: ColorHash;
  accentLight: ColorHash;
  smudge: ColorRgba;
}

export type ColorMode = 'light' | 'dark';
