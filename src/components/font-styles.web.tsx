import { fontAssets, FontFamily } from "@/constants/fonts";

// Metro resolves JS asset imports to exported URLs; CSS relative URLs are unsupported.
const faces = [
  [FontFamily.regular, FontFamily.regular, "100 400"],
  [FontFamily.regular, FontFamily.medium, "500"],
  [FontFamily.regular, FontFamily.semibold, "600"],
  [FontFamily.regular, FontFamily.bold, "700 900"],
  [FontFamily.display, FontFamily.display, "700"],
] as const;

const css = faces
  .map(([family, assetName, weight]) => {
    const source = fontAssets[assetName];
    const uri =
      typeof source === "string" ? source : (source.uri ?? source.default);
    return `@font-face { font-family: '${family}'; src: url(${JSON.stringify(uri)}) format('opentype'); font-weight: ${weight}; font-style: normal; font-display: swap; }`;
  })
  .join("\n");

export default function FontStyles() {
  return <style>{css}</style>;
}
