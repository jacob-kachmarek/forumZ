import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_FORUM_POSTS } from '../../../utils/queries';
import { Link } from 'react-router-dom';

function PostList() {
  const { forumId } = useParams();
  console.log("forumId:", forumId);

  const { loading, error, data } = useQuery(GET_FORUM_POSTS, {
      variables: { forumId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("data:", data);

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
              {/* Check if the image field exists before trying to render it */}
              {post.image && <img src={`${post.image}?format=auto`} alt={post.title} />}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default PostList;
