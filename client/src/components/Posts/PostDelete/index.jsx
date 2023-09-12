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
    <button onClick={handleDeletePost} style={{ border: 'none', padding: '0', color: 'red' }}>
      🗑️
    </button>
  );
}
