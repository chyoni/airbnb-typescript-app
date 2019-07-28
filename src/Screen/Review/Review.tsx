import React, { useState } from "react";
import styled from "styled-components/native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView
} from "react-navigation";
import Theme from "../../../Theme";
import { Text, TextInput, TouchableOpacity, Alert } from "react-native";
import useInput from "../../Hooks/useInput";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT, MY_PROFILE } from "../../Queries.queries";
import {
  toggleLike,
  toggleLikeVariables,
  addComment,
  addCommentVariables
} from "../../types/api";
import Button from "../../Components/Button";

const ModalTitle = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: ${Theme.titleColor};
  margin-bottom: 20px;
`;
const SubTitle = styled.Text`
  font-size: 14px;
  color: ${Theme.titleColor};
  font-weight: 600;
`;
const HiddenText = styled<any>(Text)`
  font-size: 25px;
  font-weight: 600;
  color: ${Theme.greenColor};
  opacity: ${props => (props.isHearted ? 1 : 0)};
`;
const ButtonColumn = styled.View`
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 10px;
`;
interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const Review: React.SFC<IProps> = ({ navigation }) => {
  const [isHearted, setIsHearted] = useState<boolean>(false);
  const [commentLoading, setCommentLoading] = useState<boolean>(false);
  const text = useInput("");
  const toggleLikeMutation = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE,
    {
      variables: { postId: navigation.getParam("postId") }
    }
  );
  const addCommentMutation = useMutation<addComment, addCommentVariables>(
    ADD_COMMENT,
    {
      variables: {
        postId: navigation.getParam("postId"),
        text: text.value
      },
      refetchQueries: () => [{ query: MY_PROFILE }]
    }
  );
  const onClickSubmit = async () => {
    try {
      setCommentLoading(true);
      const [addCommentFn, { loading: commentLoading }] = addCommentMutation;
      const { data } = await addCommentFn();
      if (!commentLoading && data && data.addComment) {
        if (data.addComment.ok) {
          Alert.alert("후기 등록이 완료되었습니다", "감사합니다😍");
          text.setValue("");
        } else {
          Alert.alert(data.addComment.error!);
        }
      } else {
        Alert.alert("알수없는 오류입니다 😥");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setCommentLoading(false);
    }
  };
  const onClickHeart = async () => {
    try {
      setIsHearted(!isHearted);
      const [toggleLikeFn, { loading }] = toggleLikeMutation;
      const { data } = await toggleLikeFn();
      if (!loading && data && data.toggleLike) {
        if (data.toggleLike.ok) {
          return;
        } else {
          setIsHearted(!isHearted);
          return;
        }
      } else {
        setIsHearted(!isHearted);
        Alert.alert("알수없는 오류입니다 😥");
        return;
      }
    } catch (e) {
      setIsHearted(!isHearted);
      console.log(e);
    }
  };
  return (
    <ScrollView style={{ padding: 10 }}>
      <ModalTitle>후기 작성 🖍</ModalTitle>
      <TextInput
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          width: "100%",
          borderBottomColor: Theme.borderColor,
          borderBottomWidth: 1
        }}
        value={text.value}
        onChangeText={text.onChangeText}
        placeholder={"후기 작성..."}
        multiline
      />
      <SubTitle style={{ marginTop: 30 }}>
        해당 숙소가 마음에 드셨나요?
      </SubTitle>
      <SubTitle>좋은시간 보내셨다면 좋아요 한번 부탁드립니다😍</SubTitle>
      <TouchableOpacity style={{ marginTop: 30 }} onPress={onClickHeart}>
        <Ionicons
          name={isHearted ? "ios-heart" : "ios-heart-empty"}
          size={50}
          color={Theme.greenColor}
        />
      </TouchableOpacity>
      <HiddenText isHearted={isHearted}>
        ❤ 소중한 좋아요 감사합니다 ❤
      </HiddenText>
      <ButtonColumn>
        <TouchableOpacity onPress={onClickSubmit}>
          <Button
            text={"완료"}
            color={Theme.greenColor}
            width={"80px"}
            loading={commentLoading}
          />
        </TouchableOpacity>
      </ButtonColumn>
    </ScrollView>
  );
};

export default Review;
