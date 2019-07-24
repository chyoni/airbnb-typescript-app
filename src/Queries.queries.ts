import { gql } from "apollo-boost";

export const MY_PROFILE = gql`
  query myProfile {
    myProfile {
      id
      firstName
      lastName
      fullName
      avatar
      username
    }
  }
`;
