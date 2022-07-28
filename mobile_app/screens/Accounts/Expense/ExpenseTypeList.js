import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ListItem } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
//redux related library import
import { useSelector, useDispatch } from "react-redux";
import * as expenseAction from "../../../store/actions/accounts";

import styles from "./style.js";

export default function ExpenseTypeList(props) {
  const dispatch = useDispatch();

  //on pull refresh event
  const [isRefreshing, setIsRefreshing] = useState(false);
  const loadRequest = useCallback(async () => {
    setIsRefreshing(true);
    try {
      dispatch(expenseAction.expenseTypeList());
      setIsRefreshing(false);
    } catch (error) {
      setIsRefreshing(false);
    }
  }, []);

  //state related operation
  const expenseTypeList = useSelector(
    (state) => state.accounts.expenseTypeList
  );
  const EditExpenseType = (item) => {
    props.eidtCallBack(item);
  };

  const deleteExpenseType = (item) => {
    Alert.alert("Delete Item", "Are Your Sure ?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          try {
            dispatch(expenseAction.deleteExpenseType(item.expense_type_id));
            dispatch({
              type: "SET_TOAST",
              data: {
                status: true,
                messege: "Expense Type Deleted Successfully",
                type: "success",
              },
            });
          } catch (error) {
            dispatch({
              type: "SET_TOAST",
              data: {
                status: true,
                messege: "Expense Type Can Not Delete",
                type: "error",
              },
            });
          }
        },
      },
    ]);
  };

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({ item }) => (
    <ListItem.Swipeable
      bottomDivider
      rightContent={
        <View style={styles.actionButton}>
          <TouchableOpacity
            onPress={() => {
              EditExpenseType(item);
            }}
            style={styles.buttonDesign}
          >
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteExpenseType(item);
            }}
            style={styles.buttonDesign}
          >
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      }
    >
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );

  return (
    <>
      <FlatList
        onRefresh={loadRequest}
        refreshing={isRefreshing}
        keyExtractor={keyExtractor}
        data={expenseTypeList}
        renderItem={renderItem}
      />
    </>
  );
}
