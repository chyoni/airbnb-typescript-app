import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, Modal, Alert } from "react-native";
import constants from "../../../../constants";
import { useQuery } from "react-apollo-hooks";
import { SEE_FEED, SEARCH } from "../../../Queries.queries";
import { seeFeed, searchPost, searchPostVariables } from "../../../types/api";
import Post from "../../../Components/Post";
import Loader from "../../../Components/Loader";
import Theme from "../../../../Theme";
import { Ionicons } from "@expo/vector-icons";
import useInput from "../../../Hooks/useInput";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  NavigationInjectedProps,
  withNavigation
} from "react-navigation";

const Container = styled.View`
  flex: 1;
  min-height: ${constants.height / 2};
  padding: 20px;
`;
const ConditionContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${constants.width};
  padding: 0 20px;
`;
const ConditionButtonColumn = styled.View`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const PriceButton = styled.View`
  width: 50px;
  padding: 10px;
  background-color: ${Theme.whiteColor};
  border: ${Theme.boxBorder};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ResetButton = styled.View`
  width: 70px;
  padding: 10px;
  background-color: ${Theme.whiteColor};
  border: ${Theme.boxBorder};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;
const Text = styled.Text`
  color: ${Theme.blueColor};
`;
const ModalView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
`;
const ModalContainer = styled.View`
  width: ${constants.width / 1.3};
  height: ${constants.height / 3};
  background-color: ${Theme.whiteColor};
  border: ${Theme.boxBorder};
  display: flex;
  border-radius: 10px;
`;
const ModalHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #e6e6e6;
  height: 45px;
`;
const ModalHeaderTitle = styled.View`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HeaderTitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${Theme.titleColor};
  margin-left: 20px;
`;
const ModalHeaderClose = styled.View`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalBody = styled.View`
  flex: 1;
  padding: 15px;
`;
const ModalColumn = styled.View`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ModalLabel = styled.Text`
  font-size: 15px;
`;
const ModalInput = styled.TextInput`
  width: 150px;
  padding: 8px;
  border: ${Theme.boxBorder};
  border-radius: 8px;
  background-color: white;
`;
const OK = styled.View`
  background-color: ${Theme.blueColor};
  border-radius: 8px;
  width: 60px;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;
const OKtext = styled.Text`
  color: ${Theme.whiteColor};
  font-size: 15px;
`;
const HorizontalBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;
const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  margin-right: 10px;
`;
const InfoBox = styled.View`
  flex: 1;
  padding: 5px 0;
`;
const Caption = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${Theme.titleColor};
`;
const Location = styled.Text`
  font-size: 11px;
  color: ${Theme.darkGreyColor};
`;
const CreatedDate = styled.Text`
  font-size: 11px;
  color: ${Theme.darkGreyColor};
`;
const Column = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;
const LikeCount = styled.Text`
  font-size: 11px;
  color: ${Theme.darkGreyColor};
`;
interface IProps {
  term: string;
  shouldFetch: boolean;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const ExplorePresenter: React.SFC<
  IProps & Partial<NavigationInjectedProps>
> = ({ term, shouldFetch, navigation }) => {
  const [refetchLoading, setRefetchLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const priceGte = useInput("");
  const priceLte = useInput("");
  const { data, loading } = useQuery<seeFeed, null>(SEE_FEED);
  const {
    data: searchData,
    loading: searchLoading,
    refetch: searchRefetch
  } = useQuery<searchPost, searchPostVariables>(SEARCH, {
    variables: { term },
    skip: !shouldFetch
  });
  const onOpen = () => {
    setIsOpen(!isOpen);
  };
  const searchByPrice = async () => {
    if (priceGte.value === "" || priceLte.value === "") {
      Alert.alert("가격을 입력해주세요 🙄");
      return;
    } else if (term === "") {
      Alert.alert("검색어를 먼저 입력해주세요 🙄");
      return;
    }
    try {
      await setIsOpen(false);
      await searchRefetch({
        term,
        priceGte: parseInt(priceGte.value, 10),
        priceLte: parseInt(priceLte.value, 10)
      });
    } catch (e) {
      console.log(e);
    }
  };
  const searchByTerm = async () => {
    if (term === "") {
      Alert.alert("초기화 할 내용이 없습니다 😐");
    } else {
      try {
        await searchRefetch({ term, priceGte: undefined, priceLte: undefined });
        priceGte.setValue("");
        priceLte.setValue("");
      } catch (e) {
        console.log(e);
      }
    }
  };
  if (refetchLoading || loading || searchLoading) {
    return <Loader />;
  } else {
    return (
      <ScrollView>
        <ConditionContainer>
          <ConditionButtonColumn>
            <Touchable onPress={onOpen}>
              <PriceButton>
                <Text>금액</Text>
              </PriceButton>
            </Touchable>
            <Touchable onPress={searchByTerm}>
              <ResetButton>
                <Text>초기화</Text>
              </ResetButton>
            </Touchable>
          </ConditionButtonColumn>
        </ConditionContainer>
        {!shouldFetch && data && data.seeFeed && (
          <Container>
            {data.seeFeed.map(post => (
              <Post
                key={post.id}
                id={post.id}
                thumbNail={post.thumbNail}
                caption={post.caption}
                location={post.location}
                createdDate={post.createdDate}
                likeCount={post.likeCount}
              />
            ))}
          </Container>
        )}
        {shouldFetch && searchData && searchData.searchPost && (
          <Container>
            {searchData.searchPost.map(post => (
              <Touchable
                key={post.id}
                onPress={() =>
                  navigation.navigate("FullPost", { postId: post.id })
                }
              >
                <HorizontalBox>
                  <Image source={{ uri: post.thumbNail }} />
                  <InfoBox>
                    <Caption>{post.caption}</Caption>
                    <Location>{post.location}</Location>
                    <CreatedDate>{`게시일:${post.createdDate}`}</CreatedDate>
                    <Column>
                      <Ionicons
                        name={"ios-heart"}
                        size={10}
                        color={Theme.greenColor}
                      />
                      <LikeCount>{`(${post.likeCount})`}</LikeCount>
                    </Column>
                  </InfoBox>
                </HorizontalBox>
              </Touchable>
            ))}
          </Container>
        )}
        <Modal visible={isOpen} transparent={true} animationType={"fade"}>
          <ModalView>
            <ModalContainer>
              <ModalHeader>
                <ModalHeaderTitle>
                  <HeaderTitle>가격 설정</HeaderTitle>
                </ModalHeaderTitle>
                <ModalHeaderClose>
                  <Touchable onPress={onOpen}>
                    <Ionicons
                      name={"ios-close"}
                      size={30}
                      color={Theme.blackColor}
                    />
                  </Touchable>
                </ModalHeaderClose>
              </ModalHeader>
              <ModalBody>
                <ModalColumn>
                  <ModalLabel>최소 가격👉</ModalLabel>
                  <ModalInput
                    placeholder={"최소(EX: 1000)"}
                    value={priceGte.value}
                    onChangeText={priceGte.onChangeText}
                    returnKeyType={"done"}
                  />
                </ModalColumn>
                <ModalColumn>
                  <ModalLabel>최대 가격👉</ModalLabel>
                  <ModalInput
                    placeholder={"최대(EX: 50000)"}
                    value={priceLte.value}
                    onChangeText={priceLte.onChangeText}
                    returnKeyType={"done"}
                  />
                </ModalColumn>
                <ModalColumn>
                  <Touchable onPress={searchByPrice}>
                    <OK>
                      <OKtext>검색</OKtext>
                    </OK>
                  </Touchable>
                </ModalColumn>
              </ModalBody>
            </ModalContainer>
          </ModalView>
        </Modal>
      </ScrollView>
    );
  }
};

export default withNavigation(ExplorePresenter);
