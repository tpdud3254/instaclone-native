import React from "react";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { nav } from "../constant";

const LoginLink = styled.Text`
    color: ${(props) => props.theme.accent};
    font-weight: 600;
    margin-top: 10px;
    font-size: 15px;
    margin-top: 20px;
    text-align: center;
`;

export default function Welcome({ navigation }) {
    const goToCreateAccount = () => navigation.navigate(nav.CreateAccount);
    const goToLogIn = () => navigation.navigate(nav.LogIn);
    return (
        <AuthLayout>
            <AuthButton
                disabled={false}
                onPress={goToCreateAccount}
                text={"Create New Account"}
            />
            <TouchableOpacity onPress={goToLogIn}>
                <LoginLink>Log In</LoginLink>
            </TouchableOpacity>
        </AuthLayout>
    );
}
