import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import HeaderTitle from "../components/HeaderTitle";
import WelcomeScreen from "../screens/WelcomeScreen";
import Login from "../screens/Login";
import RegisterAccount from "../screens/RegisterAccount";
import DrawerNavigator from "./DrawerNavigator";




const RootNavigator = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const MainStack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <MainStack.Navigator>

            <MainStack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: () => <HeaderTitle title={"Login In"} />,
              }}
            />
            <MainStack.Screen
              name="RegisterAccount"
              component={RegisterAccount}
              options={{
                headerTitle: () => <HeaderTitle title={"Registration"} />,
              }}
            />
            <MainStack.Screen
              name="AppStack"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
          </MainStack.Navigator>
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default RootNavigator;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
