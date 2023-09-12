import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../../utils/mutations';
import Auth from '../../../utils/auth';
import { Cloudinary } from '@cloudinary/url-gen';
import { Image } from 'cloudinary-react';

export default function PostForm({ forumId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [addPost, { error }] = useMutation(ADD_POST);

  // Initialize cloudinary object
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'dtvso2zih'
    }
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'forumZupload');

    setImageLoading(true);

    const res = await fetch('https://api.cloudinary.com/v1_1/dtvso2zih/image/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    setImage(data.secure_url);
    setImageLoading(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { data } = await addPost({
      variables: {
        title,
        description,
        image,
        userID: Auth.getProfile().data._id,
        forumId,
      },
    });

    // Reset form
    setTitle('');
    setDescription('');
    setImage(null);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

        <label>Image:</label>
        <input type="file" onChange={handleImageUpload} />
        
        {/* Image Preview */}
        { imageLoading ? (
          <p>Loading...</p>
        ) : image ? (
          <Image cloudName="forumZupload" publicId={image} width="300" crop="scale" />
        ) : null }

        <button type="submit">Add Post</button>
      </form>

      { error && <p>{error.message}</p> }
    </div>
  );
}
