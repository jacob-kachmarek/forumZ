import './forumForm.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FORUM } from '../../../utils/mutations';
import Auth from '../../../utils/auth';

export default function ForumForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [addForum, { error }] = useMutation(ADD_FORUM);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'title') {
          setTitle(value);
        }else{
            setDescription(value);
        }
      };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addForum({
                variables: {
                  title,
                  description,
                  userID: Auth.getProfile().data._id,
                },
              });
            console.log(data);
        } catch (err) {
          console.error(err);
        }
        window.location.reload();
        setDescription("");
        setTitle("");
    };

    return (
        <>  
            <h4>Create a forum!</h4>
            <form onSubmit={handleFormSubmit}>
                <label>Title</label>
                <input 
                    type="text"
                    name="title"
                    value={title}
                    placeholder='ie: Cats'
                    onChange={handleChange}
                />
                <label>Description</label>
                <textarea 
                    name="description"
                    value={description}
                    placeholder='ie: Forum for sharing cat posts!'
                    onChange={handleChange}        
                ></textarea>
                <button type="submit">
                    create
                </button>
            </form>
        </>

    );

}

