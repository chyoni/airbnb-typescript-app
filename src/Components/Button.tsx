import React from "react";
import styled from "styled-components/native";
import Theme from "../../Theme";
import { View, ActivityIndicator } from "react-native";

const Container = styled<any>(View)`
  background-color: ${props => props.color};
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  border: ${Theme.boxBorder};
  width: ${props => props.width};
`;
const Text = styled.Text`
  color: ${Theme.whiteColor};
`;

interface IProps {
  text: string;
  color: string;
  width: any;
  loading?: boolean;
}

const Button: React.SFC<IProps> = ({ text, color, width, loading = false }) => {
  return (
    <Container color={color} width={width}>
      {loading ? (
        <ActivityIndicator color={"white"} size={"small"} />
      ) : (
        <Text>{text}</Text>
      )}
    </Container>
  );
};

export default Button;
