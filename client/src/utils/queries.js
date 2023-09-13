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
            _id
            username
        }
    }
}
`;

export const GET_SINGLE_FORUM = gql`
query Query($forumId: ID!) {
  getSingleForum(forumId: $forumId) {
    _id
    title
    description
    createdAt
    createdBy {
      username
    }
    posts {
      title
    }
  }
}
`

export const GET_FORUM_POSTS = gql`
    query getForumPosts($forumId: ID!) {
      getPostsByForum(forumId: $forumId) {
        _id
        posts {
          _id
          createdAt
          description
          image
          likes
          title
          createdBy {
            _id
            username
          }
        }
      }
    }
`;

export const GET_COMMENTS = gql`
query GetCommentsByPost($postId: ID!) {
  getCommentsByPost(postId: $postId) {
    _id
    title
    description
    likes
    image
    createdAt
    createdBy {
      _id
      username
    }
    comments {
      _id
      text
      likes
      createdAt
      createdBy {
        _id
        username
      }
      replies {
        _id
        text
        likes
        createdAt
        createdBy {
          _id
          username
        }
      }
    }
  }
}
`;

export const GET_REPLIES = gql`
query GetRepliesByComment($commentId: ID!) {
  getRepliesByComment(commentId: $commentId) {
    _id
    text
    likes
    createdAt
    createdBy {
      _id
      username
    }
    replies {
      text
      _id
      likes
      createdAt
      createdBy {
        _id
        username
        createdAt
      }
    }
  }
}
`;

export const SEARCH_FORUMS = gql`
query searchForums($searchTerm: String!) {
  searchForums(searchTerm: $searchTerm) {
    _id
    title
    description
  }
}
`;

export const SEARCH_POSTS = gql`
query searchPosts($forumId: ID!, $searchTerm: String!) {
  searchPosts(forumId: $forumId, searchTerm: $searchTerm) {
    _id
    createdAt
    createdBy {
      username
    }
    description
    image
    likes
    title
  }
}
`;

export const GET_USER_CONTENT = gql`
query Query($username: String!) {
  getSingleUser(username: $username) {
    _id
    username
    createdAt
    forums {
      _id
      title
      createdAt
      description
      createdBy {
        username
        createdAt
        _id
      }
    }
    posts {
      _id
      createdAt
      description
      image
      likes
      title
      createdBy {
        _id
        createdAt
        username
      }

    }
    comments {
      _id
      createdAt
      likes
      text
      createdBy {
        _id
        username
        createdAt
      }
      replies {
        _id
        createdAt
        likes
        text
        createdBy {
          _id
          username
          createdAt
        }
      }
    }
  }
}
`;