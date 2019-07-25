import { createAppContainer, createStackNavigator } from "react-navigation";
import AuthHome from "../Screen/Auth/AuthHome";
import SignUp from "../Screen/Auth/SignUp";
import LogIn from "../Screen/Auth/LogIn";
import Confirm from "../Screen/Auth/Confirm";
const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    LogIn,
    Confirm,
    SignUp
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AuthNavigation);
