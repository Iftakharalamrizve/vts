import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

const Toaster = (props) => {
  const dispatch = useDispatch();
  const toastInfo = useSelector((state) => state.settings.toast);
  const onDismissSnackBar = () => {
    var info = {
      status: false,
      messege: "",
      type: "",
    };
    dispatch({ type: "CLEAR_TOAST", data: info });
  };
  return (
    <View style={styles.container}>
      <Snackbar
        style={{
          backgroundColor:
            toastInfo.type == "success"
              ? "green"
              : toastInfo.type == "error"
              ? "red"
              : "black",
        }}
        theme={{ colors: { surface: "white", accent: "white" } }}
        visible={toastInfo.status}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Ok",
          onPress: () => {
            onDismissSnackBar();
          },
        }}
      >
        {toastInfo.messege}
      </Snackbar>
    </View>
  );
};

export default Toaster;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
