import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

//redux related library import
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import * as expenseAction from "../../../store/actions/accounts";
import * as validation from "../../../store/actions/validator";
import * as vehicleAction from "../../../store/actions/vehicle";
import * as settingAction from "../../../store/actions/settings";

//extarnal FIle include section
import styles from "./style.js";
import ExpenseList from "./ExpenseList.js";
import ExpenseTypeList from "./ExpenseTypeList.js";
import Loading from "../../../components/Loading";
import Toaster from "../../../components/Toaster";

export default function Expense(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const isFocused = useIsFocused();
  //validation clear
  useEffect(() => {
    const tryGetListItem = async () => {
       dispatch(settingAction.setLoadingStatus(true));
       dispatch(expenseAction.expenseTypeList());
       await dispatch(expenseAction.expenseList());
       dispatch(settingAction.setLoadingStatus(false));
    };
    tryGetListItem();
  }, []);

  //clear validation error when render this screen with call vehicle list and update state
  useEffect(() => {
    const trySettingScalled = async () => {
        dispatch(vehicleAction.vehicleList(""));
        dispatch(validation.clearValidaton());
    };
    trySettingScalled();
  }, [isFocused]);

  const [tabItem, setTabIndex] = useState(0);
  const setTabItem = (index) => {
    setTabIndex(index);
  };

  const AddExpenseType = () => {
    props.navigation.navigate("ExpenseTypeForm", {
      eidtMode: false,
    });
  };
  const AddExpense = () => {
    props.navigation.navigate("ExpenseForm", {
      eidtMode: false,
    });
  };
  const editExpenseType = (item) => {
    props.navigation.navigate("ExpenseTypeForm", {
      eidtMode: true,
      data: item,
    });
  };

  const editExpense = (item) => {
    props.navigation.navigate("ExpenseForm", {
      eidtMode: true,
      data: item,
    });
  };

  return (
    <>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            setTabItem(0);
          }}
          style={tabItem == 0 ? styles.tabBarButtonActive : styles.tabBarButton}
        >
          <Text style={styles.tabBarText}>Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTabItem(1);
          }}
          style={tabItem == 1 ? styles.tabBarButtonActive : styles.tabBarButton}
        >
          <Text style={styles.tabBarText}>Expense Type</Text>
        </TouchableOpacity>
      </View>
      <View>
        {tabItem == 0 ? (
          <>
            <View style={styles.viewStylePlusButton}>
              <TouchableOpacity style={styles.plusButtonDesign}>
                <AntDesign
                  name="pluscircle"
                  size={35}
                  onPress={AddExpense}
                  style={styles.plushButtonIconColor}
                />
              </TouchableOpacity>
            </View>
            <ExpenseList eidtExpenseCallBack={editExpense} />
          </>
        ) : (
          <>
            <View style={styles.viewStylePlusButton}>
              <TouchableOpacity style={styles.plusButtonDesign}>
                <AntDesign
                  name="pluscircle"
                  size={35}
                  onPress={AddExpenseType}
                  style={styles.plushButtonIconColor}
                />
              </TouchableOpacity>
            </View>
            <ExpenseTypeList eidtCallBack={editExpenseType} />
          </>
        )}
      </View>
      <Loading />
      <Toaster />
    </>
  );
}
