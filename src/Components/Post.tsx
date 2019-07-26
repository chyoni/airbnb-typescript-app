import React from "react";
import {
  withNavigation,
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  NavigationInjectedProps
} from "react-navigation";
import styled from "styled-components/native";
import constants from "../../constants";
import Theme from "../../Theme";
import { Ionicons } from "@expo/vector-icons";
const Touchable = styled.TouchableOpacity``;
const PostContainer = styled.View`
  width: ${constants.width - 40};
  min-height: ${constants.height / 2};
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const Image = styled.Image`
  width: ${constants.width - 40};
  height: ${constants.height / 2};
  border-radius: 10px;
`;
const Horizontal = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Location = styled.Text`
  font-size: 15px;
  padding-top: 5px;
  color: ${Theme.darkGreyColor};
`;
const Caption = styled.Text`
  font-size: 20px;
  font-weight: 600;
  padding-top: 5px;
  color: ${Theme.titleColor};
`;
const LikeCount = styled.Text`
  font-size: 13px;
  margin-left: 5px;
  color: ${Theme.darkGreyColor};
`;
const CreatedDate = styled.Text`
  font-size: 13px;
  margin-left: 5px;
  color: ${Theme.darkGreyColor};
  margin-left: 180px;
`;
interface IProps {
  id: string;
  thumbNail: string;
  caption: string;
  location: string;
  createdDate: string | null;
  likeCount: number;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Post: React.SFC<IProps & Partial<NavigationInjectedProps>> = ({
  id,
  caption,
  location,
  createdDate,
  likeCount,
  thumbNail,
  navigation
}) => {
  return (
    <PostContainer>
      <Touchable
        onPress={() => navigation.navigate("FullPost", { postId: id })}
      >
        <Image source={{ uri: thumbNail }} />
      </Touchable>
      <Horizontal>
        <Location>{location}</Location>
      </Horizontal>
      <Horizontal>
        <Caption>{caption}</Caption>
      </Horizontal>
      <Horizontal>
        <Ionicons name={"ios-heart"} size={15} color={Theme.greenColor} />
        <LikeCount>{`(${likeCount})`}</LikeCount>
        <CreatedDate>{`게시일: ${createdDate}`}</CreatedDate>
      </Horizontal>
    </PostContainer>
  );
};

export default withNavigation(Post);
