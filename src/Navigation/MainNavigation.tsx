import { createAppContainer, createStackNavigator } from "react-navigation";
import BottomTabNavigation from "./BottomTabNavigation";
import HostingNavigation from "./HostingNavigation";

const MainNavigation = createStackNavigator(
  {
    BottomTabNavigation,
    HostingNavigation
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(MainNavigation);
