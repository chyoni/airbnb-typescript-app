import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import styled from "styled-components/native";
import TextInput from "../../Components/TextInput";
import useInput from "../../Hooks/useInput";
import constants from "../../../constants";
import Button from "../../Components/Button";
import Theme from "../../../Theme";
import { useMutation } from "react-apollo-hooks";
import { REQUEST_SECRET } from "../../Queries.queries";
import { requestSecret, requestSecretVariables } from "../../types/api";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Touchable = styled.TouchableOpacity`
  margin-top: 15px;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const LogIn: React.SFC<IProps> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const email = useInput("");
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const requestSecret = useMutation<requestSecret, requestSecretVariables>(
    REQUEST_SECRET,
    {
      variables: { email: email.value }
    }
  );
  const onClickRequestSecret = async () => {
    if (email.value === "") {
      Alert.alert("이메일을 입력해주세요🙄");
      return;
    } else if (!emailRegex.test(email.value)) {
      Alert.alert("이메일을 확인해 주세요🙄");
      return;
    } else {
      const [
        requestSecretFn,
        { loading: requestSecretLoading }
      ] = requestSecret;
      try {
        setLoading(true);
        const { data } = await requestSecretFn();
        if (!requestSecretLoading && data && data.requestSecret) {
          if (data.requestSecret.ok) {
            Alert.alert("시크릿 키를 보냈습니다 이메일을 확인해 주세요 😍");
            navigation.navigate("Confirm", { email: email.value });
          } else {
            Alert.alert(data.requestSecret.error!);
          }
        } else {
          Alert.alert("알수없는 오류입니다 😥");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <TextInput
          width={constants.width / 1.5}
          placeholder={"이메일(Email)"}
          value={email.value}
          onChangeText={email.onChangeText}
          returnKeyType={"done"}
        />
        <Touchable onPress={onClickRequestSecret}>
          <Button
            width={constants.width / 1.5}
            text={"시크릿 키 요청"}
            color={Theme.redColor}
            loading={loading}
          />
        </Touchable>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default LogIn;
