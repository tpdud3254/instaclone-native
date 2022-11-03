import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";

const Stack = createStackNavigator();

export default function LoggedInNav() {
    return (
        <Stack.Navigator
            screenOptions={{ presentation: "modal", headerShown: false }}
        >
            <Stack.Screen name="Tabs" component={TabsNav} />
            <Stack.Screen name="Upload" component={UploadNav} />
        </Stack.Navigator>
    );
}
