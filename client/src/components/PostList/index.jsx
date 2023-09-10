import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_FORUM_POSTS } from '../../utils/queries';

function PostList() {
    const { forumId } = useParams();
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

    return (
        <div>
            <h1>Posts in this Forum</h1>
            {data && data.getForumById && data.getForumById.posts.map(post => ( // Safely access the posts
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p>By: {post.createdBy.username}</p>
                    <p>Posted on: {formatCreatedAt(post.createdAt)}</p>
                </div>
            ))}
        </div>
    );
}

export default PostList;
