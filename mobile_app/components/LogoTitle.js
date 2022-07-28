import React from "react";
import { Image, StyleSheet, View } from "react-native";

const LogoTitle = () => (
  <View style={styles.logoContainer}>
    <Image source={require("../assets/britto.png")} />
  </View>
);

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  logo: {
    width: 247,
    height: 79,
    marginTop: 60,
    marginBottom: 40,
  },
});

export default LogoTitle;
