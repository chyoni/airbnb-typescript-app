import React, { createContext, useState, useContext } from "react";
import { AsyncStorage } from "react-native";

interface IContextProps {
  isLoggedIn: boolean;
  logUserIn: (token: any) => Promise<void>;
  logUserOut: () => Promise<void>;
}

export const AuthContext = createContext({} as IContextProps);

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);

  const logUserIn = async (token: any) => {
    try {
      await AsyncStorage.setItem("jwt", token);
      await AsyncStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext);
  return logUserIn;
};

export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext);
  return logUserOut;
};

// AuthProvider 에서 AuthContext.Provider 를 리턴하고 걔한테 저 3개를 주니까 AuthContext는
// 저 3개를 가지고 있을수 있는것 이렇게 AuthProvider가 모든 컴포넌트를 감싸주니까 따른데에서도
// useContext를 사용할수있음 근데 그렇게 일일이 하나하나 만드는것보다 여기서 딱 3개만들어놓고
//가져다가 쓰는게 편해서 함수를 세개 밑에서 정의한거임
