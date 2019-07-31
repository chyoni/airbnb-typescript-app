import React, { useState } from "react";
import styled from "styled-components/native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView
} from "react-navigation";
import { Image, Alert, ActivityIndicator } from "react-native";
import constants from "../../../../constants";
import Theme from "../../../../Theme";
import TextInput from "../../../Components/TextInput";
import useInput from "../../../Hooks/useInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMutation } from "react-apollo-hooks";
import { HOSTING, SEE_FEED } from "../../../Queries.queries";
import { hostingPost, hostingPostVariables } from "../../../types/api";
import { API_KEY } from "../../../../secret";
import axios from "axios";

const ScrollContainer = styled.View`
  display: flex;
  padding: 20px;
`;

const Horizontal = styled.View`
  display: flex;
  width: ${constants.width - 10};
  margin-bottom: 10px;
`;
const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${Theme.blackColor};
  margin-right: 10px;
`;
const UploadButton = styled.View`
  background-color: ${Theme.redColor};
  width: ${constants.width - 60};
  padding: 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const UploadInner = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${Theme.whiteColor};
`;
interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const UploadHosting: React.SFC<IProps> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const thumbNail = navigation.getParam("thumbNail");
  const caption = useInput("");
  const location = useInput("");
  const checkIn = useInput("");
  const checkOut = useInput("");
  const maxPeopleCount = useInput("");
  const price = useInput("");
  const uploadMutation = useMutation<hostingPost, hostingPostVariables>(
    HOSTING,
    {
      refetchQueries: () => [{ query: SEE_FEED }]
    }
  );
  const upload = async () => {
    setLoading(true);
    if (
      caption.value === "" ||
      location.value === "" ||
      checkIn.value === "" ||
      checkOut.value === "" ||
      maxPeopleCount.value === "" ||
      price.value === ""
    ) {
      Alert.alert("모든 항목은 필수사항입니다 🙄🙄");
      return;
    }
    const formData = new FormData();

    formData.append("file", {
      uri: thumbNail.uri,
      type: thumbNail.type,
      name: thumbNail.uri
    } as any);
    formData.append("timestamp", ((Date.now() / 1000) | 0).toString());
    formData.append("api_key", API_KEY);
    formData.append("upload_preset", "bojlyeke");

    try {
      const {
        data: { secure_url }
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/dctekasfv/image/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data"
          }
        }
      );
      console.log(secure_url);
      if (secure_url) {
        const [uploadFn, { loading: mutationLoading }] = uploadMutation;
        const { data } = await uploadFn({
          variables: {
            thumbNail: secure_url,
            caption: caption.value,
            location: location.value,
            checkIn: checkIn.value,
            checkOut: checkOut.value,
            maxPeopleCount: parseInt(maxPeopleCount.value, 10),
            price: parseInt(price.value, 10)
          }
        });
        if (!mutationLoading && data && data.hostingPost) {
          if (data.hostingPost.ok) {
            navigation.navigate("Explore");
          } else {
            Alert.alert(data.hostingPost.error!);
          }
        } else {
          Alert.alert("알수없는 오류입니다");
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView style={{ padding: 10 }}>
      <Image
        source={{ uri: thumbNail.uri }}
        style={{ width: constants.width - 20, height: 350, borderRadius: 10 }}
      />
      <ScrollContainer>
        <Horizontal>
          <Label>숙소명</Label>
          <TextInput
            placeholder={"숙소명"}
            value={caption.value}
            onChangeText={caption.onChangeText}
            width={constants.width - 60}
          />
        </Horizontal>
        <Horizontal>
          <Label>숙소위치</Label>
          <TextInput
            placeholder={"숙소위치"}
            value={location.value}
            onChangeText={location.onChangeText}
            width={constants.width - 60}
          />
        </Horizontal>
        <Horizontal>
          <Label>체크인 가능날짜</Label>
          <TextInput
            placeholder={"체크인 가능날짜(Ex:2019-07-31)"}
            value={checkIn.value}
            onChangeText={checkIn.onChangeText}
            width={constants.width - 60}
          />
        </Horizontal>
        <Horizontal>
          <Label>체크아웃 가능날짜</Label>
          <TextInput
            placeholder={"체크아웃 가능날짜(Ex:2019-08-31)"}
            value={checkOut.value}
            onChangeText={checkOut.onChangeText}
            width={constants.width - 60}
          />
        </Horizontal>
        <Horizontal>
          <Label>최대 허용인원</Label>
          <TextInput
            placeholder={"최대 허용인원(Ex:4)"}
            value={maxPeopleCount.value}
            onChangeText={maxPeopleCount.onChangeText}
            width={constants.width - 60}
          />
        </Horizontal>
        <Horizontal>
          <Label>가격</Label>
          <TextInput
            placeholder={"가격(Ex:10000)"}
            value={price.value}
            onChangeText={price.onChangeText}
            width={constants.width - 60}
          />
        </Horizontal>
        <TouchableOpacity onPress={upload}>
          <UploadButton>
            {loading ? (
              <ActivityIndicator color={"white"} size={"small"} />
            ) : (
              <UploadInner>숙소 업로드</UploadInner>
            )}
          </UploadButton>
        </TouchableOpacity>
      </ScrollContainer>
    </ScrollView>
  );
};

export default UploadHosting;
