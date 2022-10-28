import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://busy-parrots-join-211-59-182-118.loca.lt/graphql",
    cache: new InMemoryCache(),
});

export default client;
