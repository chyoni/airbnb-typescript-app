import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import styled from "styled-components/native";
import TextInput from "../../Components/TextInput";
import useInput from "../../Hooks/useInput";
import constants from "../../../constants";
import Button from "../../Components/Button";
import Theme from "../../../Theme";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "../../Queries.queries";
import { createAccount, createAccountVariables } from "../../types/api";
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
const InputBox = styled.View`
  width: ${constants.width};
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
`;
const Touchable = styled.TouchableOpacity``;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SignUp: React.SFC<IProps> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const signUpEmail = useInput("");
  const signUpUsername = useInput("");
  const signUpFirstName = useInput("");
  const signUpLastName = useInput("");
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const createAccountMutation = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT, {
    variables: {
      email: signUpEmail.value,
      username: signUpUsername.value,
      firstName: signUpFirstName.value,
      lastName: signUpLastName.value
    }
  });
  const onClickCreate = async () => {
    if (
      signUpEmail.value === "" ||
      signUpUsername.value === "" ||
      signUpFirstName.value === "" ||
      signUpLastName.value === ""
    ) {
      Alert.alert("모든 요소는 필수사항 입니다😊");
      return;
    }
    if (!emailRegex.test(signUpEmail.value)) {
      Alert.alert("이메일 올바르게 적었는지 확인해주세요 🙄");
      return;
    }
    const [
      createMutationFn,
      { loading: mutationLoading }
    ] = createAccountMutation;
    try {
      setLoading(true);
      const { data } = await createMutationFn();
      if (!mutationLoading && data && data.createAccount) {
        if (data.createAccount.ok) {
          Alert.alert("회원가입이 정상 처리되었습니다 😍");
          navigation.navigate("LogIn");
        } else {
          Alert.alert(data.createAccount.error!, "😥");
        }
      } else {
        Alert.alert("알수없는 오류입니다 😥");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <InputBox>
          <TextInput
            placeholder={"이메일(Email)"}
            onChangeText={signUpEmail.onChangeText}
            value={signUpEmail.value}
            width={constants.width / 1.5}
            returnKeyType={"next"}
          />
        </InputBox>
        <InputBox>
          <TextInput
            placeholder={"닉네임(Username)"}
            onChangeText={signUpUsername.onChangeText}
            value={signUpUsername.value}
            width={constants.width / 1.5}
            returnKeyType={"next"}
          />
        </InputBox>
        <InputBox>
          <TextInput
            placeholder={"성(First Name)"}
            onChangeText={signUpFirstName.onChangeText}
            value={signUpFirstName.value}
            width={constants.width / 1.5}
            returnKeyType={"next"}
          />
        </InputBox>
        <InputBox>
          <TextInput
            placeholder={"이름(Last Name)"}
            onChangeText={signUpLastName.onChangeText}
            value={signUpLastName.value}
            width={constants.width / 1.5}
            returnKeyType={"done"}
          />
        </InputBox>
        <Touchable onPress={onClickCreate}>
          <Button
            text={"회원가입"}
            color={Theme.greenColor}
            width={constants.width / 1.5}
            loading={loading}
          />
        </Touchable>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
