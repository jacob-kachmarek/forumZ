import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_COMMENTS } from '../../utils/queries';

function CommentList() {
    const { postId, forumId } = useParams();
    console.log("postId:", postId, "forumID:", forumId);
    
    const { loading, error, data } = useQuery(GET_COMMENTS, {
        variables: { postId: postId }, 
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


        // Helper function to format date
        // function formatCreatedAt(unixTimestamp) {
        //     const date = new Date(unixTimestamp * 1000);
        //     if (!isNaN(date.getTime())) {
        //         return date.toLocaleString();
        //     }
        //     return "Invalid Date";
        // }

    console.log("data:", data);

    return (
        <div>
            <h2>Comments</h2>
            {console.log(data.getCommentsByPost[0].comments)}
            {data.getCommentsByPost[0].comments.map(comment => (
                <div key={comment._id}>
                    <h3>{comment.text}</h3>
                    <p>Posted By: {comment.createdBy.username}</p>
                    <p>Likes: {comment.likes}</p>
                </div>
            ))}
        </div>
    );
}

export default CommentList;