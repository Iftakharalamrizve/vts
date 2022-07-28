import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import config from "../config";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import HomeStackScreen from "./HomeStackScreen";

export default function MainTabScreen() {
  const Tab = createBottomTabNavigator();

  const TabStyle = {
    backgroundColor: config.tabBarColor,
  };
  const TabBarIcon = (props) => {
    return (
      <MaterialCommunityIcons
        name={props.name}
        size={config.tabBarIconSize}
        style={{ marginBottom: -3 }}
        color={props.focused ? config.successColor : config.defaultFontColor}
      />
    );
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: TabStyle,
        activeTintColor: config.primaryColor,
        inactiveTintColor: config.defaultFontColor,
        showLabel: false,
      }}
      initialRouteName="HomeStack"
    >
      <Tab.Screen
        name="Chart"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="chart-bar" />
          ),
        }}
      />
      <Tab.Screen
        name="Card"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="card-bulleted" />
          ),
        }}
      />
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home-circle" />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="book-open-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="account" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
