import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  NavigationInjectedProps,
  withNavigation
} from "react-navigation";
import constants from "../../constants";
import Theme from "../../Theme";
import Avatar from "./Avatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import { Ionicons } from "@expo/vector-icons";

const Header = styled.View`
  display: flex;
  flex-direction: row;
  width: ${constants.width - 30};
  padding-bottom: 20px;
  border-bottom-color: ${Theme.borderColor};
  border-bottom-width: 1px;
`;
const HeaderTitle = styled.Text`
  font-size: 30px;
  font-weight: 600;
  flex-shrink: 1;
  color: ${Theme.blackColor};
`;
const HeaderAvatar = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Section = styled.View`
  display: flex;
  width: ${constants.width - 30};
  padding-top: 20px;
  padding-bottom: 5px;
  border-bottom-color: ${Theme.borderColor};
  border-bottom-width: 1px;
`;
const SectionText = styled.Text`
  font-size: 17px;
  color: ${Theme.blackColor};
  margin-bottom: 15px;
`;
const Bold = styled.Text`
  font-weight: 600;
  font-size: 20px;
`;
const SwiperTitle = styled.Text`
  font-size: 17px;
  color: ${Theme.blackColor};
  font-weight: 600;
  margin: 20px 0;
`;
const SwiperCard = styled.View`
  display: flex;
`;
const SwiperImage = styled.Image`
  width: ${constants.width - 30};
  height: 200px;
  border-radius: 10px;
  margin-bottom: 8px;
`;
const SwiperCaption = styled.Text`
  font-size: 15px;
  color: ${Theme.blackColor};
  font-weight: 600;
`;
const SwiperLocation = styled.Text`
  font-size: 15px;
  color: ${Theme.darkGreyColor};
`;
const SwiperDate = styled.Text`
  font-size: 15px;
  color: ${Theme.darkGreyColor};
`;
const SwiperHorizontal = styled.View`
  display: flex;
  flex-direction: row;
  width: ${constants.width - 30};
  align-items: center;
`;
const SwiperLikeCount = styled.Text`
  font-size: 15px;
  color: ${Theme.darkGreyColor};
`;
const Footer = styled.View`
  flex: 1;
  width: ${constants.width - 30};
  padding-top: 15px;
  border-top-color: ${Theme.borderColor};
  border-top-width: 1px;
`;
const FooterTitle = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: ${Theme.blackColor};
  padding-bottom: 20px;
`;
const CommentCard = styled.View`
  display: flex;
  width: ${constants.width - 30};
  margin-bottom: 20px;
  border-bottom-color: ${Theme.borderColor};
  border-bottom-width: 1px;
  padding-bottom: 20px;
`;
const CommentHeader = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;
const CommentHeaderAvatar = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;
const CommentHeaderUser = styled.View`
  display: flex;
  justify-content: center;
`;
const HeaderUsername = styled.Text`
  font-size: 15px;
  color: ${Theme.blackColor};
  font-weight: 600;
`;
const HeaderDate = styled.Text`
  font-size: 15px;
  color: ${Theme.darkGreyColor};
`;
const CommentText = styled.Text`
  font-size: 16px;
  color: ${Theme.blackColor};
`;

interface IProps {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string | null;
  username: string;
  avatar: string | null;
  createdDate: string | null;
  createdTime: string | null;
  hostings: Array<any>;
  comments: Array<any>;
  isSelf: boolean;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Profile: React.SFC<IProps & Partial<NavigationInjectedProps>> = ({
  id,
  firstName,
  lastName,
  fullName,
  username,
  avatar,
  createdDate,
  createdTime,
  hostings,
  comments,
  isSelf,
  navigation
}) => {
  const empty: any = [];
  const haveCommentArray = hostings.filter(hosting => {
    return hosting.comments.length > 0;
  });
  haveCommentArray.map(obj =>
    obj.comments.map(comment => {
      empty.push(comment);
    })
  );
  return (
    <ScrollView style={{ padding: 15, marginTop: 30 }}>
      <Header>
        <HeaderTitle>{`안녕하세요 저는 ${username} 입니다.`}</HeaderTitle>
        <HeaderAvatar>
          <Avatar width={"80px"} url={avatar} radius={"40px"} />
        </HeaderAvatar>
      </Header>
      <Section>
        <SectionText>
          성📌 <Bold>{firstName}</Bold>
        </SectionText>
        <SectionText>
          이름📌 <Bold>{lastName}</Bold>
        </SectionText>
        <SectionText>
          작성한 후기📌 <Bold>{`${comments.length}개`}</Bold>
        </SectionText>
        <SectionText>
          회원가입📌 <Bold>{createdDate}</Bold>
        </SectionText>
        {hostings.length > 0 ? (
          <SectionText>호스트 ⭕</SectionText>
        ) : (
          <SectionText>호스트 ❌</SectionText>
        )}
        <SectionText>인증완료 ✅</SectionText>
        {isSelf ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile", { username })}
          >
            <SectionText
              style={{ color: Theme.greenColor, fontSize: 22, marginTop: 10 }}
            >
              프로필 수정
            </SectionText>
          </TouchableOpacity>
        ) : null}
      </Section>
      <SwiperTitle>{`${username}님의 숙소`}</SwiperTitle>
      {hostings.length > 0 ? (
        <Swiper style={{ maxHeight: 330 }} loop={false}>
          {hostings.map(hosting => (
            <TouchableOpacity
              key={hosting.id}
              onPress={() =>
                navigation.navigate("FullPost", { postId: hosting.id })
              }
            >
              <SwiperCard>
                <SwiperImage source={{ uri: hosting.thumbNail }} />
                <SwiperCaption>{hosting.caption}</SwiperCaption>
                <SwiperLocation>{hosting.location}</SwiperLocation>
                <SwiperDate>{`게시일: ${hosting.createdDate}`}</SwiperDate>
                <SwiperHorizontal>
                  <Ionicons
                    name={"ios-heart"}
                    size={18}
                    color={Theme.greenColor}
                  />
                  <SwiperLikeCount>{`(${hosting.likeCount})`}</SwiperLikeCount>
                </SwiperHorizontal>
              </SwiperCard>
            </TouchableOpacity>
          ))}
        </Swiper>
      ) : (
        <SwiperTitle>등록된 숙소가 없어요 😐</SwiperTitle>
      )}
      {hostings.length > 0 ? (
        <Footer>
          <FooterTitle>{`후기 ${empty.length}개`}</FooterTitle>
          {empty.map(comment => (
            <CommentCard key={comment.id}>
              <CommentHeader>
                <CommentHeaderAvatar>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("YourProfile", {
                        username: comment.user.username
                      })
                    }
                  >
                    <Avatar
                      width={"50px"}
                      radius={"25px"}
                      url={comment.user.avatar}
                    />
                  </TouchableOpacity>
                </CommentHeaderAvatar>
                <CommentHeaderUser>
                  <HeaderUsername>{comment.user.username}</HeaderUsername>
                  <HeaderDate>{comment.createdDate}</HeaderDate>
                </CommentHeaderUser>
              </CommentHeader>
              <CommentText>{comment.text}</CommentText>
            </CommentCard>
          ))}
        </Footer>
      ) : (
        <Footer>
          <FooterTitle>후기가 없어요 😐</FooterTitle>
        </Footer>
      )}
    </ScrollView>
  );
};

export default withNavigation(Profile);
