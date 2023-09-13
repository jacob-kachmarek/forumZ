import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_CONTENT } from '../utils/queries';
import Auth from '../utils/auth';

function Profile() {
  // Check if the user is logged in
  const isLoggedIn = Auth.loggedIn();

  if (!isLoggedIn) {
    return <p>Please log in to view your profile.</p>;
  }

  // If the user is logged in, fetch the user's data
  const username = Auth.getProfile().data.username;

  const { loading, error, data } = useQuery(GET_USER_CONTENT, {
    variables: { username: username },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.getSingleUser;

  return (
    <div>
      <h2>User Profile: {user.username}</h2>
      <p>Joined at: {user.createdAt}</p>

      <div>
        <h3>Forums ({user.forums.length}):</h3>
        <ul>
          {user.forums.map((forum) => (
            <li key={forum._id}>
              <p>Description: {forum.description}</p>
              <p>Created by: {forum.createdBy.username}</p>
              <p>Created at: {forum.createdAt}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Posts ({user.posts.length}):</h3>
        <ul>
          {user.posts.map((post) => (
            <li key={post._id}>
              <p>Title: {post.title}</p>
              <p>Description: {post.description}</p>
              <p>Likes: {post.likes}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Comments ({user.comments.length}):</h3>
        <ul>
          {user.comments.map((comment) => (
            <li key={comment._id}>
              <p>Text: {comment.text}</p>
              <p>Likes: {comment.likes}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
