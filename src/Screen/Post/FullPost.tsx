import React, { useState } from "react";
import styled from "styled-components/native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import {
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import { FULL_POST, MAKE_RESERVE } from "../../Queries.queries";
import {
  seeFullPost,
  seeFullPostVariables,
  makeReservation,
  makeReservationVariables
} from "../../types/api";
import Loader from "../../Components/Loader";
import constants from "../../../constants";
import Theme from "../../../Theme";
import Button from "../../Components/Button";
import Avatar from "../../Components/Avatar";
import { Ionicons } from "@expo/vector-icons";
import TextInput from "../../Components/TextInput";
import useInput from "../../Hooks/useInput";
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
const ModalView = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.8);
`;
const ModalHeader = styled.View`
  width: ${constants.width};
  height: 80px;
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
`;
const ModalBody = styled.View`
  flex: 1;
  padding: 10px;
`;
const ModalTitle = styled.Text`
  font-size: 30px;
  color: ${Theme.greenColor};
  font-weight: 600;
  margin-bottom: 8px;
`;
const ModalHorizontal = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${constants.width - 20};
  justify-content: flex-end;
`;
const CommentModalContainer = styled.View`
  padding: 15px;
  display: flex;
  width: ${constants.width};
`;
const CommentModalTitle = styled.Text`
  font-size: 30px;
  color: ${Theme.titleColor};
  font-weight: 600;
  margin-bottom: 30px;
`;
const CommentCard = styled.View`
  display: flex;
  padding: 30px;
  width: ${constants.width - 30};
  margin-bottom: 30px;
  border-top-color: ${Theme.borderColor};
  border-top-width: 1px;
  border-bottom-color: ${Theme.borderColor};
  border-bottom-width: 1px;
`;
const CardHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${constants.width - 30};
  margin-bottom: 30px;
`;
const CardHeaderAvatar = styled.View`
  display: flex;
  justify-content: center;
  width: 15%;
`;
const CardHeaderInfo = styled.View`
  width: 95%;
  display: flex;
  justify-content: center;
  margin-left: 10px;
`;
const CardComment = styled.Text`
  color: ${Theme.blackColor};
  font-size: 15px;
`;
interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const FullPost: React.SFC<IProps> = ({ navigation }) => {
  const [reserveModal, setReserveModal] = useState<boolean>(false);
  const [commentModal, setCommentModal] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const checkInInput = useInput("");
  const checkOutInput = useInput("");
  const guestCountInput = useInput("");
  const { data, loading } = useQuery<seeFullPost, seeFullPostVariables>(
    FULL_POST,
    {
      variables: { postId: navigation.getParam("postId") }
    }
  );
  const makeReserve = useMutation<makeReservation, makeReservationVariables>(
    MAKE_RESERVE,
    {
      variables: {
        postId: navigation.getParam("postId"),
        guestCount: parseInt(guestCountInput.value, 10),
        arriveAt: checkInInput.value,
        leaveAt: checkOutInput.value
      }
    }
  );
  const toggleReserveModal = () => {
    setReserveModal(!reserveModal);
  };
  const toggleCommentModal = () => {
    setCommentModal(!commentModal);
  };
  const onClickReserve = async () => {
    if (
      checkInInput.value === "" ||
      checkOutInput.value === "" ||
      guestCountInput.value === ""
    ) {
      Alert.alert("위 사항을 모두 입력해주세요 🙄");
    } else {
      try {
        setLoadingState(true);
        const [reserveFn, { loading: reserveLoading }] = makeReserve;
        const { data } = await reserveFn();
        if (!reserveLoading && data && data.makeReservation) {
          if (data.makeReservation.ok) {
            Alert.alert(
              "예약이 성공적으로 완료되었습니다",
              "여행 목록에서 예약내역을 확인하세요 😍"
            );
            checkInInput.setValue("");
            checkOutInput.setValue("");
            guestCountInput.setValue("");
          } else {
            Alert.alert(data.makeReservation.error!);
          }
        } else {
          Alert.alert("일시적 오류입니다", "잠시후 다시시도해 주세요😥");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoadingState(false);
      }
    }
  };
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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("YourProfile", {
                    username: fullPost.host.username
                  })
                }
              >
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
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("YourProfile", {
                          username: fullPost.comments[0].user.username
                        })
                      }
                    >
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
                  <TouchableOpacity onPress={toggleCommentModal}>
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
            <TouchableOpacity onPress={toggleReserveModal}>
              <Button
                text={"예약하기"}
                color={Theme.redColor}
                width={constants.width - 30}
              />
            </TouchableOpacity>
          </Footer>
        </BodyContainer>
        <Modal
          visible={reserveModal}
          transparent={false}
          animationType={"slide"}
        >
          <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior={"height"}>
            <ModalView>
              <ModalHeader>
                <TouchableOpacity onPress={toggleReserveModal}>
                  <Ionicons
                    name={"ios-close"}
                    size={40}
                    color={Theme.blackColor}
                  />
                </TouchableOpacity>
              </ModalHeader>
              <ScrollView>
                <ModalBody>
                  <ModalTitle>숙소 정보</ModalTitle>
                  <DataColumn>
                    <Data>{`숙박 가능한 날짜👇`}</Data>
                    <BoldData>{`${fullPost.checkIn} 부터 ${
                      fullPost.checkOut
                    }까지`}</BoldData>
                  </DataColumn>
                  <DataColumn>
                    <Data>{`최대허용 가능인원 👇`}</Data>
                    <BoldData>{`${fullPost.maxPeopleCount}명`}</BoldData>
                  </DataColumn>
                  <DataColumn>
                    <Data>{`가격 👇`}</Data>
                    <BoldData>{`${fullPost.price}원`}</BoldData>
                  </DataColumn>
                  <ModalTitle>예약 정보</ModalTitle>
                  <DataColumn>
                    <BoldData>{`체크인 👇`}</BoldData>
                    <TextInput
                      placeholder={"체크인(EX:2019-11-11)"}
                      onChangeText={checkInInput.onChangeText}
                      value={checkInInput.value}
                      width={constants.width - 20}
                    />
                  </DataColumn>
                  <DataColumn>
                    <BoldData>{`체크아웃 👇`}</BoldData>
                    <TextInput
                      placeholder={"체크아웃(EX:2019-11-20)"}
                      onChangeText={checkOutInput.onChangeText}
                      value={checkOutInput.value}
                      width={constants.width - 20}
                    />
                  </DataColumn>
                  <DataColumn>
                    <BoldData>{`숙박 인원 👇`}</BoldData>
                    <TextInput
                      placeholder={"인원(EX:2)"}
                      onChangeText={guestCountInput.onChangeText}
                      value={guestCountInput.value}
                      width={constants.width - 20}
                    />
                  </DataColumn>
                  <ModalHorizontal>
                    <TouchableOpacity onPress={onClickReserve}>
                      <Button
                        text={"예약하기"}
                        color={Theme.redColor}
                        width={"100px"}
                        loading={loadingState}
                      />
                    </TouchableOpacity>
                  </ModalHorizontal>
                </ModalBody>
              </ScrollView>
            </ModalView>
          </KeyboardAvoidingView>
        </Modal>
        <Modal
          visible={commentModal}
          animationType={"slide"}
          transparent={false}
        >
          <ModalView>
            <ModalHeader>
              <TouchableOpacity onPress={toggleCommentModal}>
                <Ionicons
                  name={"ios-close"}
                  size={40}
                  color={Theme.blackColor}
                />
              </TouchableOpacity>
            </ModalHeader>
            <ScrollView>
              <CommentModalContainer>
                <CommentModalTitle>{`후기 ${
                  fullPost.commentCount
                }개`}</CommentModalTitle>
                {fullPost.comments.map(comment => (
                  <CommentCard key={comment.id}>
                    <CardHeader>
                      <CardHeaderAvatar>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("YourProfile", {
                              username: comment.user.username
                            })
                          }
                        >
                          <Avatar
                            width={"50px"}
                            url={comment.user.avatar}
                            radius={"25px"}
                          />
                        </TouchableOpacity>
                      </CardHeaderAvatar>
                      <CardHeaderInfo>
                        <Username>{comment.user.username}</Username>
                        <CreatedDate>{comment.createdDate}</CreatedDate>
                      </CardHeaderInfo>
                    </CardHeader>
                    <CardComment>{comment.text}</CardComment>
                  </CommentCard>
                ))}
              </CommentModalContainer>
            </ScrollView>
          </ModalView>
        </Modal>
      </ScrollView>
    );
  } else {
    return null;
  }
};

export default FullPost;
