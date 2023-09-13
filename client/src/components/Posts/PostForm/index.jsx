import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../../utils/mutations';
import { GET_FORUM_POSTS } from '../../../utils/queries';
import Auth from '../../../utils/auth';
import './PostForm.css';
import { Image } from 'cloudinary-react';

export default function PostForm({ forumId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [show, setShow] = useState(false);
  
  // Add refetchQueries for automatic data refresh
  const [addPost, { error }] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_FORUM_POSTS, variables: { forumId } }],
  });

  const supportedFileTypes = ['image/jpg', 'image/jpeg', 'image/png', 'video/mp4'];

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await addPost({
      variables: {
        title,
        description,
        image,
        userID: Auth.getProfile().data._id,
        forumId,
      },
    });

    setTitle('');
    setDescription('');
    setImage(null);
    setShow(false);
  };

  return (
    <>
    {(!Auth.loggedIn()) &&
      <button className='button' onClick={()=> {window.location.assign('/signup')}}>create post!</button>
    }

    {(!show && Auth.loggedIn()) && 
      <button className='button' onClick={() => {setShow(true)}}>create post!</button>
    }
    {(show) &&
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={description} placeholder='description' onChange={(e) => setDescription(e.target.value)}></textarea>
        <label>Media</label>
        <input type="file" onChange={handleMediaUpload} />
        
        {/* Media Preview */}
        { imageLoading ? (
          <p>Loading...</p>
        ) : image ? (
          image.endsWith('.jpg') || image.endsWith('.png') || image.endsWith('.jpeg') ? (
            <Image cloudName="forumZupload" publicId={image} width="300" crop="scale" />
          ) : (
            <video width="300" controls>
              <source src={image} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        ) : null }

        <button type="submit">create!</button>
      </form>
    }
      
      { error && <p>{error.message}</p> }
    </>
  );
}
