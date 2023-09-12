import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_COMMENTS } from '../../../utils/queries';
import Auth from '../../../utils/auth';

function CommentList() {
    const { postId, forumId } = useParams();
    console.log("postId:", postId, "forumID:", forumId);
    
    const { loading, error, data } = useQuery(GET_COMMENTS, {
        variables: { postId: postId }, 
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log("data:", data);

    if (Auth.loggedIn()) {
        return (
            <div>
                <h2>Comments</h2>
                {console.log(data.getCommentsByPost[0].comments)}
                {console.log("data1", data)}
                {data.getCommentsByPost[0].comments.map(comment => (
                    <div key={comment._id}>
                        <h3>{comment.text}</h3>
                        <p>Posted By: {comment.createdBy.username}</p> 
                        <p>Likes: {comment.likes}
                            <button style={{ border: 'none', padding: '0' }}>👍</button>
                        </p>
                    </div>
                ))}
            </div>
        );
    } else return (
        <div>
            <h2>Comments</h2>
            {console.log("data", data)}
            {data.getCommentsByPost[0].comments.map(comment => (
                <div key={comment._id}>
                    <h3>{comment.text}</h3>
                    <p>Posted By: {comment.createdBy.username}</p> 
                    <p>Likes: {comment.likes}</p>
                </div>
                ))}
            </div>
    )
}

export default CommentList;