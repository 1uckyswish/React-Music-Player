import {gql} from "@apollo/client";

export const GET_ALL_SONGS = gql`
query getAllSongs {
  Music(order_by: {CreatedAt: desc}) {
    Artist
    Duration
    Thumbnail
    Title
    URL
  }
}
`;