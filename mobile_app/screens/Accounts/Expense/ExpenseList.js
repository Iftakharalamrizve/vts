import React, { useCallback, useState } from "react";
import { View, TouchableOpacity, FlatList, Text, Alert } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as expenseAction from "../../../store/actions/accounts";
import * as settingAction from "../../../store/actions/settings";
import styles from "./style.js";

export default function ExpenseList(props) {
  const dispatch = useDispatch();

  //on pull refresh event
  const [isRefreshing, setIsRefreshing] = useState(false);
  const loadRequest = useCallback(async () => {
    setIsRefreshing(true);
    try {
      dispatch(expenseAction.expenseList());
      setIsRefreshing(false);
    } catch (error) {
      setIsRefreshing(false);
    }
  }, []);

  const expenseList = useSelector((state) => state.accounts.expenseList);
  const EditExpense = (item) => {
    props.eidtExpenseCallBack(item);
  };

  const deleteExpense = async (item) => {
    Alert.alert("Delete Item", "Are Your Sure ?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            await dispatch(expenseAction.deleteExpense(item.expense_id));
            var data  =  {
                status: true,
                messege: "Expense  Deleted Successfully",
                type: "success",
            }
            await dispatch(settingAction.setToastMessage(data))
          } catch (error) {
            await dispatch({
              type: "SET_TOAST",
              data: {
                status: true,
                messege: "Expense  Can Not Delete",
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
              EditExpense(item);
            }}
            style={styles.buttonDesign}
          >
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDesign}
            onPress={() => {
              deleteExpense(item);
            }}
          >
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      }
    >
      <Avatar
        title="Test"
        source={{
          uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{item.purpose}</ListItem.Title>
        <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
      </ListItem.Content>
      <Text style={styles.amountButton}>{item.amount}</Text>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );

  return (
    <FlatList
      onRefresh={loadRequest}
      refreshing={isRefreshing}
      keyExtractor={keyExtractor}
      data={expenseList}
      renderItem={renderItem}
    />
  );
}
