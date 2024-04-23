import { gql } from '@apollo/client';

export const INSERT_USER_MUTATION = gql`
mutation INSERT_USER($pseudo: String = "", $authUserID: uuid = "") {
    insert_USER_one(object: { authUserID: $authUserID, pseudo: $pseudo}) {
      userID
      pseudo
    }
  }
`;