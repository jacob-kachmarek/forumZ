import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_FORUM_POSTS } from '../../../utils/queries';
import { Link } from 'react-router-dom';

function PostList() {
  const { forumId } = useParams();

  const { loading, error, data } = useQuery(GET_FORUM_POSTS, {
      variables: { forumId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Function to determine the media type
  const getMediaType = (url) => {
    if(url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png')) {
      return 'image';
    }
    if(url.endsWith('.mp4')) {
      return 'video';
    }
    return 'unknown';
  }

  return (
    <>
      <div>
        <h1>Posts in this Forum</h1>
        {data && data.getPostsByForum && data.getPostsByForum[0].posts.length === 0 ? (
          <h2>This forum does not contain any posts yet...</h2>
        ) : (
          data.getPostsByForum[0].posts.map(post => (
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
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default PostList;
