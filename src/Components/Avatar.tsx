import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";

const ExImage = styled<any>(Image)`
  width: ${props => props.width};
  height: ${props => props.width};
  border-radius: ${props => props.radius};
`;

interface IProps {
  width: string;
  url: string | null;
  radius: string;
}

const Avatar: React.SFC<IProps> = ({ width, url, radius }) => {
  if (url === null || url === "") {
    return (
      <ExImage
        source={require("../../assets/noPhoto.jpg")}
        width={width}
        radius={radius}
      />
    );
  } else {
    return <ExImage source={{ uri: url }} width={width} radius={radius} />;
  }
};

export default Avatar;
