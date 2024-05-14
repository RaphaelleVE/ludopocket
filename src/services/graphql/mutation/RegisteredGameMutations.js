import {gql} from '@apollo/client';

export const INSERT_REGISTERED_GAMES = gql`
  mutation insertRegisteredGame(
    $boardGameID: String!
    $isOwned: Boolean = false
    $isPlayed: Boolean = false
    $isWished: Boolean = false
    $userID: uuid!
    $dateLastPlayed: date
    $numberOfTimePlayed: Int
  ) {
    insert_REGISTERED_GAME_one(
      object: {
        boardGameID: $boardGameID
        isOwned: $isOwned
        isPlayed: $isPlayed
        isWished: $isWished
        userID: $userID
        dateLastPlayed: $dateLastPlayed
        numberOfTimePlayed: $numberOfTimePlayed
      }
    ) {
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
      datePossessedSince
      dateLastPlayed
      numberOfTimePlayed
    }
  }
`;

export const UPDATE_REGISTERED_GAMES = gql`
  mutation UpdateRegisteredGame(
    $registeredGameID: uuid!
    $isPlayed: Boolean!
    $isOwned: Boolean!
    $isWished: Boolean!
  ) {
    update_REGISTERED_GAME_by_pk(
      pk_columns: {registeredGameID: $registeredGameID}
      _set: {isPlayed: $isPlayed, isOwned: $isOwned, isWished: $isWished}
    ) {
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
      datePossessedSince
      dateLastPlayed
      numberOfTimePlayed
    }
  }
`;

export const UPDATE_PLAYED_DATA_REGISTERED_GAMES = gql`
  mutation UpdatePlayedDataRegisteredGame(
    $registeredGameID: uuid!
    $dateLastPlayed: date!
    $numberOfTimePlayed: Int!
  ) {
    update_REGISTERED_GAME_by_pk(
      pk_columns: {registeredGameID: $registeredGameID}
      _set: {
        dateLastPlayed: $dateLastPlayed
        numberOfTimePlayed: $numberOfTimePlayed
      }
    ) {
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
      datePossessedSince
      dateLastPlayed
      numberOfTimePlayed
    }
  }
`;

export const DELETE_ONE_REGISTERED_GAMES = gql`
  mutation delete_REGISTERED_GAME_by_pk($registeredGameID: uuid = "") {
    delete_REGISTERED_GAME_by_pk(registeredGameID: $registeredGameID) {
      registeredGameID
    }
  }
`;
