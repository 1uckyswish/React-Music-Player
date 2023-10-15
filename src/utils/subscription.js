import { gql } from "@apollo/client";

export const GET_SONGS = gql`
subscription MySubscription {
    Music(order_by: {CreatedAt: desc}) {
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