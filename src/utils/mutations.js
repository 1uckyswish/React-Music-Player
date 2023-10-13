import { gql } from "@apollo/client";

export const ADD_SONG = gql`
  mutation addSong(
    $Artist: String!
    $Duration: Float!
    $Title: String!
    $Thumbnail: String!
    $URL: String!
    ) {
        insert_Music(
        objects: {
        Artist: $Artist
        Duration: $Duration
        Title: $Title
        Thumbnail: $Thumbnail
        URL: $URL
        }
    ) {
    returning {
      Artist
      CreatedAt
      Duration
      ID
      Thumbnail
      Title
      URL
    }
  }
}
`;

export const ADD_OR_REMOVE_FROM_QUEUE = gql`
  mutation addOrRemoveFromQueue($input: SongInput!) {
    addOrRemoveFromQueue(input: $input) @client
  }
`;