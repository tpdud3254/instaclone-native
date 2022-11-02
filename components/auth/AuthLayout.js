import React from "react";
import {
    Keyboard,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../DismissKeyboard";

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: black;
    padding: 0px 20px;
`;

const Logo = styled.Image`
    max-width: 50%;
    height: 100px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 20px;
`;

export default function AuthLayout({ children }) {
    return (
        <DismissKeyboard>
            <Container>
                <KeyboardAvoidingView
                    style={{ width: "100%" }}
                    behavior="position"
                    keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
                >
                    <Logo
                        resizeMode="contain"
                        source={require("../../assets/logo.png")}
                    />
                    {/* 네트워크 이미지, 정적 리소스, 임시 로컬 이미지 및 카메라 롤과 같은 로컬 디스크의 이미지를 포함하여 다양한 유형의 이미지를 표시하기 위한 React 컴포넌트입니다.
source: 이미지 소스(원격 URL 또는 로컬 파일 리소스) */}
                    {children}
                </KeyboardAvoidingView>
            </Container>
        </DismissKeyboard>
    );
}
