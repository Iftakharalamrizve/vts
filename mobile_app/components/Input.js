import React from "react";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, View, TextInput, Text } from "react-native";
import ViewLabel, { MIN_HEIGHT } from "../containers/ViewLabel";
import { sizes, lineHeights, fonts } from "../configs/fonts";
import { red } from "../configs/colors";
import { useSelector, useDispatch } from "react-redux";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeading: props.value || props.defaultValue,
    };
    this.input = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.updateHeader(this.props.value);
    }
  }
  updateHeader = (value) => {
    this.setState({
      isHeading: value,
    });
  };

  handleFocus = (data) => {
    this.updateHeader(true);
    if (this.props.onFocus) {
      this.props.onFocus(data);
    }
  };
  onChange = (value) => {
    this.setState(
      {
        value,
      },
      () => {
        if (this.props.onChangeText) {
          this.props.onChangeText(value);
        }
      }
    );
  };
  handleBlur = (data) => {
    const { value } = this.props;
    this.updateHeader(
      value || (this.input.current && this.input.current._lastNativeText)
    );
    if (this.props.onBlur) {
      this.props.onBlur(data);
    }
  };

  render() {
    const {
      store,
      value,
      label,
      error,
      name,
      theme,
      style,
      multiline,
      placeholder,
      keyboardType,
      secondary,
      ...rest
    } = this.props;
    const { isHeading } = this.state;
    const { colors } = theme;
    return (
      <>
        {label && <Text>{label} </Text>}
        <ViewLabel error={error} isHeading={isHeading} secondary={secondary}>
          <TextInput
            placeholder={placeholder}
            autoCapitalize="none"
            {...rest}
            value={value.toString()}
            keyboardType={keyboardType}
            inputRef={this.input}
            testID="RN-text-input"
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            multiline={multiline}
            style={[
              styles.input(colors.text),
              multiline && { height: 130 },
              style && style,
            ]}
          />
        </ViewLabel>
        {store.validationErrors[name] && (
          <Text style={{ color: red }}> {store.validationErrors[name][0]}</Text>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  viewInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: (color) => ({
    height: MIN_HEIGHT,
    paddingHorizontal: 16,
    fontSize: sizes.base,
    color: color,
  }),
});

Input.propTypes = {};
Input.defaultProps = {
  secondary: false,
};

export default function InputComponent(props) {
  const theme = useTheme();
  const store = useSelector((state) => state);
  return <Input {...props} theme={theme} store={store.validator} />;
}
