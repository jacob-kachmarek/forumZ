import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_FORUM_POSTS } from '../../utils/queries';

function PostList() {
    const { forumID } = useParams();
    console.log("forumId:", forumID);
    
    const { loading, error, data } = useQuery(GET_FORUM_POSTS, {
        variables: { forumId: forumID }, 
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
        <div>
            <h1>Posts in this Forum</h1>
            {console.log('data.getPostsByForum[0].posts[0].createdBy.username:', data.getPostsByForum[0].posts[0].createdBy.username)}
            {console.log('data.getPostsByForum[0].posts[0].createdBy:', data.getPostsByForum[0].posts[0].createdBy)}
            {console.log("data.getPostsByForum[0].posts:", data.getPostsByForum[0].posts)}
            {data.getPostsByForum[0].posts.map(post => (
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    {console.log("post.createdBy.username:", post.createdBy.username)}
                    <p>By: {post.createdBy.username}</p>
                    <p>Posted on: {formatCreatedAt(post.createdAt)}</p>
                    <p>Image: {post.image}</p>
                </div>
            ))}
        </div>
    );
}

export default PostList;
