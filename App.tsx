import React, { useState, useEffect } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient, { Operation, PresetConfig } from "apollo-boost";
import apolloOptions from "./Apollo";

export default function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [clientReady, setClientReady] = useState<any>(null);
  const preLoad = async () => {
    await Font.loadAsync({
      ...Ionicons.font,
      ...FontAwesome.font
    });
    await Asset.loadAsync([
      require("./assets/noPhoto.jpg"),
      require("./assets/logo.png")
    ]);
    const cache = new InMemoryCache();

    await persistCache({
      cache,
      storage: AsyncStorage
    });

    const client = new ApolloClient<PresetConfig>({
      cache,
      ...apolloOptions,
      request: async (operation: Operation) => {
        const token = await AsyncStorage.getItem("jwt");
        operation.setContext({ headers: { Authorization: `Bearer ${token}` } });
      }
    });
    setClientReady(client);
    setLoaded(true);
  };

  useEffect(() => {
    preLoad();
  }, []);

  if (loaded && clientReady) {
    return (
      <View>
        <Text>loading ok!</Text>
      </View>
    );
  } else {
    return <AppLoading />;
  }
}
