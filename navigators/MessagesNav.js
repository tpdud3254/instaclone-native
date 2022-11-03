import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Room from "../screens/Room";
import Rooms from "../screens/Rooms";

const Stack = createStackNavigator();

export default function MessageNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Rooms" component={Rooms} />
            <Stack.Screen name="Room" component={Room} />
        </Stack.Navigator>
    );
}
