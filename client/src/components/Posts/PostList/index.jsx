import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_FORUM_POSTS, SEARCH_POSTS } from '../../../utils/queries';
import { LIKE_POST } from '../../../utils/mutations';
import { Link } from 'react-router-dom';
import PostDelete from '../PostDelete';
import Auth from '../../../utils/auth';
import PostUpdate from '../PostUpdate';

const cardStyle = {
  border: '4px solid #000000',
  boxShadow: '10px 10px 10px black',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '14px',
  borderRadius: '5px',
  backgroundColor: '#f0f0f0',
};

const titleStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '5px',
};
const descriptionStyle = {
  fontSize: '18px',
  color: '#333333',
  marginTop: '8px',
  fontWeight: '200'
};
const buttonDiv = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
};

const MAX_DESCRIPTION_LENGTH = 270;

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

function PostList({ searchTerm }) {
  const { forumId } = useParams();
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]); // Added state for liked posts
  const { loading, error, data, refetch } = useQuery(GET_FORUM_POSTS, {
    variables: { forumId },
  });

  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: [{ query: GET_FORUM_POSTS, variables: { forumId } }],
  });

  const handleLikePost = async (postId) => {
    if (Auth.loggedIn() && !likedPosts.includes(postId)) {
      try {
        await likePost({ variables: { postId } });
        const updatedLikedPosts = [...likedPosts, postId];
        setLikedPosts(updatedLikedPosts);
      } catch (error) {
        console.error('Error liking post:', error);
      }
    }
  };

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
    if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif') || url.endsWith('.webp')) {
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
              <div style={cardStyle}>
                <div>
                  <div style={{ display: 'flex', }}>

                    {post.image && getMediaType(post.image) === 'image' && (
                      <img style={{ width: '100px', height: '100px', marginRight: '20px' }} src={`${post.image}?format=auto`} alt={post.title} width="300" />
                    )}
                    {post.image && getMediaType(post.image) === 'video' && (
                      <video style={{ width: '100px', height: '100px', marginRight: '20px' }} width="300" controls>
                        <source src={post.image} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>)}

                    <div style={titleStyle}>
                      <Link style={{ textDecoration: 'none', color: '#852cde' }} to={`/forum/${forumId}/post/${post._id}`}>
                        <h2>{post.title}</h2>
                      </Link>
                      <p
                        style={descriptionStyle}
                        dangerouslySetInnerHTML={{ __html: truncateText(post.description, MAX_DESCRIPTION_LENGTH) }}
                      ></p>
                    </div>
                  </div>
                </div>

                <div style={buttonDiv}>
                  {Auth.loggedIn() && Auth.getUserID() === post.createdBy._id && (
                    <>
                      <PostDelete postId={post._id} />
                      <PostUpdate postId={post._id} />
                    </>
                  )}
                  {/* New like button */}
                  {Auth.loggedIn() && (
                    <button
                      onClick={() => handleLikePost(post._id)}
                      disabled={likedPosts.includes(post._id)}
                    >
                      ❤️
                    </button>
                  )}


                  <div style={buttonDiv}>
                    <div style={{ color: 'grey', fontSize: '16px', }}>Made by: {post.createdBy.username}</div>
                    <div style={{ color: 'grey', fontSize: '16px', }}>{post.createdAt}</div>
                    <div style={{ color: 'grey', fontSize: '16px', }}>{post.likes} likes</div>

                  </div>


                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default PostList;