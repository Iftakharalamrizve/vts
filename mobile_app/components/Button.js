import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, ViewPropTypes } from "react-native";
import { Button } from "react-native-elements";
import { white, appColor } from "../configs/colors";
import { fonts, sizes } from "../configs/fonts";

const ButtonElement = (props) => {
  const { colors } = useTheme();
  const {
    small,
    secondary,
    bColor,
    bTextColor,
    buttonStyle,
    containerStyle,
    titleStyle,
    loadingProps,
    ...rest
  } = props;

  const bgColor = bColor ? bColor : appColor;
  const color = bTextColor ? bTextColor : white;

  return (
    <Button
      {...rest}
      buttonStyle={StyleSheet.flatten([
        styles.button(bgColor),
        small && styles.smallButton,
        buttonStyle,
      ])}
      containerStyle={StyleSheet.flatten([styles.container, containerStyle])}
      titleStyle={StyleSheet.flatten([
        styles.title(color),
        small && styles.smallTitle,
        titleStyle,
      ])}
      loadingProps={{
        color: white,
        ...loadingProps,
      }}
    />
  );
};

const styles = {
  button: (color) => ({
    backgroundColor: color,
    borderRadius: 4,
    minHeight: 46,
  }),
  container: {
    borderRadius: 4,
  },
  title: (color) => ({
    color,
    fontSize: sizes.base,
  }),
  smallButton: {
    minHeight: 35,
  },
  smallTitle: {
    fontSize: sizes.h6,
  },
  secondaryButton: (color) => ({
    backgroundColor: color,
  }),
};

ButtonElement.propTypes = {
  titleStyle: Text.propTypes.style,
  buttonStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  secondary: PropTypes.bool,
  small: PropTypes.bool,
};

ButtonElement.defaultProps = {
  titleStyle: {},
  buttonStyle: {},
  containerStyle: {},
  secondary: false,
  small: false,
};

export default ButtonElement;
