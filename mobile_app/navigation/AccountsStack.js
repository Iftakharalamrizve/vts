import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import HeaderTitle from "../components/HeaderTitle";

import config from "../config";
import Expense from "../screens/Accounts/Expense";
import ExpenseForm from "../screens/Accounts/Expense/ExpenseForm";
import ExpenseTypeForm from "../screens/Accounts/Expense/ExpenseTypeForm";

const AccountsStack = (props) => {
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

  return (
    <>
      <Stack.Navigator
        screenOptions={screenOptionStyle}
        initialRouteName="Expense"
      >
        <Stack.Screen
          name="Expense"
          component={Expense}
          options={{
            headerTintColor: "#fff",
            headerTitle: () => <HeaderTitle title={"Expenses"} />,
            headerTitleStyle: { alignSelf: "center" },
            ...commonHeaderButtonSetting,
          }}
        />
        <Stack.Screen
          name="ExpenseForm"
          component={ExpenseForm}
          options={{
            headerTintColor: "#000",
            headerTitle: () => <HeaderTitle title={"Expense"} />,
            headerTitleStyle: { alignSelf: "center" },
          }}
        />
        <Stack.Screen
          name="ExpenseTypeForm"
          component={ExpenseTypeForm}
          options={{
            headerTintColor: "#000",
            headerTitle: () => <HeaderTitle title={"Expense Type"} />,
            headerTitleStyle: { alignSelf: "center" },
          }}
        />
      </Stack.Navigator>
    </>
  );
};
export default AccountsStack;
