import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_FORUM_POSTS, SEARCH_POSTS } from '../../../utils/queries';
import { Link } from 'react-router-dom';
import PostDelete from '../PostDelete';
import Auth from '../../../utils/auth';
import PostUpdate from '../PostUpdate';

function PostList({ searchTerm }) {
  const { forumId } = useParams();
  const [posts, setPosts] = useState([]);
  const { loading, error, data, refetch } = useQuery(GET_FORUM_POSTS, {
    variables: { forumId },
  });

  useEffect(() => {
    console.log('Current searchTerm:', searchTerm); // Debugging
    
    if (searchTerm) {
      refetch({ forumId, searchTerm }).then(({ data }) => {
        console.log('Refetch data:', data); // Debugging
        if (data && data.searchPosts) {
          console.log('Setting posts with searched data'); // Debugging
          setPosts(data.searchPosts);
        }
      });
    } else if (data && data.getPostsByForum) {
      console.log('Setting posts with default data'); // Debugging
      setPosts(data.getPostsByForum[0].posts);
    }
  }, [searchTerm, data, refetch, forumId]);

  if (loading) {
    console.log('Loading...'); // Debugging
    return <p>Loading...</p>;
  }
  if (error) {
    console.log('Error:', error); // Debugging
    return <p>Error: {error.message}</p>;
  }

  const getMediaType = (url) => {
    if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png')) {
      return 'image';
    }
    if (url.endsWith('.mp4')) {
      return 'video';
    }
    return 'unknown';
  };

  console.log('Rendering posts:', posts); // Debugging


  return (
    <>
      <div>
        {posts.length === 0 ? (
          <h3>No posts yet :/</h3>
        ) : (
          posts.map(post => (
            <div key={post._id}>
              <Link to={`/forum/${forumId}/post/${post._id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.description}</p>
              <p>By: {post.createdBy.username}</p>
              <p>Likes: {post.likes}</p>
              <p>Posted on: {post.createdAt}</p>
              {
                post.image && getMediaType(post.image) === 'image' && (
                  <img src={`${post.image}?format=auto`} alt={post.title} width="300"/>
                )
              }
              {
                post.image && getMediaType(post.image) === 'video' && (
                  <video width="300" controls>
                    <source src={post.image} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )
              }
              {/* Conditionally render the delete button */}
              { Auth.loggedIn() && Auth.getUserID() === post.createdBy._id && (
                  <>
                    <PostDelete postId={post._id} /> 
                    <PostUpdate postId={post._id} />
                  </>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default PostList;
