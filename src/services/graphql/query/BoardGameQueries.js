import {gql} from '@apollo/client';

export const GET_ALL_BOARD_GAMES = gql`
  query MyQuery {
    BOARD_GAME {
      barcodeID
      description
      image
      name
    }
  }
`;

export const GET_BOARD_GAME_BY_BARCODE = gql`
  query MyQuery($barcodeID: String!) {
    BOARD_GAME_by_pk(barcodeID: $barcodeID) {
      barcodeID
      description
      image
      name
    }
  }
`;
