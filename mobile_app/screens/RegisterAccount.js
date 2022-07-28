import React from "react";
import { memo, useCallback, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { Col, Row, Grid } from "react-native-paper-grid";

export default function Login() {
  return (
    <View style={styles.mainSection}>
      <View style={styles.registrationSection}>
        <View style={styles.logoContainer}>
          <Image
            source={require(// @ts-ignore
            "../assets/white-login.png")}
            style={styles.loginLogo}
          />
        </View>
      </View>
      <View style={styles.formSection}>
        <Card style={styles.loginFormSection}>
          <Card.Title title="Register with britto" />
          <Card.Content>
            <View>
              <Row nopad>
                <Col nopad>
                  <TextInput
                    label="Full Name"
                    mode="outlined"
                    style={styles.fullNameInput}
                  />
                </Col>
                <Col nopad>
                  <TextInput
                    label="Phone"
                    mode="outlined"
                    style={styles.phoneInput}
                  />
                </Col>
              </Row>
            </View>
            <TextInput
              label="Email"
              mode="outlined"
              style={styles.inputDesign}
            />
            <TextInput
              label="Password"
              mode="outlined"
              style={styles.inputDesign}
            />

            <View style={styles.passwordHints}>
              <Text style={styles.label}>password must be 6 character</Text>
            </View>

            <Button style={styles.btnRegistration} mode="contained">
              Registration
            </Button>
            <View style={styles.dFlex}>
              <Text style={styles.label}>Already have an account ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("")}>
                <Text style={styles.link}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainSection: {
    width: "100%",
  },
  registrationSection: {
    width: "100%",
    backgroundColor: "#064368",
  },
  logoContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: 60,
    paddingTop: 30,
  },
  loginLogo: {
    width: 280,
    height: 80,
  },
  loginFormSection: {
    marginBottom: 12,
  },
  formSection: {
    paddingHorizontal: 20,
    marginTop: -30,
  },
  inputDesign: {
    paddingVertical: 0,
    height: 50,
    marginBottom: 6,
  },
  fullNameInput: {
    paddingVertical: 0,
    height: 50,
    marginBottom: 6,
    marginRight: 6,
  },
  phoneInput: {
    paddingVertical: 0,
    height: 50,
    marginBottom: 6,
    marginLeft: 6,
  },
  btnRegistration: {
    marginTop: 16,
    marginBottom: 6,
    paddingVertical: 5,
    backgroundColor: "#27af4b",
  },
  passwordHints: {
    width: "100%",
    alignItems: "flex-start",
  },
  dFlex: {
    display: "flex",
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "center",
  },
  label: {
    color: "#6a6a6a",
  },
  link: {
    fontWeight: "bold",
    color: "#27af4b",
    textAlign: "center",
  },
});
