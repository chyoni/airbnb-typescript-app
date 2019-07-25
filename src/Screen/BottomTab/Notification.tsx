import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Notification = () => {
  return (
    <Container>
      <Text>Notification</Text>
    </Container>
  );
};

export default Notification;
