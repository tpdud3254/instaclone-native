import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { UserLogOut } from "../apollo";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { nav } from "../constant";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragment";

const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            ...PhotoFragment
            user {
                userName
                avatar
            }
            caption
            comments {
                ...CommentFragment
            }
            createdAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`;

export default function Feed({ navigation }) {
    const { data, loading } = useQuery(FEED_QUERY);
    const renderPhoto = ({ item: photo }) => {
        return <Photo {...photo} />;
    };

    return (
        <ScreenLayout loading={loading}>
            <FlatList
                style={{ width: "100%" }}
                showsVerticalScrollIndicator={false}
                data={data?.seeFeed}
                keyExtractor={(photo) => photo.id + ""}
                renderItem={renderPhoto}
            />
        </ScreenLayout>
    );
}
