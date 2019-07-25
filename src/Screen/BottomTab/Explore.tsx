import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Explore = () => {
  return (
    <Container>
      <Text>Explore</Text>
    </Container>
  );
};

export default Explore;
