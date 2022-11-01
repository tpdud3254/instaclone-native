import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { logUserOut } from "../apollo";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { nav } from "../constant";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragment";

const FEED_QUERY = gql`
    query seeFeed($offset: Int!) {
        seeFeed(offset: $offset) {
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

export default function Feed() {
    const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
        variables: {
            offset: 0,
        },
    });
    const [refreshing, setRefreshing] = useState(false);

    const renderPhoto = ({ item: photo }) => {
        return <Photo {...photo} />;
    };
    const refresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    return (
        <ScreenLayout loading={loading}>
            <FlatList
                onEndReachedThreshold={0.5} //endreached값 설정
                onEndReached={() =>
                    fetchMore({
                        variables: {
                            offset: data?.seeFeed?.length,
                            // lastId: data?.seeFeed[data.seeFeed.length - 1].id,
                        },
                    })
                }
                refreshing={refreshing}
                onRefresh={refresh}
                style={{ width: "100%" }}
                showsVerticalScrollIndicator={false}
                data={data?.seeFeed}
                keyExtractor={(photo) => photo.id + ""}
                renderItem={renderPhoto}
            />
        </ScreenLayout>
    );
}
