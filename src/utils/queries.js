import {gql} from "@apollo/client";

export const GET_ALL_SONGS = gql`
query getAllSongs {
  Music(order_by: {CreatedAt: desc}) {
    Artist
    Duration
    Thumbnail
    Title
    URL
    ID
  }
}
`;

export const ADD_SONG = gql`
mutation addSong($Artist: String!, $Duration: Float!, $Title: String!, $Thumbnail: String!, $URL: String!) {
  insert_Music(objects: {Artist: $Artist, Duration: $Duration, Title: $Title, Thumbnail: $Thumbnail, URL: $URL}) {
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