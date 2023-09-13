import './forumForm.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FORUM } from '../../../utils/mutations';
import Auth from '../../../utils/auth';

export default function ForumForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [addForum, { error }] = useMutation(ADD_FORUM);
    const [show, setShow] = useState(false);

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
            {(!show) && 
            <button
            className='button'
            onClick={() => {setShow(true)}}
            >
            Create New Forum!
            </button>}
            {(show) && <form onSubmit={handleFormSubmit}>
                <input 
                    type="text"
                    name="title"
                    value={title}
                    placeholder='title'
                    onChange={handleChange}
                />
                <textarea 
                    name="description"
                    value={description}
                    placeholder='description'
                    onChange={handleChange}        
                ></textarea>
                <button type="submit">
                    create!
                </button>
            </form>}
            
        </>

    );

}

