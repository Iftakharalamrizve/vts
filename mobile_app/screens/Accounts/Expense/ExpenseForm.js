import React, { useEffect, useState } from "react";
// import { useTheme } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
//third party library import
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import DropDownPicker from "react-native-dropdown-picker";

import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import ThemeView from "../../../components/ThemeView";
import Loading from "../../../components/Loading";
import Toaster from "../../../components/Toaster";

import * as accountAction from "../../../store/actions/accounts";
import * as validatorAction from "../../../store/actions/validator";
import * as settingAction from "../../../store/actions/settings";

function ExpenseForm(props) {
  const dispatch = useDispatch();

  //screen basic component property intiialized
  const { eidtMode, data } = props.route.params;
  const buttonTItle = eidtMode == false ? "Expense  Create" : "Expense  Update";
  const [inputs, setInputs] = useState({
    expense_type_id: null,
    vehicle_id:null,
    purpose: "",
    amount: "",
    date: format(new Date(), "yyyy-MM-dd"),
    image: "",
  });

  //data data formation with state value

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const handleDateInfo = (date_info) => {
    var returnDate = format(date_info, "yyyy-MM-dd");
    setInputs((inputs) => ({ ...inputs, date: returnDate }));
    setDatePickerVisibility(false);
  };

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

  //Expense type dropdown configuration
  const expenseTypeList = useSelector(
    (state) => state.accounts.expenseTypeList
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(eidtMode ? data.expense_type_id : null);
  const [items, setItems] = useState(expenseTypeList);

  //Vehicle List dropdown configuration
  const vehicleList = useSelector(
      (state) => state.vehicle.vehicleList
  );
  const [vopen, setVehicleDropdownStatus] = useState(false);
  const [vDropdownValue, setVehicleDropdownValue] = useState(eidtMode ? data.vehicle_id : null);
  const [vehicleItems, setVehicleItems] = useState(vehicleList);

  // save Edit or Update method
  const clickSave = () => {
    try {
      if (eidtMode) {
        dispatch(settingAction.setLoadingStatus(true));
        dispatch(
          accountAction.updateExpense({ ...inputs, expense_type_id: value,vehicle_id:vDropdownValue  })
        )
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
                messege: "Can Not Update Expense ",
                type: "error",
              },
            });
            dispatch(validatorAction.createValidator(error));
            dispatch(settingAction.setLoadingStatus(false));
          });
      } else {
        dispatch(settingAction.setLoadingStatus(true));
        dispatch(
          accountAction.createExpense({ ...inputs, expense_type_id: value,vehicle_id:vDropdownValue })
        )
          .then(() => {
            dispatch(settingAction.setLoadingStatus(false));
            dispatch({
              type: "SET_TOAST",
              data: {
                status: true,
                messege: "Create Expense Succesfully",
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
                messege: "Can Not Create Expense",
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
    <ThemeView style={styles.container} secondary>
      <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateInfo}
          onCancel={() => {
            setDatePickerVisibility(false);
          }}
        />
        <View style={styles.content}>
          <DropDownPicker
              style={{
                borderColor: "#cccc",
              }}
              schema={{
                label: "plate_number",
                value: "vehicle_id",
              }}
              open={vopen}
              value={vDropdownValue}
              items={vehicleItems}
              setOpen={setVehicleDropdownStatus}
              setValue={setVehicleDropdownValue}
              setItems={setVehicleItems}
          />



        </View>
        {/*<ScrollView showsVerticalScrollIndicator={false}>*/}
          <View style={styles.content}>
            <Input
              name="purpose"
              value={inputs.purpose}
              placeholder="Enter Purpose"
              onChangeText={(text) =>
                setInputs((inputs) => ({ ...inputs, purpose: text }))
              }
              secondary
            />
            <Input
              // keyboardType="numeric"
              value={String(inputs.amount)}
              name="amount"
              placeholder="Enter Amount"
              onChangeText={(text) =>
                setInputs((inputs) => ({ ...inputs, amount: text }))
              }
              secondary
            />
            <DropDownPicker
                style={{
                  borderColor: "#cccc",
                }}
                schema={{
                  label: "title",
                  value: "expense_type_id",
                }}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />

            <Input
              placeholder="Date"
              value={inputs.date}
              onFocus={() => {
                setDatePickerVisibility(true);
              }}
              onChangeText={() => {
                setDatePickerVisibility(true);
              }}
              onKeyPress={() => {
                setDatePickerVisibility(true);
              }}
              onPressIn={() => {
                setDatePickerVisibility(true);
              }}
              placeholder="Enter Date"
              secondary
            />
            {/* <TouchableOpacity
              style={{ height: 150, width: "100%", backgroundColor: "#cccc" }}
            >
              <Text h3> Upload Your Document</Text>
            </TouchableOpacity> */}
            <Button
              title={buttonTItle}
              containerStyle={styles.button}
              onPress={clickSave}
            />
          </View>
        {/*</ScrollView>*/}
      </KeyboardAvoidingView>
      <Loading />
      <Toaster />
    </ThemeView>
  );
}

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

export default ExpenseForm;
