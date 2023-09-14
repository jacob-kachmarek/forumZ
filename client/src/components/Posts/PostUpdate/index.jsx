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
        <button style={{
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 10px',
          fontSize: '12px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          boxShadow: 'none',
          marginBottom: '5px'
      }} onClick={() => setShowForm(true)}>update</button>
      )}
      {showForm && (
        <form onSubmit={handleUpdatePost}>
          <input 
            type="text"
            id="title"
            name="title"
            value={formData.title}
            placeholder="New title"
            onChange={handleChange}
          />
          <textarea
            id="description"
            name="description"
            value={formData.description}
            placeholder="New description"
            onChange={handleChange}
          />
          <button  type="submit">update</button>
        </form>
      )}
      { error && <p>{error.message}</p> }
    </div>
  );
}
