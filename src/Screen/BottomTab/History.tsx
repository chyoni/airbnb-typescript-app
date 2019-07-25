import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const History = () => {
  return (
    <Container>
      <Text>History</Text>
    </Container>
  );
};

export default History;
