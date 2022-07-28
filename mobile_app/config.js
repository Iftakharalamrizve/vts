import { Platform } from "react-native";

const $primaryColor = "#0066ff";
const $secondaryColor = "#c2185b";
const $lightColor = "#607d8b";
const $warningColor = "#d32f2f";
const $successColor = "#00c853";
const $layout = "light";
const $borderRadius = 10;

export default {
  appVersion: "1.1",
  headingFont: Platform.OS == "android" ? "OpenSansBold" : "helvetica-bold",
  defaultFont: Platform.OS == "android" ? "OpenSansRegular" : "helvetica",
  defaultFontSize: Platform.OS == "ios" ? 16 : 14,
  layoutMode: $layout,
  backgroundColor: $layout == "dark" ? "#222222" : "#f2f2f2",
  listBackgroundColor: $layout == "dark" ? "#111111" : "#ffffff",
  listSeparatorColor: $layout == "dark" ? "#222222" : "#eeeeee",
  tabBarColor: "#074368",
  defaultFontColor: "#ffff",
  primaryColor: $primaryColor,
  secondaryColor: $secondaryColor,
  lightColor: $lightColor,
  warningColor: $warningColor,
  successColor: $successColor,
  tabBarIconSize: Platform.OS == "android" ? 30 : 30,
  headerIconSize: 30,
  headerIconColor: Platform.OS == "android" ? "black" : $primaryColor,
  style: {},
};
