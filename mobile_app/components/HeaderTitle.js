import React, { memo } from "react";
import { Platform, StyleSheet, Text } from "react-native";
const HeaderTitle = memo((props) => {
  return <Text style={styles.title}>{props.title}</Text>;
});

export default HeaderTitle;

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 60,
  },
});
