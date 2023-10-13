import { gql } from "@apollo/client";

export const GET_ALL_SONGS = gql`
  query getAllSongs {
    Music(order_by: { CreatedAt: desc }) {
      Artist
      CreatedAt
      Duration
      ID
      Thumbnail
      Title
      URL
    }
  }
`;

export const GET_QUEUED_SONGS = gql`
  query getAllSongs {
    queue @client {
      Artist
      CreatedAt
      Duration
      ID
      Thumbnail
      Title
      URL
    }
  }
`;


