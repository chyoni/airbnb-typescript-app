import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Confirm = () => {
  return (
    <Container>
      <Text>Confirm</Text>
    </Container>
  );
};

export default Confirm;
