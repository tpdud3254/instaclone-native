import React from "react";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { nav } from "../constant";

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: black;
`;

const Logo = styled.Image`
    max-width: 60%;
    height: 100px;
`;

const CreateAccount = styled.View`
    background-color: ${(props) => props.theme.accent};
    padding: 7px 10px;
    border-radius: 3px;
    margin-top: 10px;
`;
const CreateAccountText = styled.Text`
    color: white;
    font-weight: 600;
`;

const LoginLink = styled.Text`
    color: ${(props) => props.theme.accent};
    font-weight: 600;
    margin-top: 10px;
    font-size: 15px;
`;
export default function Welcome({ navigation }) {
    const goToCreateAccount = () => navigation.navigate(nav.CreateAccount);
    const goToLogIn = () => navigation.navigate(nav.LogIn);
    return (
        <Container>
            <Logo resizeMode="contain" source={require("../assets/logo.png")} />
            {/* 네트워크 이미지, 정적 리소스, 임시 로컬 이미지 및 카메라 롤과 같은 로컬 디스크의 이미지를 포함하여 다양한 유형의 이미지를 표시하기 위한 React 컴포넌트입니다.
source: 이미지 소스(원격 URL 또는 로컬 파일 리소스) */}
            <TouchableOpacity onPress={goToCreateAccount}>
                <CreateAccount>
                    <CreateAccountText>Create Account</CreateAccountText>
                </CreateAccount>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToLogIn}>
                <LoginLink>Log in</LoginLink>
            </TouchableOpacity>
        </Container>
    );
}
