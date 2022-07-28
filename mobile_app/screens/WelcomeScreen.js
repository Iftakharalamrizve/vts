import React from "react";
import { Button, Paragraph } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";
import Logo from "../components/Logo";

const WelcomeScreen = ({ navigation, props }) => {
  return (
    <View style={styles.mainView}>
      <Logo />
      <View style={styles.topImageView}>
        <Image
          source={require(// @ts-ignore
          "../assets/welcome-image.png")}
          style={styles.welcomeImage}
        />
      </View>
      <View style={styles.bottomView}>
        <Button
          style={styles.btnLogin}
          onPress={() => navigation.push("Login")}
          uppercase={false}
          mode="contained"
        >
          Login
        </Button>
        <Button
          style={styles.btnRegistation}
          onPress={() => navigation.push("RegisterAccount")}
          uppercase={false}
          mode="contained"
        >
          Registation
        </Button>
      </View>
      <View style={styles.bottomTextView}>
        <Paragraph style={styles.textCenter}>
          Esistono innumerevoli variazioni ei passaggi del Lorem Ipsum.
        </Paragraph>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeImage: {
    width: "100%",
    height: "100%",
  },
  mainView: {
    height: "100%",
    backgroundColor: "#e9f7ed",
  },
  topImageView: {
    flex: 1,
    /*height:heightScreen/3*/
  },
  bottomView: {
    flex: 1,
    paddingHorizontal: 30,
  },
  btnLogin: {
    marginTop: 30,
    paddingVertical: 5,
    backgroundColor: "#074368",
  },
  btnRegistation: {
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor: "#27af4b",
  },
  bottomTextView: {
    flex: 0.5,
    paddingHorizontal: 50,
  },
  textCenter: {
    textAlign: "center",
  },
});

export default WelcomeScreen;
