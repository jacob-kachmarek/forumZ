import { useQuery, useMutation } from '@apollo/client';
import { GET_REPLIES } from '../../../utils/queries';
import ReplyDelete from "../ReplyDelete";
import { useState } from 'react';
import Auth from '../../../utils/auth';
import { LIKE_REPLY } from '../../../utils/mutations';

const ReplyList = ({ commentId }) => {
  const { loading, error, data } = useQuery(GET_REPLIES, {
    variables: { commentId }
  });

  const getLikedRepliesFromLocalStorage = () => {
    const likedRepliesJSON = localStorage.getItem('likedReplies');
    return likedRepliesJSON ? JSON.parse(likedRepliesJSON) : [];
  };

  const updateLikedReplyInLocalStorage = (likedRepliesArray) => {
    localStorage.setItem('likedComments', JSON.stringify(likedRepliesArray));
  };

  const [likedReplies, setLikedReplies] = useState(getLikedRepliesFromLocalStorage());

  const [likeReply] = useMutation(LIKE_REPLY);

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  const handleLikeReply = async (replyId) => {
    console.log("Like Button clicked for reply with ID:", replyId);
    if (Auth.loggedIn() && !likedReplies.includes(replyId)) {
      try {
        await likeReply({ variables: { replyId } });
        const updatedLikedReplies = [...likedReplies, replyId];
        setLikedReplies(updatedLikedReplies);
        updateLikedReplyInLocalStorage(updatedLikedReplies);
      } catch (error) {
        console.error("Error liking reply:", error);
      }
    }
  };

  const loggedInUserId = Auth.loggedIn() ? Auth.getProfile().data._id : <></>;

  return (
    <div>
      {data.getRepliesByComment.map((reply) => (
        <div key={reply._id}>
          <p>{reply.text}</p>
          <p>Likes: {reply.likes}</p>
          <p>Created At: {reply.createdAt}</p>
          <p>Created By: {reply.createdBy.username}</p>
          {Auth.loggedIn() && (
            <div>
              <button
                style={{ border: 'none', padding: '0' }}
                onClick={() => handleLikeReply(reply._id)} // Corrected this line
                disabled={likedReplies.includes(reply._id)} // Corrected this line
              >
                👍
              </button>
              {loggedInUserId === reply.createdBy._id && (
                <ReplyDelete commentId={commentId} replyId={reply._id} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default ReplyList;




