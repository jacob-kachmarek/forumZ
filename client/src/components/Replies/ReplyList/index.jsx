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

  //Refetching query to update likes instead of forcing window.reload
  const [likeReply] = useMutation(LIKE_REPLY, {
    refetchQueries: [{ query: GET_REPLIES, variables: { commentId } }],
  });

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  const handleLikeReply = async (replyId) => {
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
        <div style={{marginLeft: '60px', paddingTop: '4px', width: 'fit-content', paddingLeft: '10px', borderLeft: '2px solid black', marginBottom: '20px'}} key={reply._id}>
          <p style={{fontSize: '16px'}}>{reply.text}</p>
          <div style={{marginLeft: '40px'}}>
            <p style={{color: 'grey', fontSize: '10px'}}>{reply.likes} likes</p>
            <p style={{color: 'grey', fontSize: '10px'}}>- {reply.createdBy.username}</p>
            <p style={{color: 'grey', fontSize: '10px'}}>{reply.createdAt}</p>
          </div>
          {Auth.loggedIn() && (
            <div>
              <button
                style={{fontSize: '10px', border: 'none', padding: '5px', color: 'white', backgroundColor: 'white', marginLeft: '40px'}}
                onClick={() => handleLikeReply(reply._id)} 
                disabled={likedReplies.includes(reply._id)} 
              >
                ❤️
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

