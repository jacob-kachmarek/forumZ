import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { GET_USER_CONTENT } from '../utils/queries';
import Auth from '../utils/auth';

// Define the getMediaType function
const getMediaType = (url) => {
  if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png')) {
    return 'image';
  }
  if (url.endsWith('.mp4')) {
    return 'video';
  }
  return 'unknown';
};

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
              <p>
                Title: <Link to={`/forum/${post.forumId}/post/${post._id}`}>{post.title}</Link>
              </p>
              <p>Description: {post.description}</p>
              <p>Likes: {post.likes}</p>
              {post.image && (
                <div>
                  {getMediaType(post.image) === 'image' && (
                    <img src={`${post.image}?format=auto`} alt={post.title} width="300" />
                  )}
                  {getMediaType(post.image) === 'video' && (
                    <video width="300" controls>
                      <source src={post.image} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Comments ({user.comments.length}):</h3>
        <ul>
          {user.comments.map((comment) => (
            <li key={comment._id}>
              <p>
                Text: <Link to={`/forum/${comment.forumId}/post/${comment.postId}`}>{comment.text}</Link>
              </p>
              <p>Likes: {comment.likes}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
