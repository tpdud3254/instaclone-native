import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [loading, setLoading] = useState(true);
    /*
  2022-08 기준 expo-app-loading 은 더 이상 지원되지 않고 사라질 예정이라 합니다. 그래서 대체용으로 SplashScreen이란 로딩 모듈을 사용해야 합니다. 공식 문서 Usage 예시 코드를 보고 참고해주시기 바랍니다.
  https://docs.expo.dev/versions/latest/sdk/splash-screen
   const onFinish = () => setLoading(false);
    const preload = () => {
        const fontsToLoad = [Ionicons.font];
        const fontPromiss = fontsToLoad.map((font) => Font.loadAsync(font));
        return Promise.all(fontPromiss);
    };
    if (loading) {
        return (
            <AppLoading
                startAsync={preload}
                onError={console.warn}
                onFinish={onFinish}
            />
        );
    }
    */

    useEffect(() => {
        async function prepare() {
            try {
                //font preload
                const fontsToLoad = [Ionicons.font];
                const fontPromises = fontsToLoad.map((font) =>
                    Font.loadAsync(font)
                );

                //image preload
                const imagesToload = [
                    require("./assets/logo.png"),
                    "https://raw.githubusercontent.com/nomadcoders/instaclone-native/93a5b77e98eefdf5084bfae44653ba67e4ca312c/assets/logo.png",
                ]; //로컬, 서버
                const imagePromises = imagesToload.map((image) =>
                    Asset.loadAsync(image)
                );

                await Promise.all([, , , fontPromises, , , , imagePromises]);
            } catch (error) {
                console.warn(error);
            } finally {
                setLoading(false);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (!loading) {
            await SplashScreen.hideAsync();
        }
    }, [loading]);

    if (loading) {
        return null;
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Text>Helloooooo</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
