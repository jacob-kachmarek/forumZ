import {gql} from '@apollo/client';

export const GET_USER_FORUMS = gql`
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

export const GET_ALL = gql`
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




