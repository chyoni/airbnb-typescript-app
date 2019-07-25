import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient, { Operation } from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import { AuthProvider } from "./AuthContext";
import NavigationController from "./src/Components/NavigationController";

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
      uri: "http://192.168.219.103:4300/graphql",
      request: async (operation: Operation) => {
        const token = await AsyncStorage.getItem("jwt");
        operation.setContext({
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      // headers: {
      //   Authorization: `Bearer ${AsyncStorage.getItem("jwt")}`
      // }
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
          <NavigationController />
        </AuthProvider>
      </ApolloProvider>
    );
  } else {
    return <AppLoading />;
  }
}
