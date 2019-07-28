import React, { useState } from "react";
import styled from "styled-components/native";
import { FlatList, TouchableOpacity, Alert } from "react-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import { MY_PROFILE, CANCEL_RESERVE } from "../../Queries.queries";
import {
  myProfile,
  cancelReservation,
  cancelReservationVariables
} from "../../types/api";
import Loader from "../../Components/Loader";
import constants from "../../../constants";
import Theme from "../../../Theme";
import Button from "../../Components/Button";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";

const Card = styled.View`
  display: flex;
  flex-direction: row;
  width: ${constants.width};
  height: ${constants.height / 2.5};
  padding: 15px;
  border-bottom-color: ${Theme.borderColor};
  border-bottom-width: 1px;
`;
const Image = styled.Image`
  width: 150px;
  height: ${constants.height / 2.5 - 30};
  border-radius: 10px;
  margin-right: 7px;
`;
const InfoBox = styled.View`
  display: flex;
  width: ${constants.width - 180};
  max-height: ${constants.height / 2.5 - 30};
`;
const InfoColumn = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 5px;
`;
const Label = styled.Text`
  font-size: 12px;
  color: ${Theme.titleColor};
`;
const LabelData = styled.Text`
  font-size: 12px;
  color: ${Theme.titleColor};
  font-weight: 600;
`;
const ButtonColumn = styled.View`
  display: flex;
  flex-shrink: 1;
  justify-content: flex-end;
  height: 100%;
`;

//flex-shrink는 전체 플렉스 컨테이너가 컨테이너 안에있는 flex항목들을 다담을만한 크기가 안되있는 조건하에
//flex-shrink의 값이 양수라면 그 값을 양수로 지정한 flex항목들의 사이즈를 알아서 조절해줌
//flex컨테이너 크기에 맞게
interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const History: React.SFC<IProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [cancelLoading, setCancelLoading] = useState<boolean>(false);
  const { data, loading, refetch } = useQuery<myProfile, null>(MY_PROFILE);
  const cancelReserveMutation = useMutation<
    cancelReservation,
    cancelReservationVariables
  >(CANCEL_RESERVE, {
    refetchQueries: () => [{ query: MY_PROFILE }]
  });
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  if (loading) {
    return <Loader />;
  } else if (!loading && data && data.myProfile) {
    const myReserves = data.myProfile.reservations;
    const todayDate = new Date();
    const [today] = todayDate.toISOString().split("T");
    return (
      <FlatList
        data={myReserves}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <Card>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("FullPost", {
                    postId: item.post.id
                  })
                }
              >
                <Image source={{ uri: item.post.thumbNail }} />
              </TouchableOpacity>
              <InfoBox>
                <InfoColumn>
                  <Label>숙소명📌</Label>
                  <LabelData>{item.post.caption}</LabelData>
                </InfoColumn>
                <InfoColumn>
                  <Label>숙소위치📌</Label>
                  <LabelData>{item.post.location}</LabelData>
                </InfoColumn>
                <InfoColumn>
                  <Label>체크인ㅡ체크아웃📌</Label>
                  <LabelData>{`${item.arriveAt} ㅡ ${item.leaveAt}`}</LabelData>
                </InfoColumn>
                <InfoColumn>
                  <Label>예약날짜📌</Label>
                  <LabelData>
                    {`${item.createdDate}  ${item.createdTime}`}
                  </LabelData>
                </InfoColumn>
                <InfoColumn>
                  <Label>인원📌</Label>
                  <LabelData>{`${item.guestCount}명`}</LabelData>
                </InfoColumn>
                <InfoColumn>
                  <Label>예약자📌</Label>
                  <LabelData>{`${item.user.username}님`}</LabelData>
                </InfoColumn>
                <ButtonColumn>
                  {Date.parse(item.arriveAt) > Date.parse(today) ? (
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert("예약을 취소하시겠어요?", "😭", [
                          {
                            text: "네, 취소할게요",
                            onPress: async () => {
                              const [
                                cancelReserveFn,
                                { loading }
                              ] = cancelReserveMutation;
                              try {
                                setCancelLoading(true);
                                const { data } = await cancelReserveFn({
                                  variables: { id: item.id }
                                });
                                if (
                                  !loading &&
                                  data &&
                                  data.cancelReservation
                                ) {
                                  if (data.cancelReservation.ok) {
                                    Alert.alert("정상 취소되었습니다 ☺");
                                  } else {
                                    Alert.alert(data.cancelReservation.error!);
                                  }
                                } else {
                                  Alert.alert("알수없는 오류입니다");
                                }
                              } catch (e) {
                                console.log(e);
                              } finally {
                                setCancelLoading(false);
                              }
                            }
                          },
                          { text: "아니요", onPress: () => null }
                        ])
                      }
                    >
                      <Button
                        text={"예약취소"}
                        color={Theme.redColor}
                        width={"120px"}
                        loading={cancelLoading}
                      />
                    </TouchableOpacity>
                  ) : item.post.isCommented ? (
                    <Button
                      text={"후기작성완료"}
                      color={Theme.blueColor}
                      width={"150px"}
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Review", { postId: item.post.id })
                      }
                    >
                      <Button
                        text={"후기작성"}
                        color={Theme.greenColor}
                        width={"120px"}
                      />
                    </TouchableOpacity>
                  )}
                </ButtonColumn>
              </InfoBox>
            </Card>
          );
        }}
      />
    );
  } else {
    return null;
  }
};

export default History;
