import React, { useEffect, useRef } from "react";
import { Alert } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthCommon";
import { useForm } from "react-hook-form";

export default function CreateAccount() {
    const { register, handleSubmit, setValue } = useForm();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };

    const onValid = (data) => {
        console.log(data);
    };

    useEffect(() => {
        register("firstName", {
            required: true,
        });
        register("lastName", {
            required: true,
        });
        register("username", {
            required: true,
        });
        register("email", {
            required: true,
        });
        register("password", {
            required: true,
        });
    }, [register]);
    //TODOS: 유효성 검사
    //React Native에서는 error를 가져올 때 const { formState: { errors } } = useForm();을 해야 됩니다
    return (
        <AuthLayout>
            <TextInput
                // autoFocus={true}
                placeholder="First Name"
                placeholderTextColor={"rgba(255,255,255, 0.6)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(lastNameRef)}
                onChangeText={(text) => setValue("firstName", text)}
            />
            <TextInput
                ref={lastNameRef}
                placeholder="Last Name"
                placeholderTextColor={"rgba(255,255,255, 0.6)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(usernameRef)}
                onChangeText={(text) => setValue("lastName", text)}
            />
            <TextInput
                ref={usernameRef}
                placeholder="Username"
                placeholderTextColor={"rgba(255,255,255, 0.6)"}
                returnKeyType="next"
                autoCapitalize="none"
                onSubmitEditing={() => onNext(emailRef)}
                onChangeText={(text) => setValue("username", text)}
            />
            <TextInput
                ref={emailRef}
                placeholder="Email"
                placeholderTextColor={"rgba(255,255,255, 0.6)"}
                keyboardType="email-address"
                returnKeyType="next"
                autoCapitalize="none"
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={(text) => setValue("email", text)}
            />
            <TextInput
                ref={passwordRef}
                placeholder="Password"
                placeholderTextColor={"rgba(255,255,255, 0.6)"}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={(text) => setValue("password", text)}
                lastOne={true}
            />
            <AuthButton
                text="Create Account"
                disabled={false}
                onPress={handleSubmit(onValid)}
            />
        </AuthLayout>
    );
}
// TODOS: https://reactnative.dev/docs/textinput
// 많은 기능들이 있으니 독스 한번 보길 추천
