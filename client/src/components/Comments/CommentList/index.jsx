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

    const [likedComments, setLikedComments] = useState({});

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
            // Updated: Add check for if the comment is already liked
            if (!likedComments[commentId]) {
                try {
                    await likeComment({ variables: { commentId } });

                    // Updated: Mark the comment as liked
                    setLikedComments({ ...likedComments, [commentId]: true });
                } catch (error) {
                    console.error("Error liking comment:", error);
                }
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
            <h4 style={{borderBottom: '2px solid black', paddingBottom: '10px'}}>Comments</h4>

            <button style={{float: 'right'}} onClick={toggleSortingOrder}>order by likes</button>
            {sortedComments.map((comment) => (
                <div key={comment._id}>
                    <p style={{fontSize: '18px', clear: 'both'}}>{comment.text}</p>
                    {Auth.loggedIn() && (
                            <button
                            style={{ border: 'none', padding: '5px', color: 'white', backgroundColor: 'white' }}
                            onClick={() => handleLikeClick(comment._id)}
                            
                            disabled={likedComments[comment._id]}
                        >
                            ❤️
                        </button>
                    )}
                    {Auth.loggedIn() && (
                        <>
                            {Auth.getUserID() === comment.createdBy._id && (
                                <button
                                    style={{ border: 'none', padding: '5px', color: 'white', backgroundColor: 'red' }}
                                    onClick={() => handleDeleteClick(comment._id)}
                                >
                                    delete
                                </button>
                            )}
                        </>
                    )}
                    <div style={{float: 'right'}}>
                        <p style={{color: 'grey'}}>- {comment.createdBy.username}</p>
                        <p style={{color: 'grey'}}>{comment.likes} likes</p>
                    </div>
                    <ReplyList replies={comment.replies} commentId={comment._id} />
                    <ReplyForm commentId={comment._id} />
                </div>
            ))}
        </div>
    );
}
export default CommentList;