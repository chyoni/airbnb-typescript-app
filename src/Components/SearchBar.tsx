import React from "react";
import styled from "styled-components/native";
import constants from "../../constants";
import Theme from "../../Theme";

const Container = styled.TextInput`
  width: ${constants.width - 40};
  padding: 10px;
  border-radius: 5px;
  background-color: ${Theme.whiteColor};
  border: ${Theme.boxBorder};
`;

interface IProps {
  value: string;
  onChangeText: any;
  onSubmitEditing: any;
}

const SearchBar: React.SFC<IProps> = ({
  value,
  onChangeText,
  onSubmitEditing
}) => {
  return (
    <Container
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      placeholder={"🔍 검색"}
      placeholderTextColor={Theme.lightGreyColor}
      returnKeyType={"search"}
    />
  );
};

export default SearchBar;
