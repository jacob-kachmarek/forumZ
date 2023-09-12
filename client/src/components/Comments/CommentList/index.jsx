import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_COMMENTS } from '../../../utils/queries';
import { LIKE_COMMENT } from '../../../utils/mutations'
import Auth from '../../../utils/auth';

function CommentList() {
    const { postId, forumId } = useParams();
    console.log("postId:", postId, "forumID:", forumId);

    const { loading, error, data } = useQuery(GET_COMMENTS, {
        variables: { postId: postId },
    });

    const [likedComments, setLikedComments] = useState([]);

    const [likeComment] = useMutation(LIKE_COMMENT);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log("data:", data);

    const handleLikeClick = async (commentId) => {
        if (Auth.loggedIn() && !likedComments.includes(commentId)) {
            try {
                await likeComment({ variables: { commentId } });
                setLikedComments([...likedComments, commentId]);
            } catch (error) {
                console.error("Error liking comment:", error);
            }
        }
    };

    return (
        <div>
            <h2>Comments</h2>
            {data.getCommentsByPost[0].comments.map(comment => (
                <div key={comment._id}>
                    <h3>{comment.text}</h3>
                    <p>Posted By: {comment.createdBy.username}</p>
                    <p>Likes: {comment.likes}</p>
                    {Auth.loggedIn() && (
                        <button
                            style={{ border: 'none', padding: '0' }}
                            onClick={() => handleLikeClick(comment._id)}
                            disabled={likedComments.includes(comment._id)}
                        >
                            👍
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default CommentList;