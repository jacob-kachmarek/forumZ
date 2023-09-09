import { gql } from '@apollo/client';

export const GET_SINGLE_USER = gql`
  query getSingleUser($username: String!) {
    getSingleUser(username: $username) {
      _id
      username
      password
      createdAt
      forums {
        _id
        title
        description
        createdBy {
          _id
          username
        }
        posts {
          _id
          title
          description
          createdBy {
            _id
            username
          }
          likes
          comments {
            _id
            text
            createdBy {
              _id
              username
            }
            createdAt
            likes
          }
        }
        createdAt
      }
      posts {
        _id
        title
        description
        createdBy {
          _id
          username
        }
        likes
        comments {
          _id
          text
          createdBy {
            _id
            username
          }
          createdAt
          likes
        }
      }
      comments {
        _id
        text
        createdBy {
          _id
          username
        }
        replies {
          _id
          text
          createdBy {
            _id
            username
          }
          createdAt
          likes
        }
        createdAt
        likes
      }
      favoriteForums {
        _id
        title
        description
        createdBy {
          _id
          username
        }
        posts {
          _id
          title
          description
          createdBy {
            _id
            username
          }
          likes
          comments {
            _id
            text
            createdBy {
              _id
              username
            }
            createdAt
            likes
          }
        }
        createdAt
      }
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      _id
      username
      password
      createdAt
      forums {
        _id
        title
        description
        createdBy {
          _id
          username
        }
        posts {
          _id
          title
          description
          createdBy {
            _id
            username
          }
          likes
          comments {
            _id
            text
            createdBy {
              _id
              username
            }
            createdAt
            likes
          }
        }
        createdAt
      }
      posts {
        _id
        title
        description
        createdBy {
          _id
          username
        }
        likes
        comments {
          _id
          text
          createdBy {
            _id
            username
          }
          createdAt
          likes
        }
      }
      comments {
        _id
        text
        createdBy {
          _id
          username
        }
        replies {
          _id
          text
          createdBy {
            _id
            username
          }
          createdAt
          likes
        }
        createdAt
        likes
      }
      favoriteForums {
        _id
        title
        description
        createdBy {
          _id
          username
        }
        posts {
          _id
          title
          description
          createdBy {
            _id
            username
          }
          likes
          comments {
            _id
            text
            createdBy {
              _id
              username
            }
            createdAt
            likes
          }
        }
        createdAt
      }
    }
  }
`;
