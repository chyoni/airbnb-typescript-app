import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Profile = () => {
  return (
    <Container>
      <Text>Profile</Text>
    </Container>
  );
};

export default Profile;
