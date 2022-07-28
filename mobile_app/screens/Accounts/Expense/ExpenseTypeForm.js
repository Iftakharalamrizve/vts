import React, { useEffect, useState } from "react";
// import { useTheme } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
// import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

// import Text from "../../../components/Text";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import ThemeView from "../../../components/ThemeView";
import Loading from "../../../components/Loading";
import Toaster from "../../../components/Toaster";

import * as accountAction from "../../../store/actions/accounts";
import * as validatorAction from "../../../store/actions/validator";
import * as settingAction from "../../../store/actions/settings";

function ExpenseTypeForm(props) {
  //   const store = useSelector((state) => state);
  const dispatch = useDispatch();
  //   const { colors } = useTheme();
  //   const { navigation } = props;

  //screen basic component property intiialized
  const { eidtMode, data } = props.route.params;
  const buttonTItle =
    eidtMode == false ? "Expense Type Create" : "Expense Type Update";
  const [inputs, setInputs] = useState({ title: "", description: "" });

  // start use this part for reder edit data in form
  const isFocused = useIsFocused();
  useEffect(() => {
    const trySetInputData = () => {
      if (eidtMode) {
        setInputs({ ...data });
      }
    };
    trySetInputData();
  }, [isFocused]);

  // save Edit or Update method
  const clickSave = () => {
    try {
      if (eidtMode) {
        dispatch(settingAction.setLoadingStatus(true));
        dispatch(accountAction.updateExpenseType(inputs))
          .then(() => {
            dispatch(settingAction.setLoadingStatus(false));
            dispatch({
              type: "SET_TOAST",
              data: {
                status: true,
                messege: "Update Expense Type Succesfully",
                type: "success",
              },
            });
            props.navigation.goBack();
          })
          .catch((error) => {
            dispatch({
              type: "SET_TOAST",
              data: {
                status: true,
                messege: "Can Not Update Expense Type",
                type: "error",
              },
            });
            dispatch(validatorAction.createValidator(error));
            dispatch(settingAction.setLoadingStatus(false));
          });
      } else {
        dispatch(settingAction.setLoadingStatus(true));
        dispatch(accountAction.createExpenseType(inputs))
          .then(() => {
            dispatch(settingAction.setLoadingStatus(false));
            dispatch({
              type: "SET_TOAST",
              data: {
                status: true,
                messege: "Create Expense Type Succesfully",
                type: "success",
              },
            });
            props.navigation.goBack();
          })
          .catch((error) => {
            dispatch(validatorAction.createValidator(error));
            dispatch(settingAction.setLoadingStatus(false));
            dispatch({
              type: "SET_TOAST",
              data: {
                status: true,
                messege: "Can Not Update Expense Type",
                type: "error",
              },
            });
          });
      }
    } catch (error) {
      dispatch(settingAction.setLoadingStatus(false));
    }
  };

  return (
    <>
      <ThemeView style={styles.container} secondary>
        <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <Input
                name="title"
                value={inputs.title}
                placeholder="Title"
                onChangeText={(text) =>
                  setInputs((inputs) => ({ ...inputs, title: text }))
                }
                secondary
              />
              <Input
                placeholder="Description"
                value={inputs.description}
                onChangeText={(text) =>
                  setInputs((inputs) => ({ ...inputs, description: text }))
                }
                multiline={true}
                secondary
              />
              <Button
                title={buttonTItle}
                containerStyle={styles.button}
                onPress={clickSave}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <Loading />
        <Toaster />
      </ThemeView>
    </>
  );
}

export default ExpenseTypeForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  content: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  textNotification: {
    marginBottom: 10,
  },
  button: {
    marginVertical: 30,
  },
});
