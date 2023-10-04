import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://cool-mouse-48.hasura.app/v1/graphql",
        headers: {
            "x-hasura-admin-secret":
            'import.meta.env.DB_KEY',
        },
    }),
    cache: new InMemoryCache(),
});

export default client;
