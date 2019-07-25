import React from "react";
import styled from "styled-components/native";
import constants from "../../constants";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import Theme from "../../Theme";
import Button from "../Components/Button";

const Container = styled.View`
  flex: 1;
  width: ${constants.width};
  height: ${constants.height};
  padding: 20px;
  margin: 50px 0;
`;
const LogoColumn = styled.View`
  width: ${constants.width - 40};
  height: 65px;
  display: flex;
`;
const Logo = styled.Image`
  width: 60px;
  height: 60px;
`;
const ButtonColumn = styled.View`
  flex: 1;
  width: ${constants.width - 40};
  align-items: center;
  justify-content: center;
`;
const Touchable = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const AuthHome: React.SFC<IProps> = ({ navigation }) => {
  return (
    <Container>
      <LogoColumn>
        <Logo source={require("../../assets/logo.png")} />
      </LogoColumn>
      <ButtonColumn>
        <Touchable onPress={() => navigation.navigate("LogIn")}>
          <Button width={"150px"} color={Theme.redColor} text={"로그인"} />
        </Touchable>
        <Touchable onPress={() => navigation.navigate("SignUp")}>
          <Button width={"150px"} color={Theme.redColor} text={"회원가입"} />
        </Touchable>
      </ButtonColumn>
    </Container>
  );
};

export default AuthHome;
