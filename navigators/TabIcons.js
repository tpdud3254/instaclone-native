import React from "react";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default function TabIcon({ iconName, focused, size, color }) {
    return (
        <Ionicons
            name={focused ? iconName : `${iconName}-outline`}
            size={size ? size : 10}
            color={color ? color : focused ? "white" : "rgba(255,255,255,0.5)"}
        />
    );
}

TabIcon.propTypes = {
    iconName: PropTypes.string.isRequired,
    focused: PropTypes.bool,
    size: PropTypes.number,
    color: PropTypes.string,
};
