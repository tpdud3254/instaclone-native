import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar, logUserIn } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthCommon";
import AuthLayout from "../components/auth/AuthLayout";

const LOGIN_MUTATION = gql`
    mutation login($userName: String!, $password: String!) {
        login(userName: $userName, password: $password) {
            ok
            token
            error
        }
    }
`;

export default function LogIn({ route: { params } }) {
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            password: params?.password,
            userName: params?.userName,
        },
    });
    const passwordRef = useRef();
    const onCompleted = async (data) => {
        const {
            login: { ok, token },
        } = data;

        if (ok) {
            await logUserIn(token);
        }
    };
    const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted,
    });
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onValid = (data) => {
        if (!loading) {
            logInMutation({
                variables: {
                    ...data,
                },
            });
        }
    };

    useEffect(() => {
        register("userName", {
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
                value={watch("userName")}
                placeholder="Username"
                autoCapitalize="none"
                placeholderTextColor={"rgba(255,255,255, 0.6)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={(text) => setValue("userName", text)}
            />
            <TextInput
                value={watch("password")}
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
                loading={loading}
                disabled={!watch("userName") || !watch("password")}
                onPress={handleSubmit(onValid)}
            />
        </AuthLayout>
    );
}
