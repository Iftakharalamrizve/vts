import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default function Loading() {
  const [loading, setLoading] = React.useState(true);
  const store = useSelector((state) => state);
  return (
    <>
      {store.settings.isLoading && (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.38)",
          }}
        >
          <ActivityIndicator
            size="large"
            color="#C2FFFA"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
            }}
          />
        </View>
      )}
    </>
  );
}
