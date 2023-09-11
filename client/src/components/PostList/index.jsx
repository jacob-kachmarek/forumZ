import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_FORUM_POSTS } from '../../utils/queries';
import { Link } from 'react-router-dom';
import CommentForm from '../CommentForm/index.jsx';

function PostList() {
    const { forumId, postId } = useParams();
    console.log("forumId:", forumId);

    const { loading, error, data } = useQuery(GET_FORUM_POSTS, {
        variables: { forumId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    // Helper function to format date
    function formatCreatedAt(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);
        if (!isNaN(date.getTime())) {
            return date.toLocaleString();
        }
        return "Invalid Date";
    }

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
                            <p>Posted on: {formatCreatedAt(post.createdAt)}</p>
                            <p>Image: {post.image}</p>
                        </div>
                    ))
                )}
            </div>
            <div>
                <CommentForm postId={postId}/>
            </div>
        </>
    );

}

export default PostList;
