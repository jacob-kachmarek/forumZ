import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_COMMENTS } from '../../../utils/queries'; // Import DELETE_COMMENT mutation
import { LIKE_COMMENT, DELETE_COMMENT } from '../../../utils/mutations';
import Auth from '../../../utils/auth';

function CommentList() {
    const { postId, forumId } = useParams();

    const { loading, error, data } = useQuery(GET_COMMENTS, {
        variables: { postId: postId },
    });

    const [likedComments, setLikedComments] = useState([]);

    const [likeComment] = useMutation(LIKE_COMMENT);
    const [deleteComment] = useMutation(DELETE_COMMENT); // Import DELETE_COMMENT mutation

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

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

    const handleDeleteClick = async (commentId) => {
        if (Auth.loggedIn()) {
            try {
                // You should check if the comment belongs to the signed-in user here
                // Assuming you have a way to get the comment's createdBy userId
                const commentUserId = data.getCommentsByPost[0].comments.find(
                    (comment) => comment._id === commentId
                ).createdBy._id;
                console.log("data:", data.getCommentsByPost[0].comments.find((comment) => comment._id === commentId))
                console.log("commentUserId: ", commentUserId)
                if (Auth.getUserID() === commentUserId) {
                    console.log("Auth.getUserID(): ", Auth.getUserID())
                    // If the comment belongs to the signed-in user, delete it
                    await deleteComment({ variables: { commentId } });
                    // You may want to refetch comments or update the UI after deletion
                }
                window.location.reload()
            } catch (error) {
                console.error("Error deleting comment:", error);
            }
        }
    };
    
    if (data.getCommentsByPost.length === 0) {
        return (
            <>
                <h2>No comments yet! Add the first one?</h2>
            </>
        )
    } else {
        return (
            <div>
                <h2>Comments</h2>
                {data.getCommentsByPost[0].comments.map((comment) => (
                    <div key={comment._id}>
                        <h3>{comment.text}</h3>
                        <p>Posted By: {comment.createdBy.username}</p>
                        <p>Likes: {comment.likes}</p>
                        {Auth.loggedIn() && (
                            <div>
                                <button
                                    style={{ border: 'none', padding: '0' }}
                                    onClick={() => handleLikeClick(comment._id)}
                                    disabled={likedComments.includes(comment._id)}
                                >
                                    👍
                                </button>
                                {Auth.getUserID() === comment.createdBy._id && (
                                    <button
                                        style={{ border: 'none', padding: '0', color: 'red' }}
                                        onClick={() => handleDeleteClick(comment._id)}
                                    >
                                        🗑️
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }
}

export default CommentList;