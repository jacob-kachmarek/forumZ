import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COMMENTS } from '../../../utils/queries';
import { LIKE_COMMENT, DELETE_COMMENT } from '../../../utils/mutations';
import Auth from '../../../utils/auth';
import ReplyList from '../../Replies/ReplyList';
import ReplyForm from '../../Replies/ReplyForm';

function CommentList({ postId }) {
    const [sortOrder, setSortOrder] = useState("likes_DESC");

    const { loading, error, data } = useQuery(GET_COMMENTS, {
        variables: { postId, orderBy: sortOrder },
    });

    const [likedComments, setLikedComments] = useState();

    const [likeComment] = useMutation(LIKE_COMMENT);
    const [deleteComment] = useMutation(DELETE_COMMENT);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const toggleSortingOrder = () => {
        const newSortOrder = sortOrder === "likes_DESC" ? "likes_ASC" : "likes_DESC";
        setSortOrder(newSortOrder);
    };

    const handleLikeClick = async (commentId) => {
        if (Auth.loggedIn()) {
            try {
                await likeComment({ variables: { commentId } });
                setLikedComments(likedComments);
            } catch (error) {
                console.error("Error liking comment:", error);
            }
        }
    };

    const handleDeleteClick = async (commentId) => {
        if (Auth.loggedIn()) {
            try {
                const commentUserId = data.getCommentsByPost[0].comments.find(
                    (comment) => comment._id === commentId
                ).createdBy._id;

                if (Auth.getUserID() === commentUserId) {
                    await deleteComment({ variables: { commentId } });
                }
                window.location.reload();
            } catch (error) {
                console.error("Error deleting comment:", error);
            }
        }
    };

    const sortedComments = [...data.getCommentsByPost[0].comments].sort((a, b) => {
        if (sortOrder === "likes_ASC") {
            return a.likes - b.likes;
        } else {
            return b.likes - a.likes;
        }
    });

    return (
        <div>
            <h2>Comments</h2>
            <button onClick={toggleSortingOrder}>Toggle Sorting Order</button>
            {sortedComments.map((comment) => (
                <div key={comment._id}>
                    <h3>{comment.text}</h3>
                    <p>Posted By: {comment.createdBy.username}</p>
                    <p>Likes: {comment.likes}</p>
                    {Auth.loggedIn() && (
                        <div>
                            <button
                                style={{ border: 'none', padding: '0' }}
                                onClick={() => handleLikeClick(comment._id)}
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
                            <ReplyList replies={comment.replies} commentId={comment._id} />
                        </div>
                    )}
                    <ReplyForm commentId={comment._id} />
                </div>
            ))}
        </div>
    );
}
export default CommentList;