import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  NavigationState,
  NavigationParams,
  NavigationScreenProp
} from "react-navigation";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import { SEE_USER, EDIT, MY_PROFILE } from "../../../Queries.queries";
import {
  seeUser,
  seeUserVariables,
  editUser,
  editUserVariables
} from "../../../types/api";
import Loader from "../../../Components/Loader";
import constants from "../../../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import Theme from "../../../../Theme";
import TextInput from "../../../Components/TextInput";
import useInput from "../../../Hooks/useInput";
import Button from "../../../Components/Button";
import { API_KEY } from "../../../../secret";
import axios from "axios";

const Container = styled.View`
  flex: 1;
  padding: 15px;
`;
const AvatarField = styled.View`
  width: ${constants.width - 30};
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 30px;
  border-bottom-color: ${Theme.borderColor};
  border-bottom-width: 1px;
`;
const InfoField = styled.View`
  width: ${constants.width - 30};
  display: flex;
  align-items: center;
`;
const Column = styled.View`
  display: flex;
  margin-top: 30px;
`;
const Label = styled.Text`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  color: ${Theme.blackColor};
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const EditProfile: React.SFC<IProps> = ({ navigation }) => {
  const username = navigation.getParam("username");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();
  const [avatarState, setAvatarState] = useState<string | null>(null);
  const firstName = useInput("");
  const lastName = useInput("");
  const { data, loading: queryLoading } = useQuery<seeUser, seeUserVariables>(
    SEE_USER,
    {
      variables: { username }
    }
  );
  const editMutation = useMutation<editUser, editUserVariables>(EDIT, {
    refetchQueries: () => [{ query: MY_PROFILE }]
  });
  const preLoad = async () => {
    if (!queryLoading && data && data.seeUser) {
      if (data.seeUser.avatar) {
        setAvatarState(data.seeUser.avatar);
      }
      try {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
          setHasPermission(true);
        }
      } catch (e) {
        console.log(e);
        setHasPermission(false);
      }
    }
  };
  const pickImage = async () => {
    let pickImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false
    });
    if (!pickImage.cancelled) {
      setAvatarState(pickImage.uri);
      setSelected(pickImage);
    }
  };
  const onClickEdit = async () => {
    if (firstName.value === "" || lastName.value === "") {
      Alert.alert("성과 이름은 필수사항 입니다 🙄");
      return;
    }
    const [editFn, { loading: editLoading }] = editMutation;
    setLoading(true);
    if (selected === undefined) {
      //이미지를 수정하지않을 때
      const { data } = await editFn({
        variables: {
          firstName: firstName.value,
          lastName: lastName.value,
          username
        }
      });
      if (!editLoading && data && data.editUser) {
        if (data.editUser.ok) {
          Alert.alert("수정이 완료되었습니다🙂");
        } else {
          Alert.alert(data.editUser.error!);
        }
      } else {
        Alert.alert("잠시 후 다시 시도해 주세요 😥");
      }
    } else {
      const formData = new FormData();

      formData.append("file", {
        uri: selected.uri,
        type: selected.type,
        name: selected.uri
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
        console.log("secure", secure_url);
        if (secure_url) {
          const { data } = await editFn({
            variables: {
              avatar: secure_url,
              username,
              firstName: firstName.value,
              lastName: lastName.value
            }
          });
          if (!editLoading && data && data.editUser) {
            if (data.editUser.ok) {
              Alert.alert("수정이 완료되었습니다🙂");
            } else {
              Alert.alert(data.editUser.error!);
            }
          } else {
            Alert.alert("알수없는 오류입니다 😥");
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    preLoad();
  }, [data]);
  if (queryLoading) {
    return <Loader />;
  } else if (!queryLoading && hasPermission && data && data.seeUser) {
    const user = data.seeUser;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior={"height"}>
          <Container>
            <AvatarField>
              <TouchableOpacity onPress={pickImage}>
                {user.avatar === null || "" ? (
                  <Image
                    style={{ width: 130, height: 130, borderRadius: 65 }}
                    source={require("../../../../assets/noPhoto.jpg")}
                  />
                ) : (
                  <Image
                    style={{ width: 130, height: 130, borderRadius: 65 }}
                    source={{ uri: avatarState! }}
                  />
                )}
              </TouchableOpacity>
            </AvatarField>
            <InfoField>
              <Column>
                <Label>성📌</Label>
                <TextInput
                  placeholder={"성(First Name)"}
                  onChangeText={firstName.onChangeText}
                  value={firstName.value}
                  width={constants.width - 100}
                />
              </Column>
              <Column>
                <Label>이름📌</Label>
                <TextInput
                  placeholder={"이름(Last Name)"}
                  onChangeText={lastName.onChangeText}
                  value={lastName.value}
                  width={constants.width - 100}
                />
              </Column>
              <Column>
                <TouchableOpacity onPress={onClickEdit}>
                  <Button
                    text={"수정 완료"}
                    color={Theme.blueColor}
                    width={constants.width - 100}
                    loading={loading}
                  />
                </TouchableOpacity>
              </Column>
            </InfoField>
          </Container>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  } else {
    return null;
  }
};

export default EditProfile;
