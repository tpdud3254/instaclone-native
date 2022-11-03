import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { logUserOut } from "../apollo";
import useMe from "../hooks/useMe";

export default function Me({ navigation }) {
    const { data } = useMe();
    console.log(data);
    useEffect(() => {
        navigation.setOptions({
            title: data?.me?.userName,
        });
    }, []);

    return (
        <View
            style={{
                backgroundColor: "black",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <TouchableOpacity onPress={logUserOut}>
                <Text style={{ color: "white" }}>logout</Text>
            </TouchableOpacity>
        </View>
    );
}
