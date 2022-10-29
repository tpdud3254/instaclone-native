import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TabIcon({ iconName, focused, size }) {
    return (
        <Ionicons
            name={focused ? iconName : `${iconName}-outline`}
            size={size}
            color={focused ? "white" : "rgba(255,255,255,0.5)"}
        />
    );
}
