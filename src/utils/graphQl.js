import { ApolloClient, HttpLink, InMemoryCache, split, gql } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { GET_QUEUED_SONGS } from "./queries";

const httpLink = new HttpLink({
  uri: "https://cool-mouse-48.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": import.meta.env.VITE_DB_KEY,
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://cool-mouse-48.hasura.app/v1/graphql", // Correct WebSocket URL with 'wss' scheme
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": import.meta.env.VITE_DB_KEY,
      },
    },
    options: {
      reconnect: true,
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Rest of your Apollo Client setup

// const cache = new InMemoryCache();

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  typeDefs: gql`
    type Song {
      ID: uuid!
      Title: String!
      Artist: String!
      Duration: Float!
      Thumbnail: String!
      URL: String!
    }

    type Query {
      queue: [Song]!
    }

    input SongInput {
      ID: uuid!
      Title: String!
      Artist: String!
      Duration: Float!
      Thumbnail: String!
      URL: String!
    }

    type Mutation {
      addOrRemoveFromQueue(input: SongInput): [Song]!
    }
  `,
  resolvers: {
    Mutation: {
      addOrRemoveFromQueue: (_, { input }, { cache }) => {
        const queryResult = cache.readQuery({
          query: GET_QUEUED_SONGS,
        });
        if (queryResult) {
          const { queue } = queryResult;
          const isInQueue = queue.some((song) => song.id === input.id);
          const newQueue = isInQueue
            ? queue.filter((song) => song.id !== input.id)
            : [...queue, input];
          cache.writeQuery({
            query: GET_QUEUED_SONGS,
            data: { queue: newQueue },
          });
          return newQueue;
        }
        return [];
      },
    },
  },
});

client.writeQuery({
  query: GET_QUEUED_SONGS,
  data: { queue: JSON.parse(localStorage.getItem("queue")) || [] },
});

export default client;
