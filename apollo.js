import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    makeVar,
    split,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import {
    getMainDefinition,
    offsetLimitPagination,
} from "@apollo/client/utilities";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async (token) => {
    // await AsyncStorage.multiSet([
    //     ["token", token],
    //     ["loggedIn", "yes"],
    // ]); //multiSet 여러 키-값 쌍을 일괄적으로 저장합니다.
    /* Async Storage는 문자열 데이터만 저장할 수 있으므로 객체 데이터를 저장하려면 먼저 직렬화해야 합니다.
    JSON으로 직렬화할 수 있는 데이터의 경우 데이터를 저장할 때 JSON.stringify()를 사용하고 
    데이터를 로드할 때 JSON.parse()를 사용할 수 있습니다. */

    await AsyncStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
    tokenVar(token);
};

export const logUserOut = async () => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar("");
};

// const httpLink = createHttpLink({
//     uri: "https://8b92-211-59-182-118.jp.ngrok.io" + "/graphql",
// });

const uploadHttpLink = createUploadLink({
    uri: "https://8b92-211-59-182-118.jp.ngrok.io" + "/graphql",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            token: tokenVar(),
        },
    };
});

const onErrorLink = onError((graphQLErrors, networkError) => {
    if (graphQLErrors) {
        console.log("graphQL Error", graphQLErrors);
    }
    if (networkError) {
        console.log("network Error", networkError);
    }
});

// const wsLink = new GraphQLWsLink(
//     new SubscriptionClient("ws://8b92-211-59-182-118.jp.ngrok.io/graphql", {
//         connectionParams: { token: tokenVar() },
//     })
// );
const wsLink = new GraphQLWsLink(
    createClient({
        url: "wss://8b92-211-59-182-118.jp.ngrok.io/graphql",
        connectionParams: () => ({
            token: tokenVar(),
        }),
    })
);

//웹소켓링크를 만들때 token값이 비어있기때문에 함수형태로 반환? //TODOS: 먼소린지는 몰겟찌만,,
const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLinks
);

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                seeFeed: offsetLimitPagination(),
            },
        },
        Message: {
            fields: {
                user: {
                    merge: true,
                },
            }, //InMemoryCache 오류 나시는 분들은 InMemoryCache를 수정해주셔야 하는데 해당 오브젝트의 필드를 merge: true만 해주시면 됩니다.
        },
    },
});

// const persistintCache = async () => {
//     await persistCache({
//         cache,
//         storage: new AsyncStorageWrapper(AsyncStorage),
//     }); //서버가 다운되어있어도 캐시에 있는 데이터들은 보여줌
// };

// persistintCache(); //TODOS:문제있음,,

const client = new ApolloClient({
    link: splitLink,
    cache,
});

export default client;
