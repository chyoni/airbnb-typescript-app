import { createStackNavigator } from "react-navigation";
import SelectThumbNail from "../Screen/BottomTab/Hosting/SelectThumbNail";
import UploadHosting from "../Screen/BottomTab/Hosting/UploadHosting";
import { AntDesign } from "@expo/vector-icons";
import Theme from "../../Theme";
import React from "react";

export default createStackNavigator(
  {
    SelectThumbNail: {
      screen: SelectThumbNail,
      navigationOptions: {
        headerTitle: "썸네일"
      }
    },
    UploadHosting: {
      screen: UploadHosting,
      navigationOptions: {
        headerTitle: "호스팅"
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerBackImage: (
        <AntDesign name={"left"} size={23} color={Theme.blackColor} />
      )
    }
  }
);
