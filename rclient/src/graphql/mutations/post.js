import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
  mutation createPost($date: DateTime!, $tz: String!) {
    createPost(date: $date, tz: $tz) {
      date
    }
  }
`;

// export const CREATE_POST_MUTATION = gql`
//   mutation createPost($date: Date!, $tz: String!) {
//     createPost(date: $date, tz: $tz) {
//       date
//     }
//   }
// `;
