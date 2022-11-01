import React, { useEffect } from "react";
import { Text, View } from "react-native";
import useMe from "../hooks/useMe";

export default function Me({ navigation }) {
    const { data } = useMe();
    useEffect(() => {
        navigation.setOptions({
            title: data?.me?.userName,
            headerShown: true,
            headerTintColor: "white",
            headerStyle: {
                borderBottomColor: "rgba(255, 255, 255, 0.3)",
                shadowColor: "rgba(255, 255, 255, 0.3)",
                backgroundColor: "black",
            },
        });
    }, []);
    // TODOS: 얘만 타이틀 안보임 ㅡㅡ
    return (
        <View
            style={{
                backgroundColor: "black",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ color: "white" }}>Me</Text>
        </View>
    );
}
