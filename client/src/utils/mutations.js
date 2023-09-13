import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation ($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FORUM = gql`
  mutation addForum($title: String!, $description: String!, $userID: ID!) {
    addForum(title: $title, description: $description, userID: $userID) {
      _id
      title
      description
      createdBy {
        _id
      }
      createdAt
    }
  }
`;

export const ADD_POST = gql`
mutation AddPost($title: String!, $description: String!, $image: String, $userID: ID!, $forumId: ID!) {
    addPost(
      title: $title,
      description: $description,
      image: $image,
      userID: $userID,
      forumId: $forumId
    ) {
      _id
      title
      description
      image
      createdBy {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($text: String!, $userID: ID!, $postId: ID!) {
    addComment(text: $text, userID: $userID, postId: $postId) {
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
        }
        createdAt
        likes
      }
      createdAt
      likes
    }
  }
`;

export const ADD_REPLY = gql`
  mutation addReply($text: String!, $commentId: ID!, $userID: ID!) {
    addReply(text: $text, commentId: $commentId, userID: $userID) {
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
`;

export const UPDATE_FORUM = gql`
  mutation updateForum($title: String, $description: String, $forumId: ID!) {
    updateForum(title: $title, description: $description, forumId: $forumId) {
      _id
      title
      description
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($title: String, $description: String, $postId: ID!) {
    updatePost(title: $title, description: $description, postId: $postId) {
      _id
      title
      description
      image
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($text: String, $commentId: ID!) {
    updateComment(text: $text, commentId: $commentId) {
      _id
      text
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation LikeComment($commentId: ID!) {
    likeComment(commentId: $commentId) {
      _id
      likes
      # Include any other comment fields you need
    }
  }
`;

export const UPDATE_REPLY = gql`
  mutation updateReply($text: String, $replyID: ID!, $commentId: ID!) {
    updateReply(text: $text, replyID: $replyID, commentId: $commentId) {
      _id
      text
    }
  }
`;

export const DELETE_FORUM = gql`
  mutation deleteForum($forumId: ID!) {
    deleteForum(forumId: $forumId) {
      _id
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      _id
    }
  }
`;



export const DELETE_REPLY = gql`
mutation deleteReply($replyId: ID!, $commentId: ID!) {
  deleteReply(replyId: $replyId, commentId: $commentId) {
    _id
  }
}
`;
