import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { nav } from "../constant";

const SEARCH_PHOTOS = gql`
    query searchPhotos($keyword: String!) {
        searchPhotos(keyword: $keyword) {
            id
            file
        }
    }
`;

const MessageContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const MessageText = styled.Text`
    color: white;
    margin-top: 15px;
    font-weight: 600;
`;

const Input = styled.TextInput`
    background-color: white;
    color: black;
    width: ${(props) => props.width / 1.5}px;
    padding: 5px 10px;
    border-radius: 7px;
`;
export default function Search({ navigation }) {
    const numColumns = 4;
    const { width } = useWindowDimensions();
    const { setValue, register, handleSubmit } = useForm();
    const [startQueryFn, { loading, data, called }] =
        useLazyQuery(SEARCH_PHOTOS);

    const onValid = ({ keyword }) => {
        startQueryFn({
            variables: {
                keyword,
            },
        });
    };

    const SearchBox = () => {
        return (
            <Input
                width={width}
                placeholder="Search photos"
                placeholderTextColor="rgba(0,0,0,0.8)"
                autoCapitalize="none"
                returnKeyLabel="Search"
                returnKeyType="search"
                autoCorrect={false}
                onChangeText={(text) => setValue("keyword", text)}
                onSubmitEditing={handleSubmit(onValid)}
            />
        );
    };

    const renderItem = ({ item: photo }) => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate(nav.Photo, {
                    photoId: photo.id,
                })
            }
        >
            <Image
                source={{ uri: photo.file }}
                style={{
                    width: width / numColumns,
                    height: width / numColumns,
                }}
            />
        </TouchableOpacity>
    );
    useEffect(() => {
        navigation.setOptions({
            headerTitle: SearchBox,
        });
        register("keyword", {
            required: true,
            minLength: 3,
        });
    }, []);
    return (
        <DismissKeyboard>
            <View
                style={{
                    backgroundColor: "black",
                    flex: 1,
                }}
            >
                {loading ? (
                    <MessageContainer>
                        <ActivityIndicator size="large" />
                        <MessageText>Searching...</MessageText>
                    </MessageContainer>
                ) : null}
                {!called ? (
                    <MessageContainer>
                        <MessageText>Search by keyword</MessageText>
                    </MessageContainer>
                ) : null}
                {data?.searchPhotos !== undefined ? (
                    data.searchPhotos?.length === 0 ? (
                        <MessageContainer>
                            <MessageText>Could not find anything.</MessageText>
                        </MessageContainer>
                    ) : (
                        <FlatList
                            numColumns={numColumns}
                            data={data?.searchPhotos}
                            keyExtractor={(photo) => photo.id + ""}
                            renderItem={renderItem}
                        />
                    )
                ) : null}
            </View>
        </DismissKeyboard>
    );
}
//TODOS: refresh 만들기
