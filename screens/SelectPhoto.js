import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import {
    FlatList,
    Image,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles";

const Container = styled.View`
    background-color: black;
    flex: 1;
`;
const Top = styled.View`
    flex: 1;
`;
const Bottom = styled.View`
    flex: 1;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
    position: absolute;
    bottom: 5px;
    right: 5px;
`;

const HeaderRightText = styled.Text`
    color: ${colors.blue};
    font-size: 16px;
    font-weight: 600;
    margin-right: 7px;
`;

export default function SelectPhoto({ navigation }) {
    const numColumns = 4;
    const { width } = useWindowDimensions();
    const [ok, setOk] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [chosenPhoto, setChosenPhoto] = useState("");

    const getPhotos = async () => {
        if (ok) {
            // const albums = await MediaLibrary.getAlbumsAsync(); //미디어 갤러리에서 사용자가 만든 앨범에 대한 정보를 가져옵니다.
            const { assets: photos } = await MediaLibrary.getAssetsAsync(); //제공된 기준과 일치하는 asset 페이지를 가져옵니다. (앨범 내부에 있는 사진을 가져올 때 사용
            setPhotos(photos);
            setChosenPhoto(photos[0]?.uri);
        }
    };

    const getPermissions = async () => {
        const { status, accessPrivileges, canAskAgain } =
            await MediaLibrary.getPermissionsAsync(); //미디어 라이브러리 액세스에 대한 사용자의 권한을 확인합니다.

        if (status !== "granted" && canAskAgain) {
            const { accessPrivileges } =
                await MediaLibrary.requestPermissionsAsync(); //사용자의 미디어 라이브러리에 있는 미디어에 액세스할 수 있는 권한을 부여하도록 사용자에게 요청합니다.

            if (status === "granted") {
                setOk(true);
                getPhotos();
            }
        } else if (status === "granted") {
            setOk(true);
            getPhotos();
        }
    };

    const HeaderRight = () => (
        <TouchableOpacity>
            <HeaderRightText>Next</HeaderRightText>
        </TouchableOpacity>
    );

    useEffect(() => {
        getPermissions();
    }, [ok]);
    useEffect(() => {
        navigation.setOptions({
            headerRight: HeaderRight,
        });
    }, []);
    const choosePhoto = (uri) => {
        setChosenPhoto(uri);
    };
    const renderItem = ({ item: photo }) => (
        <ImageContainer onPress={() => choosePhoto(photo.uri)}>
            <Image
                source={{ uri: photo.uri }}
                style={{
                    width: width / numColumns,
                    height: width / numColumns,
                }}
            />
            <IconContainer>
                <Ionicons
                    name="checkmark-circle"
                    color={photo.uri === chosenPhoto ? colors.blue : "white"}
                    size={18}
                />
            </IconContainer>
        </ImageContainer>
    );
    return (
        <Container>
            <Top>
                {chosenPhoto !== "" ? (
                    <Image
                        source={{ uri: chosenPhoto }}
                        style={{ width, height: "100%" }}
                    />
                ) : null}
            </Top>
            <Bottom>
                <FlatList
                    data={photos}
                    numColumns={numColumns}
                    keyExtractor={(photo) => photo.id}
                    renderItem={renderItem}
                />
            </Bottom>
        </Container>
    );
}
//TODOS: 앨범 선택 가능하게
//TODOS: 앨범 무한 스크롤링
//TODOS: 사진 이상하게 가지고옴

/* 안드로이드의 permission object는 {
    "canAskAgain": true,
    "expires": "never",
    "granted": "false",
    "status": "undetermined",
    }
    로 이루어져 있습니다. iOS와는 달라요.
    안드로이드 유저는 니코강의에서의 accessPrivileges가 없기 때문에
    status === "undetermined" 와 granted를 활용해서 코딩하셔야합니다 */
