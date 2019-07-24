import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const preLoad = async () => {
    await Font.loadAsync({
      ...Ionicons.font,
      ...FontAwesome.font
    });
    await Asset.loadAsync([
      require("./assets/noPhoto.jpg"),
      require("./assets/logo.png")
    ]);
    setLoaded(true);
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded ? (
    <View>
      <Text>loading success!!!!!!!!!!!!</Text>
    </View>
  ) : (
    <AppLoading />
  );
}
