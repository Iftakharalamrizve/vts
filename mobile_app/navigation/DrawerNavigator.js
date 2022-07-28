import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabScreen from "./MainTabScreen";
import HomeStackScreen from "./HomeStackScreen";
import DrawerContent from "./DrawerContent";
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContentOptions={{
      activeTintColor: "#e91e63",
    }}
    screenOptions={{ headerShown: false }}
    drawerContent={(props) => <DrawerContent {...props} />}
  >
    <Drawer.Screen
      name="Drawer"
      component={HomeStackScreen}
      options={{ headerShown: false }}
    />
  </Drawer.Navigator>
);
export default DrawerNavigator;
