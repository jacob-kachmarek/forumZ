import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../../../utils/mutations'; 

export default function PostDelete({ postId }) {
  const [deletePost, { error }] = useMutation(DELETE_POST);

  const handleDeletePost = async () => {
    try {
      const { data } = await deletePost({
        variables: { postId },
      });
      window.location.reload();  // reload the page to see the effect
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button 
        onClick={handleDeletePost} 
        style={{
          backgroundColor: '#ff3b30',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 10px',
          fontSize: '12px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          boxShadow: 'none',
          marginBottom: '5px'
      }}>
      delete
    </button>
  );
}
