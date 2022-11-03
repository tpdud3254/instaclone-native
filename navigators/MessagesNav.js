import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Room from "../screens/Room";
import Rooms from "../screens/Rooms";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function MessageNav() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: "white",
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: "black",
                },
            }}
        >
            <Stack.Screen
                name="Rooms"
                options={{
                    headerBackImage: ({ tintColor }) => (
                        <Ionicons
                            color={tintColor}
                            name="chevron-down"
                            size={28}
                        />
                    ),
                }}
                component={Rooms}
            />
            <Stack.Screen name="Room" component={Room} />
        </Stack.Navigator>
    );
}
