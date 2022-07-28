import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackScreen } from "./HomeStackScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import config from "../config";
import Home from "../screens/Home";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
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
  const TabStyle = {
    backgroundColor: config.tabBarColor,
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: TabStyle,
        activeTintColor: config.primaryColor,
        inactiveTintColor: config.defaultFontColor,
        showLabel: false,
      }}
      initialRouteName="Home"
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
        name="Home"
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
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="account" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
