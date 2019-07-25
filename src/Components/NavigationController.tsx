import React from "react";
import { Text, View } from "react-native";
import { useIsLoggedIn } from "../../AuthContext";
import AuthNavigation from "../Navigation/AuthNavigation";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn ? (
    <View>
      <Text>LogIn</Text>
    </View>
  ) : (
    <AuthNavigation />
  );
};
