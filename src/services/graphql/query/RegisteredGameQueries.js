import {gql} from '@apollo/client';

export const GET_ONE_REGISTERED_GAME = gql`
  query getRegisteredGame($boardGameID: String!, $userId: uuid!) {
    REGISTERED_GAME(
      where: {boardGameID: {_eq: $boardGameID}, userID: {_eq: $userId}}
    ) {
      isWished
      isPlayed
      isOwned
      registeredGameID
    }
  }
`;

export const GET_ALL_REGISTERED_BOARD_GAMES = gql`
  query MyQuery($userID: uuid!) {
    REGISTERED_GAME(where: {userID: {_eq: $userID}}) {
      registeredGameID
      boardGameID
      BOARD_GAME {
        barcodeID
        description
        image
        name
      }
      isOwned
      isPlayed
      isWished
    }
  }
`;
