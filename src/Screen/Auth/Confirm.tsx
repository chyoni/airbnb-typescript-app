import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import styled from "styled-components/native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import TextInput from "../../Components/TextInput";
import useInput from "../../Hooks/useInput";
import constants from "../../../constants";
import Button from "../../Components/Button";
import Theme from "../../../Theme";
import { useMutation } from "react-apollo-hooks";
import { confirmSecret, confirmSecretVariables } from "../../types/api";
import { CONFIRM } from "../../Queries.queries";
import { useLogIn } from "../../../AuthContext";

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
const Confirm: React.SFC<IProps> = ({ navigation }) => {
  const emailForLogIn = navigation.getParam("email");
  const [loading, setLoading] = useState<boolean>(false);
  const secretKey = useInput("");
  const logIn = useLogIn();
  const confirmMutation = useMutation<confirmSecret, confirmSecretVariables>(
    CONFIRM,
    {
      variables: { email: emailForLogIn, loginSecret: secretKey.value }
    }
  );
  const onClickLogIn = async () => {
    if (secretKey.value === "" || !secretKey.value.includes(" ")) {
      Alert.alert("시크릿 키를 다시 확인해주세요 🙄");
      return;
    }
    const [confirmSecretFn, { loading }] = confirmMutation;
    try {
      setLoading(true);
      const { data } = await confirmSecretFn();
      if (!loading && data && data.confirmSecret) {
        if (data.confirmSecret.ok) {
          logIn(data.confirmSecret.token);
        } else {
          Alert.alert("알수 없는 오류입니다 😥");
        }
      } else {
        Alert.alert("알수 없는 오류입니다 😥");
      }
    } catch (e) {
      Alert.alert(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <TextInput
          placeholder={"시크릿 키(Secret Key)"}
          value={secretKey.value}
          onChangeText={secretKey.onChangeText}
          width={constants.width / 1.5}
          returnKeyType={"done"}
        />
        <Touchable onPress={onClickLogIn}>
          <Button
            text={"로그인"}
            color={Theme.greenColor}
            width={constants.width / 1.5}
            loading={loading}
          />
        </Touchable>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Confirm;
