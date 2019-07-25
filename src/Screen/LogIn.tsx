import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LogIn = () => {
  return (
    <Container>
      <Text>LogIn</Text>
    </Container>
  );
};

export default LogIn;
