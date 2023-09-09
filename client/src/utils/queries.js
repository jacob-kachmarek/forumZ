import {gql} from '@apollo/client';

export const QUERY_USER = gql`
query getSingleUser($username: String!) {
    getSingleUser(username: $username) {
      username
      forums {
        title
        description
        createdAt
        createdBy {
          username
        }
        posts {
          title
          likes
          image
          description
          createdBy {
            username
          }
          comments {
            text
            likes
            createdAt
            createdBy {
              username
            }
            replies {
              text
              likes
              createdAt
              createdBy {
                username
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_USERS = gql`
query getUsers {
    getUsers {
      username
      forums {
        title
        description
        createdAt
        createdBy {
          username
        }
        posts {
          title
          description
          likes
          image
          createdBy {
            username
          }
          comments {
            text
            likes
            createdAt
            createdBy {
              username
            }
            replies {
              text
              likes
              createdAt
              createdBy {
                username
              }
            }
          }
        }
      }
    }
  }
`


