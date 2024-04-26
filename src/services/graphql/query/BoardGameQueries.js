import { gql } from '@apollo/client';

export const GET_ALL_BOARD_GAMES = gql`
query MyQuery {
  BOARD_GAME {
    barcodeID
    description
    image
    name
  }
}
`
