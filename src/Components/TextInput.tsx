import React from "react";
import { TextInput as TextInputByNative } from "react-native";
import styled from "styled-components/native";
import Theme from "../../Theme";

const Input = styled<any>(TextInputByNative)`
  width: ${props => props.width};
  border-bottom-color: ${Theme.darkGreyColor};
  border-bottom-width: 1px;
  padding: 10px;
`;

interface IProps {
  placeholder: string;
  onChangeText: any;
  value: string;
  width: any;
  returnKeyType?: string;
}

const TextInput: React.SFC<IProps> = ({
  width,
  placeholder,
  onChangeText,
  value,
  returnKeyType
}) => {
  return (
    <Input
      width={width}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      returnKeyType={returnKeyType}
    />
  );
};

export default TextInput;
