import React, { useEffect, useRef, useState } from "react";
import {
    StatusBar,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import styled from "styled-components/native";
import { Camera } from "expo-camera";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";

const Container = styled.View`
    flex: 1;
    background-color: black;
`;

const Actions = styled.View`
    flex: 0.35;
    padding: 0px 50px;
    align-items: center;
    justify-content: space-around;
`;

const ButtonsContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const SliderContainer = styled.View``;

const TakePhotoBtn = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.8);
`;

const CloseBtn = styled.TouchableOpacity`
    top: 10px;
    left: 10px;
`;

const PhotoActions = styled(Actions)`
    flex-direction: row;
`;
const PhotoAction = styled.TouchableOpacity`
    background-color: white;
    padding: 10px 25px;
    border-radius: 4px;
`;
const PhotoActionText = styled.Text`
    font-weight: 600;
`;

export default function TakePhoto({ navigation }) {
    const camera = useRef();
    const [takenPhoto, setTakenPhoto] = useState("");
    const [cameraReady, setCameraReady] = useState(false);
    const [ok, setOk] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [zoom, setZoom] = useState(0);

    const getPermissions = async () => {
        const { granted } = await Camera.requestCameraPermissionsAsync(
            setOk(granted)
        );
    };

    useEffect(() => {
        getPermissions();
    }, []);

    const onCameraModeChange = () => {
        if (cameraType === Camera.Constants.Type.front) {
            setCameraType(Camera.Constants.Type.back);
        } else {
            setCameraType(Camera.Constants.Type.front);
        }
    };

    const onZoomValueChange = (e) => {
        setZoom(e);
    };

    const onFlashChange = () => {
        if (flashMode === Camera.Constants.FlashMode.off) {
            setFlashMode(Camera.Constants.FlashMode.on);
        } else if (flashMode === Camera.Constants.FlashMode.on) {
            setFlashMode(Camera.Constants.FlashMode.auto);
        } else if (flashMode === Camera.Constants.FlashMode.auto) {
            setFlashMode(Camera.Constants.FlashMode.off);
        }
    };

    const onCameraReady = () => setCameraReady(true);

    const takePhoto = async () => {
        if (camera.current && cameraReady) {
            const { uri } = await camera.current.takePictureAsync({
                quality: 1,
                exif: true,
            });

            setTakenPhoto(uri);
            // const asset = await MediaLibrary.createAssetAsync(uri)
            // await MediaLibrary.saveToLibraryAsync(uri)
        }
    };

    const onDismiss = () => setTakenPhoto("");

    const onUpload = () => {
        Alert.alert("Save photo?", "Sava photo & upload or just upload", [
            {
                text: "Save & Upload",
                onPress: () => goToUpload(true),
            },
            {
                text: "Just Upload",
                onPress: () => goToUpload(false),
            },
        ]);
    };

    const goToUpload = async (save) => {
        if (save) {
            await MediaLibrary.saveToLibraryAsync(takenPhoto);
        }

        console.log("Weill upload", takenPhoto);
    };

    return (
        <Container>
            <StatusBar hidden={true} />
            {takenPhoto === "" ? (
                <Camera
                    style={{ flex: 1 }}
                    type={cameraType}
                    zoom={zoom}
                    flashMode={flashMode}
                    ref={camera}
                    onCameraReady={onCameraReady}
                >
                    <CloseBtn onPress={() => navigation.navigate("Tabs")}>
                        <Ionicons name="close" color="white" size={30} />
                    </CloseBtn>
                </Camera>
            ) : (
                <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
            )}
            {takenPhoto === "" ? (
                <Actions>
                    <SliderContainer>
                        <Slider
                            style={{ width: 200, height: 20 }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
                            onValueChange={onZoomValueChange}
                        />
                    </SliderContainer>
                    <ButtonsContainer>
                        <TouchableOpacity onPress={onFlashChange}>
                            <Ionicons
                                size={30}
                                color="white"
                                name={
                                    flashMode === Camera.Constants.FlashMode.off
                                        ? "flash-off"
                                        : flashMode ===
                                          Camera.Constants.FlashMode.on
                                        ? "flash"
                                        : flashMode ===
                                          Camera.Constants.FlashMode.auto
                                        ? "eye"
                                        : ""
                                }
                            />
                        </TouchableOpacity>
                        <TakePhotoBtn onPress={takePhoto} />
                        <TouchableOpacity onPress={onCameraModeChange}>
                            <Ionicons
                                size={30}
                                color="white"
                                name="camera-reverse"
                            />
                        </TouchableOpacity>
                    </ButtonsContainer>
                </Actions>
            ) : (
                <PhotoActions>
                    <PhotoAction onPress={onDismiss}>
                        <PhotoActionText>Dismiss</PhotoActionText>
                    </PhotoAction>
                    <PhotoAction onPress={onUpload}>
                        <PhotoActionText>Upload</PhotoActionText>
                    </PhotoAction>
                </PhotoActions>
            )}
        </Container>
    );
}

//TODOS: 권한 거부시 텍스트 라던지 권한 요청 버튼 추가
