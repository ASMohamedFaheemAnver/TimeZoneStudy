import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
  mutation createPost($date: DateTime!) {
    createPost(date: $date) {
      date
    }
  }
`;