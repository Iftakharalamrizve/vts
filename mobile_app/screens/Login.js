import React, { Component } from "react";
import { memo, useCallback, useState } from "react";
import { Card, Title, Button, Paragraph, TextInput } from "react-native-paper";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

class Login extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      userCredentials:{
        email:'',
        password:'',
      }
    };
  }

  userLogIn(){
    this.props.navigation.navigate("AppStack");
  }

  render(){
    return(
    <View style={styles.mainSection}>
      <View style={styles.loginSection}>
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
          <Card.Title title="Log in to britto" />
          <Card.Content>
            <TextInput
              label="Email"
              mode="outlined"
              style={styles.inputDesign}
              onChangeText={(text)=>{
                this.state.userCredentials.email=text
              }}
            />
            <TextInput
              label="Password"
              mode="outlined"
              password={true}
              style={styles.inputDesign}
              onChangeText={(text)=>{
                this.state.userCredentials.password=text
              }}
            />

            <View style={styles.forgotPassword}>
              <TouchableOpacity onPress={() => navigation.navigate("")}>
                <Text style={styles.label}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>

            <Button
              style={styles.btnLogin}
              onPress={async () => {
                this.userLogIn();
                // await dispatch({ type: "CHANGE_AUTH_STATUS" });
                //props.navigation.navigate("AppStack");
              }}
              mode="contained"
            >
              Log In
            </Button>
            <View style={styles.dFlex}>
              <Text style={styles.label}>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("")}>
                <Text style={styles.link}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
        <View style={styles.socialAccountSection}>
          <View style={styles.dFlex}>
            <Text style={styles.socialAccountText}>
              Sign in with social account
            </Text>
          </View>
          <Button style={styles.btnGoogle} mode="contained">
            Log In
          </Button>
        </View>
      </View>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  mainSection: {
    width: "100%",
  },
  loginSection: {
    width: "100%",
    backgroundColor: "#064368",
  },
  logoContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: 10,
    paddingTop: 10,
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
  btnLogin: {
    marginTop: 16,
    marginBottom: 6,
    paddingVertical: 5,
    backgroundColor: "#27af4b",
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
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
  socialAccountSection: {},
  socialAccountText: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },
  btnGoogle: {
    marginTop: 16,
    paddingVertical: 5,
    backgroundColor: "#dc3f1e",
  },
});

export default Login;
