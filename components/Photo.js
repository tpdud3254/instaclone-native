import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import {
    Image,
    Text,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { nav } from "../constant";
import { Ionicons } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!) {
        toggleLike(id: $id) {
            ok
            error
        }
    }
`;

const Container = styled.View``;
const Header = styled.TouchableOpacity`
    padding: 10px;
    flex-direction: row;
    align-items: center;
`;
const UserAvatar = styled.Image`
    margin-right: 10px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
`;
const UserName = styled.Text`
    color: white;
    font-weight: 600;
`;
//Image 컴포넌트는 width와 height를 설정해주지 않으면 이미지가 뜨지 않음
const File = styled.Image`
    width: ${(props) => props.width + "px"};
    height: ${(props) => props.height + "px"};
`;
const BottomContainer = styled.View`
    padding: 10px;
`;
const Actions = styled.View`
    flex-direction: row;
    align-items: center;
`;
const Action = styled.TouchableOpacity`
    margin-right: 10px;
`;
const Caption = styled.View`
    flex-direction: row;
`;
const CaptionText = styled.Text`
    color: white;
    margin-left: 5px;
`;
const Likes = styled.Text`
    color: white;
    margin: 7px 0px;
    font-weight: 600;
`;

function Photo({ id, user, caption, file, isLiked, likes }) {
    const navigation = useNavigation();
    const { width: Swidth, height: Sheight } = useWindowDimensions(); //화면 사이즈
    const [imageHeight, setImageHieght] = useState(Sheight - 45);
    useEffect(() => {
        //파일의 실제 사이즈
        Image.getSize(file, (width, height) => {
            setImageHieght((height * Swidth) / width);
        });
    }, [file]);

    const goToProfile = () => {
        navigation.navigate(nav.Profile);
    };

    const goToComments = () => {
        navigation.navigate(nav.Comments);
    };

    const goToLikes = () => {
        navigation.navigate(nav.Likes);
    };

    const updateToggleLike = (cache, result) => {
        const {
            data: {
                toggleLike: { ok },
            },
        } = result;
        if (ok) {
            const photoId = `Photo:${id}`;
            cache.modify({
                id: photoId,
                fields: {
                    isLiked(prev) {
                        return !prev;
                    },
                    likes(prev) {
                        if (isLiked) {
                            return prev - 1;
                        }
                        return prev + 1;
                    },
                },
            });
        }
    };

    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            id,
        },
        update: updateToggleLike,
    });
    return (
        <Container>
            <Header onPress={goToProfile}>
                <UserAvatar source={{ uri: user.avatar }} />
                <UserName>{user.userName}</UserName>
            </Header>
            <File width={Swidth} height={imageHeight} source={{ uri: file }} />
            <BottomContainer>
                <Actions>
                    <Action onPress={toggleLikeMutation}>
                        <Ionicons
                            name={isLiked ? "heart" : "heart-outline"}
                            color={isLiked ? "tomato" : "white"}
                            size={22}
                        />
                    </Action>
                    <Action onPress={goToComments}>
                        <Ionicons
                            name="chatbubble-outline"
                            color="white"
                            size={22}
                        />
                    </Action>
                </Actions>
                <TouchableOpacity onPress={goToLikes}>
                    <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
                </TouchableOpacity>
                <Caption>
                    <TouchableOpacity onPress={goToProfile}>
                        <UserName>{user.userName}</UserName>
                    </TouchableOpacity>
                    <CaptionText>{caption}</CaptionText>
                </Caption>
            </BottomContainer>
        </Container>
    );
}

Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        userName: PropTypes.string.isRequired,
    }),
    caption: PropTypes.string,
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
};
export default Photo;
