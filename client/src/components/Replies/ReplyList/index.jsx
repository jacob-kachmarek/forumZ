import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPLIES } from '../../../utils/queries';

const ReplyList = ({ commentId }) => {
    const { loading, error, data } = useQuery(GET_REPLIES, {
      variables: { commentId }
    });
  
    if (loading) return 'Loading...';
    if (error) return `Error: ${error.message}`;
  
    return (
      <div>
        {data.getRepliesByComment.map((reply) => (
          <div key={reply._id}>
            <p>{reply.text}</p>
            <p>Likes: {reply.likes}</p>
            <p>Created At: {reply.createdAt}</p>
            <p>Created By: {reply.createdBy.username}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default ReplyList;