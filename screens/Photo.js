import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { nav } from "../constant";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragment";

const SEE_PHOTO = gql`
    query seePhoto($id: Int!) {
        seePhoto(id: $id) {
            ...PhotoFragment
            user {
                id
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

export default function PhotoScreen({ route }) {
    const { data, loading, refetch } = useQuery(SEE_PHOTO, {
        variables: {
            id: route?.params?.photoId,
        },
    });
    const [refreshing, setRefreshing] = useState();

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };
    return (
        <ScreenLayout loading={loading}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                    />
                }
            >
                <Photo {...data?.seePhoto} />
            </ScrollView>
        </ScreenLayout>
    );
}
//TODOS:comment 추가
