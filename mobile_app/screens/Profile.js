import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Appbar,
  Searchbar,
  Card,
  Title,
  TextInput,
  Button,
} from "react-native-paper";

export default function Profile() {
  // const [searchQuery, setSearchQuery] = React.useState('');

  // const onChangeSearch = query => setSearchQuery(query);
  return (
    <View>
      <Appbar.Header style={styles.titleBar}>
        <Appbar.BackAction />
        <Appbar.Content title="Profile" />
        <Appbar.Action icon="bell" />
      </Appbar.Header>
      <Title style={styles.pageTitle}>Title</Title>
      {/* <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      /> */}
      <View style={styles.profileEdit}>
        <TextInput label="Full Name" mode="flat" style={styles.inputDesign} />
        <TextInput label="Email" mode="flat" style={styles.inputDesign} />
        <TextInput label="Phone" mode="flat" style={styles.inputDesign} />
        <Button style={styles.btnRegistration} mode="contained">
          Update you profile
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleBar: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#FFFFFF",
  },
  pageTitle: {
    paddingBottom: 10,
    paddingTop: 10,
    display: "flex",
    color: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#064368",
  },
  profileEdit: {
    padding: 10,
  },
  inputDesign: {
    paddingVertical: 0,
    height: 50,
    marginBottom: 6,
    backgroundColor: "#FFFFFF",
  },
  btnRegistration: {
    marginTop: 16,
    marginBottom: 6,
    paddingVertical: 5,
    backgroundColor: "#27af4b",
  },
});
