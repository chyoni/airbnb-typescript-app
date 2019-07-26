import React from "react";
import styled from "styled-components/native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import { Text } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const FullPost: React.SFC<IProps> = ({ navigation }) => {
  return (
    <Container>
      <Text>FullPost {navigation.getParam("postId")}</Text>
    </Container>
  );
};

export default FullPost;
