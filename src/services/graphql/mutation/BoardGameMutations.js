import {gql} from '@apollo/client';

export const INSERT_BOARD_GAME = gql`
  mutation InsertBoardGame(
    $barcodeID: String!
    $description: String!
    $image: String!
    $name: String!
  ) {
    insert_BOARD_GAME_one(
      object: {
        barcodeID: $barcodeID
        description: $description
        image: $image
        name: $name
      }
    ) {
      barcodeID
      description
      image
      name
    }
  }
`;
