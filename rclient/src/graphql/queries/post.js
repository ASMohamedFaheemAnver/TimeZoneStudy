import { gql } from "@apollo/client";

export const GET_POSTS_QUERY = gql`
  query {
    getPosts {
      date
    }
  }
`;
