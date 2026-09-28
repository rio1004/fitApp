export const FontFamily = {
  regular: "SFProText-Regular",
  medium: "SFProText-Medium",
  semibold: "SFProText-Semibold",
  bold: "SFProText-Bold",
  display: "SFProDisplay-Bold",
} as const;

export const fontAssets = {
  [FontFamily.regular]: require("../../assets/fonts/SF-Pro-Text-Regular.otf"),
  [FontFamily.medium]: require("../../assets/fonts/SF-Pro-Text-Medium.otf"),
  [FontFamily.semibold]: require("../../assets/fonts/SF-Pro-Text-Semibold.otf"),
  [FontFamily.bold]: require("../../assets/fonts/SF-Pro-Text-Bold.otf"),
  [FontFamily.display]: require("../../assets/fonts/SF-Pro-Display-Bold.otf"),
};
