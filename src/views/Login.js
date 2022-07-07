import React, { useState, useEffect, useCallback, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import logo from "../assets/logo.png";
import { KeyboardDismissView, Text } from "../styles/Style";
import {
  Container,
  Image,
  Input,
  LoginBtn,
  PasswordContainer,
  BtnText,
  CreateBtn,
  CreateText,
  PasswordIcon,
} from "../styles/Auth";
import { ActivityIndicator, Alert, Keyboard } from "react-native";
import { useDispatch } from "react-redux";
import userSlice from "../redux/slices/user";
import { useLogin, useTokenLogin } from "../hooks/userHooks";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { usePromotions } from "../hooks/promotionHooks";
import promotionSlice from "../redux/slices/Promotion";

const Login = ({ navigation }) => {
  // Redux Variables
  const dispatch = useDispatch();

  // useState Variables
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showing, setShowing] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  // useRef Variables
  const idRef = useRef();
  const passwordRef = useRef();

  // Variables
  let btnActivation = Boolean(userId && password);

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        const token = await SecureStore.getItemAsync("token");

        if (token) {
          // Set user information
          const userData = await useTokenLogin(token);
          if (userData) {
            dispatch(
              userSlice.actions.setUser({
                userId: userData._id,
                userName: userData.userName,
                userImage: userData.userImage,
                channel: userData.channel,
                role: userData.role,
                storeName: userData.storeName,
                phoneNumber: userData.phoneNumber,
                userAddress: userData.userAddress,
                token,
              })
            );
          }

          // Set user's current promotion data
          const promotionData = await usePromotions(token);
          if (promotionData) {
            dispatch(
              promotionSlice.actions.setPromotion({
                array: [...promotionData],
              })
            );
          }

          navigation.navigate("Stack");
        } else {
          return;
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        // setTimeout(async () => await SplashScreen.hideAsync(), 350);
        await SplashScreen.hideAsync();
      }
    };
    checkUserLogin();
  }, []);

  // Send login data to BE to search user data matched.
  // BE will verify user info and issue a token.
  // FE will receive the token and save it to user's localstorage.
  const submitUserInfo = useCallback(async () => {
    if (loginLoading) return;

    if (!userId || !userId.trim())
      return Alert.alert("알림", "아이디를 입력해주세요.");
    if (!password || !password.trim())
      return Alert.alert("알림", "비밀번호를 입력해주세요.");

    try {
      setLoginLoading(true);
      const response = await useLogin(userId, password);
      if (response) {
        dispatch(
          userSlice.actions.setUser({
            userId: response._id,
            userName: response.userName,
            userImage: response.userImage,
            channel: response.channel,
            role: response.role,
            storeName: response.storeName,
            phoneNumber: response.phoneNumber,
            userAddress: response.userAddress,
            token: response.token,
          })
        );

        const data = await usePromotions(response.token);

        if (data) {
          dispatch(
            promotionSlice.actions.setPromotion({
              array: [...data],
            })
          );

          navigation.navigate("Stack");
        }
      }
    } catch (error) {
      Alert.alert("알림", error.message);
    } finally {
      setLoginLoading(false);
    }
  }, [navigation, userId, password]);

  const handleId = useCallback((text) => {
    setUserId(text.trim());
  }, []);
  const handlePassword = useCallback((text) => {
    setPassword(text.trim());
  }, []);
  const moveToSignUpPage = useCallback(() => {
    navigation.navigate("Register");
  }, [navigation]);

  return (
    <KeyboardDismissView onPress={Keyboard.dismiss}>
      <Container>
        <Image source={logo} />
        <Text style={{ fontSize: 30, marginBottom: 40 }}>로 그 인</Text>
        <Input
          placeholderTextColor="#000"
          placeholder="아이디"
          onChangeText={(text) => handleId(text)}
          value={userId}
          autoCapitalize="none"
          ref={idRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
          required={true}
        />
        <PasswordContainer>
          <Input
            placeholderTextColor="#000" 
            placeholder="비밀번호"
            secureTextEntry={showing}
            onChangeText={(text) => handlePassword(text)}
            value={password}
            autoCapitalize="none"
            ref={passwordRef}
            required={true}
          />
          <PasswordIcon onPress={() => setShowing((prev) => !prev)}>
            {showing ? (
              <Ionicons name="eye-outline" size={24} color="black" />
            ) : (
              <Ionicons name="eye-off-outline" size={24} color="black" />
            )}
          </PasswordIcon>
        </PasswordContainer>
        <LoginBtn
          onPress={submitUserInfo}
          disabled={!btnActivation || loginLoading}
          style={{ backgroundColor: btnActivation ? "#ff7d0d" : "#aaa" }}
        >
          {loginLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <BtnText>로그인</BtnText>
          )}
        </LoginBtn>
        <CreateBtn onPress={moveToSignUpPage}>
          <CreateText>가입하기</CreateText>
        </CreateBtn>
      </Container>
    </KeyboardDismissView>
  );
};

export default Login;
