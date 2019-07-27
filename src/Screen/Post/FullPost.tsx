import React from "react";
import styled from "styled-components/native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import { ScrollView, TouchableOpacity } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { FULL_POST } from "../../Queries.queries";
import { seeFullPost, seeFullPostVariables } from "../../types/api";
import Loader from "../../Components/Loader";
import constants from "../../../constants";
import Theme from "../../../Theme";
import Button from "../../Components/Button";
import Avatar from "../../Components/Avatar";
const Image = styled.Image`
  width: ${constants.width};
  height: ${constants.height / 2.5};
`;
const BodyContainer = styled.View`
  flex: 1;
  min-height: ${constants.height};
  padding: 15px;
`;
const Caption = styled.Text`
  width: ${constants.width - 30};
  color: ${Theme.titleColor};
  font-size: 37px;
  font-weight: 600;
`;
const MetaColumn = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${constants.width - 30};
  margin-top: 3px;
  margin-bottom: 20px;
`;
const Left = styled.View`
  width: 70%;
  display: flex;
  justify-content: center;
`;
const Right = styled.View`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LeftText = styled.Text`
  color: ${Theme.titleColor};
  font-size: 16px;
`;
const DataColumn = styled.View`
  display: flex;
  width: ${constants.width - 30};
  margin-bottom: 15px;
`;
const Data = styled.Text`
  font-size: 20px;
  color: ${Theme.blackColor};
  width: ${constants.width - 30};
`;
const BoldData = styled.Text`
  font-size: 20px;
  color: ${Theme.blackColor};
  width: ${constants.width - 30};
  font-weight: 600;
`;
const CommentBox = styled.View`
  width: ${constants.width - 30};
  border-top-color: ${Theme.borderColor};
  border-top-width: 1px;
  display: flex;
`;
const AllComment = styled.Text`
  width: ${constants.width - 30};
  font-size: 20px;
  color: ${Theme.greenColor};
  padding-bottom: 20px;
`;
const Comment = styled.View`
  display: flex;
  margin-top: 30px;
  width: ${constants.width - 30};
`;
const UserInfoField = styled.View`
  display: flex;
  flex-direction: row;
  width: ${constants.width - 30};
`;
const AvatarField = styled.View`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;
const UserField = styled.View`
  display: flex;
  justify-content: center;
`;
const Username = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${Theme.titleColor};
`;
const CreatedDate = styled.Text`
  font-size: 13px;
  color: ${Theme.darkGreyColor};
`;
const CommentData = styled.Text`
  color: ${Theme.titleColor};
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 20px;
`;
const NoComment = styled.Text`
  font-size: 14px;
  color: ${Theme.blackColor};
  font-weight: 600;
  padding: 20px 0;
`;
const Footer = styled.View`
  width: ${constants.width - 30};
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  border-top-color: ${Theme.borderColor};
  border-top-width: 1px;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const FullPost: React.SFC<IProps> = ({ navigation }) => {
  const { data, loading } = useQuery<seeFullPost, seeFullPostVariables>(
    FULL_POST,
    {
      variables: { postId: navigation.getParam("postId") }
    }
  );
  console.log(data, loading);
  if (loading) {
    return <Loader />;
  } else if (!loading && data && data.seeFullPost.post) {
    const fullPost = data.seeFullPost.post;
    return (
      <ScrollView>
        <Image source={{ uri: fullPost.thumbNail }} />
        <BodyContainer>
          <Caption>{fullPost.caption}</Caption>
          <MetaColumn>
            <Left>
              <LeftText>{fullPost.location}</LeftText>
              <LeftText>{`호스트: ${fullPost.host.username}님`}</LeftText>
            </Left>
            <Right>
              <TouchableOpacity>
                <Avatar
                  url={fullPost.host.avatar}
                  width={"100px"}
                  radius={"50px"}
                />
              </TouchableOpacity>
            </Right>
          </MetaColumn>
          <DataColumn>
            <Data>{`체크인 ㅡ 체크아웃 👇`}</Data>
            <BoldData>{`${fullPost.checkIn} ㅡ ${fullPost.checkOut}`}</BoldData>
          </DataColumn>
          <DataColumn>
            <Data>{`최대허용 가능인원 👇`}</Data>
            <BoldData>{`${fullPost.maxPeopleCount}명`}</BoldData>
          </DataColumn>
          <DataColumn>
            <Data>{`가격 👇`}</Data>
            <BoldData>{`${fullPost.price}원`}</BoldData>
          </DataColumn>
          <DataColumn>
            <Data>{`게시일 👇`}</Data>
            <BoldData>{`D:${fullPost.createdDate} T:${
              fullPost.createdTime
            }`}</BoldData>
          </DataColumn>
          <CommentBox>
            {fullPost.comments.length > 0 ? (
              <Comment>
                <UserInfoField>
                  <AvatarField>
                    <TouchableOpacity>
                      <Avatar
                        width={"60px"}
                        radius={"30px"}
                        url={fullPost.comments[0].user.avatar}
                      />
                    </TouchableOpacity>
                  </AvatarField>
                  <UserField>
                    <Username>{fullPost.comments[0].user.username}</Username>
                    <CreatedDate>
                      {fullPost.comments[0].createdDate}
                    </CreatedDate>
                  </UserField>
                </UserInfoField>
                <CommentData>{fullPost.comments[0].text}</CommentData>
                {fullPost.comments.length > 1 && (
                  <TouchableOpacity>
                    <AllComment>{`후기 ${
                      fullPost.commentCount
                    }개 모두보기`}</AllComment>
                  </TouchableOpacity>
                )}
              </Comment>
            ) : (
              <NoComment>😥 후기가 없어요 😥</NoComment>
            )}
          </CommentBox>
          <Footer>
            <TouchableOpacity>
              <Button
                text={"예약하기"}
                color={Theme.redColor}
                width={constants.width - 30}
              />
            </TouchableOpacity>
          </Footer>
        </BodyContainer>
      </ScrollView>
    );
  } else {
    return null;
  }
};

export default FullPost;
