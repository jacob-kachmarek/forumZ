import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_POST } from '../../../utils/mutations';
import { Image } from 'cloudinary-react';

export default function PostUpdate({ postId }) {
  const [updatePost, { error }] = useMutation(UPDATE_POST);
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  // Initialized with empty strings
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const supportedFileTypes = ['image/jpg', 'image/jpeg', 'image/png', 'video/mp4'];

  // Function to handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!supportedFileTypes.includes(file.type)) {
      alert("File type not supported. Please upload a JPG, JPEG, PNG, or MP4 file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'forumZupload');

    setImageLoading(true);

    let uploadUrl = 'https://api.cloudinary.com/v1_1/dtvso2zih/image/upload';
    if (file.type.startsWith('video')) {
      uploadUrl = 'https://api.cloudinary.com/v1_1/dtvso2zih/video/upload';
    }

    const res = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setImage(data.secure_url);
    setImageLoading(false);
  };

  // Function to handle form submission
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await updatePost({
        variables: {
          ...formData,
          image, // added the image URL from Cloudinary
          postId
        }
      });
      
      // Clear the form
      setFormData({
        title: '',
        description: ''
      });

      setImage(null);  // Clear the image state
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Update Post</button>
      )}
      {showForm && (
        <form onSubmit={handleUpdatePost}>
          <label htmlFor="title">New Title</label>
          <input 
            type="text"
            id="title"
            name="title"
            value={formData.title}
            placeholder="New title"
            onChange={handleChange}
          />
          <label htmlFor="description">New Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            placeholder="New description"
            onChange={handleChange}
          />
          <label htmlFor="image">New Media</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleMediaUpload}
          />
          {/* Media Preview */}
          { imageLoading ? (
            <p>Loading...</p>
          ) : image ? (
            <Image cloudName="forumZupload" publicId={image} width="300" crop="scale" />
          ) : null }
          <button type="submit">Submit Update</button>
        </form>
      )}
      { error && <p>{error.message}</p> }
    </div>
  );
}
