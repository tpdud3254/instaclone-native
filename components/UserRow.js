import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { nav } from "../constant";
import PropTypes from "prop-types";

const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
`;
const Column = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;
const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const UndefineAvatar = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: white;
`;
const UserName = styled.Text`
    font-weight: 600;
    color: white;
`;
const FollowBtn = styled.TouchableOpacity`
    background-color: ${(props) => props.theme.accent};
    justify-content: center;
    padding: 5px 10px;
    border-radius: 4px;
`;
const FollowBtnText = styled.Text`
    color: white;
    font-weight: 600;
`;

function UserRow({ avatar, id, userName, isFollowing, isMe }) {
    const navigation = useNavigation();

    const goToProfile = () => {
        navigation.navigate(nav.Profile, {
            userName,
            id,
        });
    };
    return (
        <Wrapper>
            <Column onPress={goToProfile}>
                {avatar ? (
                    <Avatar source={{ uri: avatar }} />
                ) : (
                    <UndefineAvatar />
                )}

                <UserName>{userName}</UserName>
            </Column>
            {!isMe ? (
                <FollowBtn>
                    <FollowBtnText>
                        {isFollowing ? "Unfollow" : "Follow"}
                    </FollowBtnText>
                </FollowBtn>
            ) : null}
        </Wrapper>
    );
}

UserRow.propTypes = {
    avatar: PropTypes.string,
    id: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    isMe: PropTypes.bool.isRequired,
};

export default UserRow;
