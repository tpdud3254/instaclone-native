import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PropTypes from "prop-types";
import { nav } from "../constant";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";

const Stack = createStackNavigator();

// const screenNamelist = [nav.Feed, nav.Search, nav.Notifications, nav.Me];
// const componentList = [Feed, Search, Notifications, Me];
/* {screenNamelist.map((name, index) =>
                screenName === name ? (
                    <Stack.Screen
                        name={"Tab" + screenName}
                        component={componentList[index]}
                    />
                ) : null
            )} */
export default function StackNavFactory({ screenName }) {
    //4개의 분리된 카드 stack을 각각의 탭에 만드는 작업
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerTintColor: "white",
                headerStyle: {
                    shadowColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor: "black",
                },
            }}
        >
            {screenName === nav.Feed ? (
                <Stack.Screen name={"Tab" + nav.Feed} component={Feed} />
            ) : null}
            {screenName === nav.Search ? (
                <Stack.Screen name={"Tab" + nav.Search} component={Search} />
            ) : null}
            {screenName === nav.Notifications ? (
                <Stack.Screen
                    name={"Tab" + nav.Notifications}
                    component={Notifications}
                />
            ) : null}
            {screenName === nav.Me ? (
                <Stack.Screen name={nav.Me} component={Me} />
            ) : null}
            <Stack.Screen name={nav.Profile} component={Profile} />
            <Stack.Screen name={nav.Photo} component={Photo} />
        </Stack.Navigator>
    );
}

StackNavFactory.propTypes = {
    screenName: PropTypes.string.isRequired,
};
