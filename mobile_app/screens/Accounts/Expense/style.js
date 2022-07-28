import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
import { appSecondaryColor, appPrimaryColor } from "../../../configs/colors";
export default StyleSheet.create({
  //common tab bar design button style
  tabBarButton: {
    width: "50%",
    height: 50,
    borderRadius: 0,
    paddingVertical: 5,
    backgroundColor: appSecondaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarButtonActive: {
    width: "50%",
    height: 50,
    borderRadius: 0,
    paddingVertical: 5,
    backgroundColor: appPrimaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },

  //plush button div and icon style
  viewStylePlusButton: {
    height: 60,
    width: width,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  plusButtonDesign: {
    borderRadius: 30,
    borderWidth: StyleSheet.hairlineWidth,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  plushButtonIconColor: {
    color: appPrimaryColor,
  },

  //list item action button section
  actionButton: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonDesign: {
    borderRadius: 30,
    borderWidth: StyleSheet.hairlineWidth,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  amountButton: {
    color: "white",
    paddingHorizontal: 15,
    backgroundColor: appPrimaryColor,
    borderRadius: 50,
  },
});
