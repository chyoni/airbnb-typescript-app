import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Hosting = () => {
  return (
    <Container>
      <Text>Hosting</Text>
    </Container>
  );
};

export default Hosting;
