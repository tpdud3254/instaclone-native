import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Text,
    View,
} from "react-native";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";
import useMe from "../hooks/useMe";
import { Ionicons } from "@expo/vector-icons";

const SEND_MESSAGE_MUTATION = gql`
    mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
        sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
            ok
            id
        }
    }
`;

const ROOM_QUERY = gql`
    query seeRoom($id: Int!) {
        seeRoom(id: $id) {
            id
            messages {
                id
                payload
                user {
                    userName
                    avatar
                }
                read
            }
        }
    }
`;

const MessageContainer = styled.View`
    padding: 5px 10px;
    flex-direction: ${(porps) => (porps.outGoing ? "row-reverse" : "row")};
    align-items: flex-end;
`;
const Author = styled.View``;
const Avatar = styled.Image`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.3);
`;
// const Username = styled.Text`
//     color: white;
// `;

const DefaultAvatar = styled.View`
    width: 20px;
    height: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    background-color: gray;
`;
const Message = styled.Text`
    color: white;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 5px 10px;
    border-radius: 10px;
    overflow: hidden;
    font-size: 16px;
    margin: 0px 10px;
    max-width: 70%;
`;
const TextInput = styled.TextInput`
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 10px 20px;
    color: white;
    border-radius: 50%;
    width: 90%;
    margin-right: 10px;
`;

const InputContainer = styled.View`
    width: 95%;
    margin-bottom: 50px;
    margin-top: 25px;
    flex-direction: row;
    align-items: center;
`;
const SendButton = styled.TouchableOpacity``;

export default function Room({ route, navigation }) {
    const { data: meData } = useMe();
    const { register, handleSubmit, setValue, getValues, watch } = useForm();

    const updateSendMessage = (cache, result) => {
        const {
            data: {
                sendMessage: { ok, id },
            },
        } = result;

        if (ok && meData) {
            const { message } = getValues();
            setValue("message", "");
            const messageObj = {
                id,
                payload: message,
                user: {
                    userName: meData.me.userName,
                    avatar: meData.me.avatar,
                },
                read: true,
                __typename: "Message",
            };

            const messageFragment = cache.writeFragment({
                fragment: gql`
                    fragment NewMessage on Message {
                        id
                        payload
                        user {
                            userName
                            avatar
                        }
                        read
                    }
                `,
                data: messageObj,
            });

            cache.modify({
                id: `Room:${route.params.id}`,
                fields: {
                    messages: (prev) => [...prev, messageFragment],
                },
            }); //TODOS: 이해가 잘 안감,,
        }
    };

    const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
        SEND_MESSAGE_MUTATION,
        {
            update: updateSendMessage,
        }
    );
    const { data, loading } = useQuery(ROOM_QUERY, {
        variables: {
            id: route?.params?.id,
        },
    });
    useEffect(() => {
        register("message", {
            required: true,
        });
    }, [register]);

    useEffect(() => {
        navigation.setOptions({
            title: route?.params?.talkingTo.userName,
        });
    }, []);

    const renderItem = ({ item: message }) => (
        <MessageContainer
            outGoing={
                message.user.userName !== route?.params?.talkingTo?.userName
            }
        >
            <Author>
                {message.user.avatar ? (
                    <Avatar source={{ uri: message.user.avatar }} />
                ) : (
                    <DefaultAvatar />
                )}

                {/* <Username>{message.user.userName}</Username> */}
            </Author>
            <Message>{message.payload}</Message>
        </MessageContainer>
    );

    const onValid = ({ message }) => {
        if (!sendingMessage) {
            sendMessageMutation({
                variables: {
                    payload: message,
                    roomId: route?.params?.id,
                },
            });
        }
    };

    const messages = [...(data?.seeRoom?.messages ?? [])];
    messages.reverse();

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "black" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80}
        >
            <ScreenLayout loading={loading}>
                <FlatList
                    inverted
                    style={{ width: "100%" }}
                    data={messages}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(message) => "" + message.id}
                    renderItem={renderItem}
                />
                <InputContainer>
                    <TextInput
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        placeholder="Write a message..."
                        returnKeyLabel="Send Message"
                        returnKeyType="send"
                        onChangeText={(text) => setValue("message", text)}
                        onSubmitEditing={handleSubmit(onValid)}
                        value={watch("message")}
                    />
                    <SendButton
                        onPress={handleSubmit(onValid)}
                        disabled={!Boolean(watch("message"))}
                    >
                        <Ionicons
                            name="send"
                            color={
                                !Boolean(watch("message"))
                                    ? "rgba(255, 255, 255, 0.5)"
                                    : "white"
                            }
                            size={22}
                        />
                    </SendButton>
                </InputContainer>
            </ScreenLayout>
        </KeyboardAvoidingView>
    );
}

//TODOS: read message 등 구현
