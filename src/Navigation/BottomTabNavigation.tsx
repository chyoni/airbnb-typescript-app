import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Explore from "../Screen/BottomTab/Explore";
import History from "../Screen/BottomTab/History";

import Notification from "../Screen/BottomTab/Notification";
import MyProfile from "../Screen/BottomTab/Profile/MyProfile";
import YourProfile from "../Screen/BottomTab/Profile/YourProfile";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Theme from "../../Theme";
import FullPost from "../Screen/Post/FullPost";
import Review from "../Screen/Review/Review";
import EditProfile from "../Screen/BottomTab/Profile/EditProfile";

const tabToStack = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      InitialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig
        }
      },
      FullPost: {
        screen: FullPost,
        navigationOptions: {
          headerTitle: "자세히"
        }
      },
      Review: {
        screen: Review,
        navigationOptions: {
          headerTitle: "후기"
        }
      },
      YourProfile: {
        screen: YourProfile,
        navigationOptions: {
          headerTitle: "프로필"
        }
      },
      EditProfile: {
        screen: EditProfile,
        navigationOptions: {
          headerTitle: "프로필 수정"
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

export default createBottomTabNavigator(
  {
    Explore: {
      screen: tabToStack(Explore, {
        headerStyle: {
          borderBottomColor: "#FFFFFF",
          height: 60
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <AntDesign
            name={"search1"}
            size={25}
            color={focused ? Theme.redColor : Theme.blackColor}
          />
        ),
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              color: focused ? Theme.redColor : Theme.blackColor,
              fontSize: 12
            }}
          >
            탐색하기
          </Text>
        )
      }
    },
    History: {
      screen: tabToStack(History, {
        headerTitle: "여행"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <AntDesign
            name={"hearto"}
            size={25}
            color={focused ? Theme.redColor : Theme.blackColor}
          />
        ),
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              color: focused ? Theme.redColor : Theme.blackColor,
              fontSize: 12
            }}
          >
            여행기록
          </Text>
        )
      }
    },
    Hosting: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("HostingNavigation"),
        tabBarIcon: ({ focused }) => (
          <AntDesign
            name={"link"}
            size={25}
            color={focused ? Theme.redColor : Theme.blackColor}
          />
        ),
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              color: focused ? Theme.redColor : Theme.blackColor,
              fontSize: 12
            }}
          >
            숙소등록
          </Text>
        )
      }
    },
    Notification: {
      screen: Notification,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={"ios-notifications-outline"}
            size={29}
            color={focused ? Theme.redColor : Theme.blackColor}
          />
        ),
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              color: focused ? Theme.redColor : Theme.blackColor,
              fontSize: 12
            }}
          >
            알림
          </Text>
        )
      }
    },
    Profile: {
      screen: MyProfile,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <SimpleLineIcons
            name={"user"}
            size={25}
            color={focused ? Theme.redColor : Theme.blackColor}
          />
        ),
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              color: focused ? Theme.redColor : Theme.blackColor,
              fontSize: 12
            }}
          >
            프로필
          </Text>
        )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        height: 60,
        padding: 7
      }
    }
  }
);
