import React, { useState, useEffect } from "react";
import { View, AsyncStorage, Text } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient, { Operation } from "apollo-boost";
import apolloOptions from "./Apollo";
import { ApolloProvider } from "react-apollo-hooks";
import { AuthProvider } from "./AuthContext";

export default function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [clientReady, setClientReady] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<any>(null);
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

    const client = new ApolloClient({
      cache,
      ...apolloOptions,
      request: async (operation: Operation) => {
        const token = await AsyncStorage.getItem("jwt");
        operation.setContext({ headers: { Authorization: `Bearer ${token}` } });
      }
    });

    const isLoggedInCheck = await AsyncStorage.getItem("isLoggedIn");
    if (isLoggedInCheck === null || isLoggedInCheck === "false") {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }

    setClientReady(client);
    setLoaded(true);
  };

  useEffect(() => {
    preLoad();
  }, []);

  if (loaded && clientReady && isLoggedIn !== null) {
    return (
      <ApolloProvider client={clientReady}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <View>
            <Text>GOGOGOGO</Text>
          </View>
        </AuthProvider>
      </ApolloProvider>
    );
  } else {
    return <AppLoading />;
  }
}
