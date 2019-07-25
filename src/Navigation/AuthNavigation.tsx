import { createAppContainer, createStackNavigator } from "react-navigation";
import AuthHome from "../Screen/AuthHome";
import SignUp from "../Screen/SignUp";
import LogIn from "../Screen/LogIn";
import Confirm from "../Screen/Confirm";
const AuthNavigation = createStackNavigator({
  AuthHome,
  SignUp,
  LogIn,
  Confirm
});

export default createAppContainer(AuthNavigation);
