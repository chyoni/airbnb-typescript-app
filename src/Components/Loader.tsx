import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import Theme from "../../Theme";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loader: React.SFC = () => {
  return (
    <Container>
      <ActivityIndicator size={"small"} color={Theme.blackColor} />
    </Container>
  );
};

export default Loader;
