import React from "react";
import styled from "styled-components/native";
import useMe from "../../hooks/useMe";
import { colors } from "../../styles";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";

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

function RoomItem({ users, unreadTotal, id }) {
    const { data: meData } = useMe();
    const navigation = useNavigation();
    const talkingTo = users.find(
        (user) => user.userName !== meData?.me?.userName
    );

    const goToRoom = () =>
        navigation.navigate("Room", {
            id,
            talkingTo,
        });

    return (
        <RoomContainer onPress={goToRoom}>
            <Column>
                {talkingTo.avatar ? (
                    <Avatar source={{ uri: talkingTo.avatar }} />
                ) : (
                    <DefaultAvatar />
                )}

                <Data>
                    <Username>{talkingTo.userName}</Username>
                    <UnreadText>
                        {unreadTotal} unread{" "}
                        {unreadTotal === 1 ? "message" : "messages"}
                    </UnreadText>
                </Data>
            </Column>
            <Column>{unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
        </RoomContainer>
    );
}

RoomItem.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            avatar: PropTypes.string,
            userName: PropTypes.string.isRequired,
        })
    ),
    unreadTotal: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
};

export default RoomItem;
