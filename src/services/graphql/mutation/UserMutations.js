import {gql} from '@apollo/client';

export const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserAvatar($avatarUrl: String!, $id: uuid!) {
    updateUser(pk_columns: {id: $id}, _set: {avatarUrl: $avatarUrl}) {
      avatarUrl
      id
    }
  }
`;
