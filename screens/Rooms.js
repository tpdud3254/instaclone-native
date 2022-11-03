import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { ROOM_FRAGMENT } from "../fragment";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";
import useMe from "../hooks/useMe";
import { colors } from "../styles";

const SEE_ROOMS_QUERY = gql`
    query seeRooms {
        seeRooms {
            ...RoomParts
        }
    }
    ${ROOM_FRAGMENT}
`;

const RoomContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px;
`;
const Column = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
const Avatar = styled.Image`
    width: 50px;
    height: 50px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    margin-right: 20px;
`;
const DefaultAvatar = styled.View`
    width: 50px;
    height: 50px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    margin-right: 20px;
    background-color: gray;
`;
const Data = styled.View``;
const UnreadDot = styled.View`
    width: 10px;
    height: 10px;
    background-color: ${colors.blue};
    border-radius: 50%;
`;
const Username = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 16px;
`;
const UnreadText = styled.Text`
    color: white;
    margin-top: 2px;
    font-weight: 500;
`;
export default function Rooms() {
    const { data, loading } = useQuery(SEE_ROOMS_QUERY);
    const { data: meData } = useMe();

    const renderItem = ({ item: room }) => {
        const notMe = room.users.find(
            (user) => user.userName !== meData?.me?.userName
        );

        return (
            <RoomContainer>
                <Column>
                    {notMe.avatar ? (
                        <Avatar source={{ uri: notMe.avatar }} />
                    ) : (
                        <DefaultAvatar />
                    )}

                    <Data>
                        <Username>{notMe.userName}</Username>
                        <UnreadText>
                            {room.unreadTotal} unread{" "}
                            {room.unreadTotal === 1 ? "message" : "messages"}
                        </UnreadText>
                    </Data>
                </Column>
                <Column>{room.unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
            </RoomContainer>
        );
    };

    return (
        <ScreenLayout loading={loading}>
            <FlatList
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            width: "100%",
                            height: 1,
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                        }}
                    ></View>
                )}
                style={{ width: "100%" }}
                data={data?.seeRooms}
                keyExtractor={(room) => room.id + ""}
                renderItem={renderItem}
            />
        </ScreenLayout>
    );
}
