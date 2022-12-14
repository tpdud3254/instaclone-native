import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import {
    ActivityIndicator,
    Appearance,
    Text,
    useColorScheme,
    View,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styles";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar, cache } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [loading, setLoading] = useState(true);
    const [colorScheme, setColorScheme] = useState("light");
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    // const colorScheme = Appearance.getColorScheme(); //일회성 가져오기
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setColorScheme(colorScheme);
    }); //이부분을 스테이트로 만들어서 web에서 한것처럼 ThemeProvider에 넣어서 다크모드 지원할 수 있음
    //removeChangeListener

    /*
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

    //2022-08 기준 expo-app-loading 은 더 이상 지원되지 않고 사라질 예정이라 합니다. 그래서 대체용으로 SplashScreen이란 로딩 모듈을 사용해야 합니다. 공식 문서 Usage 예시 코드를 보고 참고해주시기 바랍니다.
    //https://docs.expo.dev/versions/latest/sdk/splash-screen

    useEffect(() => {
        async function prepare() {
            //token preload
            const token = await AsyncStorage.getItem("token");
            console.log(token);
            if (token) {
                isLoggedInVar(true);
                tokenVar(token);
            }

            try {
                //font preload
                const fontsToLoad = [Ionicons.font];
                const fontPromises = fontsToLoad.map((font) =>
                    Font.loadAsync(font)
                );

                //image preload
                const imagesToload = [
                    require("./assets/logo.png"),
                    // "https://raw.githubusercontent.com/nomadcoders/instaclone-native/93a5b77e98eefdf5084bfae44653ba67e4ca312c/assets/logo.png",
                ]; //로컬, 서버
                const imagePromises = imagesToload.map((image) =>
                    Asset.loadAsync(image)
                );

                await new Promise.all([...fontPromises, ...imagePromises]);
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

    onLayoutRootView(); //TODOS: 문제있어,,

    return (
        <ApolloProvider client={client}>
            <ThemeProvider
                theme={colorScheme === "light" ? lightTheme : darkTheme}
            >
                <NavigationContainer>
                    {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
                </NavigationContainer>
            </ThemeProvider>
        </ApolloProvider>
    );
}
