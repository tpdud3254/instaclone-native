import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthCommon";
import AuthLayout from "../components/auth/AuthLayout";

export default function LogIn() {
    const { register, handleSubmit, setValue } = useForm();
    const passwordRef = useRef();

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onValid = (data) => {
        console.log(data);
    };

    useEffect(() => {
        register("username");
        register("password");
    }, [register]);
    //TODOS: 유효성 검사
    //React Native에서는 error를 가져올 때 const { formState: { errors } } = useForm();을 해야 됩니다
    return (
        <AuthLayout>
            <TextInput
                placeholder="Username"
                autoCapitalize="none"
                placeholderTextColor={"rgba(255,255,255, 0.6)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={(text) => setValue("username", text)}
            />
            <TextInput
                ref={passwordRef}
                placeholder="Password"
                placeholderTextColor={"rgba(255,255,255, 0.6)"}
                secureTextEntry
                returnKeyType="done"
                lastOne={true}
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={(text) => setValue("password", text)}
            />
            <AuthButton
                text="Log In"
                disabled={false}
                onPress={handleSubmit(onValid)}
            />
        </AuthLayout>
    );
}
