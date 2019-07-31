import React, { useState, useEffect } from "react";
import { TouchableOpacity, Alert } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import Loader from "../../../Components/Loader";
import constants from "../../../../constants";
import Theme from "../../../../Theme";
import { MaterialIcons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
`;
const BackgroundImage = styled.ImageBackground`
  width: ${constants.width};
  height: ${constants.height / 2};
  display: flex;
`;
const Button = styled.View`
  width: 60px;
  padding: 15px 5px;
  background-color: ${Theme.redColor};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text`
  color: ${Theme.whiteColor};
  font-size: 13px;
  font-weight: 600;
`;
const SelectView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const SelectButton = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${Theme.blackColor};
  margin-bottom: 15px;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SelectThumbNail: React.SFC<IProps> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [oncePick, setOncePick] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({ first: 150 });
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
      } else {
        Alert.alert("앨범에 접근하지 못했습니다 😭");
        return;
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    }
  };
  const navigateUpload = () => {
    navigation.navigate("UploadHosting", { thumbNail: selected });
  };
  const pickImage = async () => {
    let pickImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true
    });
    if (!pickImage.cancelled) {
      setOncePick(true);
      setSelected(pickImage);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);

  if (loading) {
    return <Loader />;
  } else if (hasPermission) {
    return (
      <Container>
        <BackgroundImage
          source={{ uri: selected.uri }}
          blurRadius={!oncePick ? 50 : 0}
        >
          <TouchableOpacity
            disabled={oncePick ? false : true}
            onPress={navigateUpload}
          >
            <Button
              style={{
                marginTop: 30,
                alignSelf: "flex-end",
                marginRight: 10,
                opacity: oncePick ? 1 : 0.2
              }}
            >
              <Text>선택</Text>
            </Button>
          </TouchableOpacity>
        </BackgroundImage>
        <SelectView>
          <SelectButton>👇썸네일에 사용될 사진을 선택하세요👇</SelectButton>
          <TouchableOpacity onPress={pickImage}>
            <MaterialIcons
              name={"add-to-photos"}
              color={Theme.blueColor}
              size={70}
            />
          </TouchableOpacity>
        </SelectView>
      </Container>
    );
  } else {
    return null;
  }
};

export default SelectThumbNail;
