import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { nav } from "../constant";

export default function Search({ navigation }) {
    return (
        <View
            style={{
                backgroundColor: "black",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <TouchableOpacity onPress={() => navigation.navigate(nav.Photo)}>
                <Text style={{ color: "white" }}>Go to Photo</Text>
            </TouchableOpacity>
        </View>
    );
}
