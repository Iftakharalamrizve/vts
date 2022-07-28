import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import HeaderTitle from "../components/HeaderTitle";
import config from "../config";
import Home from "../screens/Home";
import VehicleFencingCreate from "../screens/Vehicle/VehicleFencingCreate";
import VehicleFencingList from "../screens/Vehicle/VehicleFencingList";
import AccountsStack from "./AccountsStack";
import Settings from "../screens/Settings";


const HomeStackScreen = (props) => {
  const Stack = createStackNavigator();
  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? config.defaultFontColor : "",
    },
    headerTitleStyle: {
      fontWeight: "bold",
      alignItems: "center",
      color: "black",
    },
    headerTintColor:
      Platform.OS === "android" ? "white" : config.headerIconColor,
  };

  const commonHeaderButtonSetting = {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Notification"
          iconName="ios-notifications-outline"
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
  const commonHeaderButtonSetting2 = {

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Notification"
          iconName="ios-notifications-outline"
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };


  return (
    <>
      <Stack.Navigator
        screenOptions={screenOptionStyle}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTintColor: "#fff",
            headerTitle: () => <HeaderTitle title={"Home"} />,
            headerTitleStyle: { alignSelf: "center" },
            ...commonHeaderButtonSetting,
          }}
        />
        <Stack.Screen
          name="FencingList"
          component={VehicleFencingList}
          options={{
            headerTintColor: "#000",
            headerTitle: () => <HeaderTitle title={"Fencing List"} />,
            headerTitleStyle: { alignSelf: "center" },
            ...commonHeaderButtonSetting2,
          }}
        />
        <Stack.Screen
          name="FencingCreate"
          component={VehicleFencingCreate}
          options={{
            headerTintColor: "#000",
            headerTitle: () => <HeaderTitle title={"Fencing Create"} />,
            headerTitleStyle: { alignSelf: "center" },
            ...commonHeaderButtonSetting2,
          }}
        />
        <Stack.Screen
          name="Accounts"
          component={AccountsStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        options={{
            headerTintColor: "#000",
            headerTitle: () => <HeaderTitle title={"Settings"} />,
            headerTitleStyle: { alignSelf: "center" },
            ...commonHeaderButtonSetting,
        }}
          name="Settings"
          component={Settings}
        />
      </Stack.Navigator>
      {/* <Toaster /> */}
    </>
  );
};
export default HomeStackScreen;
