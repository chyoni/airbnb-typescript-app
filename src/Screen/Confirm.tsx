import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const Confirm: React.SFC<IProps> = ({ navigation }) => {
  console.log(navigation.getParam("email"));
  return (
    <Container>
      <Text>Confirm</Text>
    </Container>
  );
};

export default Confirm;
