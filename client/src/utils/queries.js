import { gql } from '@apollo/client';

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
`;

export const GET_FORUMS = gql`
query GetForums {
    getForums {
        _id
        title
        description
        createdAt
        createdBy {
            username
        }
    }
}
`;

export const GET_FORUM_POSTS = gql`
    query getForumPosts($forumID: ID!) {
        getPostsByForum(forumID: $forumID) {
            _id
            title
            description
            createdBy {
                username
            }
            createdAt
        }
    }
`;
