import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { NOTIFICATIONS } from "../../Queries.queries";
import { seeNotification } from "../../types/api";
import Loader from "../../Components/Loader";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import constants from "../../../constants";
import Theme from "../../../Theme";

const Card = styled.View`
  display: flex;
  width: ${constants.width - 40};
  margin-bottom: 10px;
  padding-bottom: 15px;
  border-bottom-color: ${Theme.borderColor};
  border-bottom-width: 1px;
`;
const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${Theme.blackColor};
  margin-bottom: 8px;
`;
const Field = styled.View`
  display: flex;
  width: ${constants.width - 40};
  flex-direction: row;
`;
const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 10px;
`;
const RightField = styled.View`
  display: flex;
`;
const Content = styled.Text`
  font-size: 15px;
  color: ${Theme.blackColor};
`;
const Date = styled.Text`
  font-size: 15px;
  color: ${Theme.darkGreyColor};
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Notification: React.SFC<IProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {
    data: noteData,
    loading: noteLoading,
    refetch: noteRefetch
  } = useQuery<seeNotification, null>(NOTIFICATIONS);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await noteRefetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  if (noteLoading) {
    return <Loader />;
  } else if (!noteLoading && noteData && noteData.seeNotification) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ marginTop: 30, padding: 20 }}
      >
        {noteData.seeNotification.map(note => {
          if (note.reservation !== null) {
            return (
              <Card key={note.id}>
                <Title>예약 알림 🔔</Title>
                <Field>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("History")}
                  >
                    <Image source={{ uri: note.reservation.post.thumbNail }} />
                  </TouchableOpacity>
                  <RightField>
                    <Content>고객님의 예약이 정상 처리되었습니다 ✔</Content>
                    <Date>{`예약날짜 ✔ ${note.createdDate}`}</Date>
                  </RightField>
                </Field>
              </Card>
            );
          } else {
            return null;
          }
        })}
      </ScrollView>
    );
  } else {
    return null;
  }
};

export default Notification;
