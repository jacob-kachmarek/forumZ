import { UPDATE_FORUM } from '../../../utils/mutations';
import { useMutation } from '@apollo/client';
import { useState } from 'react';





export default function ForumDelete({forumId}){
    const [UpdateForum, {error}] = useMutation(UPDATE_FORUM);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name == 'title'){
            setTitle(value);
        }else{
            setDescription(value);
        }
    };

    const handleUpdateForum = async (e) => {
        e.preventDefault();
        try{
            alert(forumId);
            const { data } = await UpdateForum({
                variables: {
                    title,
                    description,
                    forumId
                }
            })
            

            setDescription('');
            setTitle('');
            setShowForm(false);
        }catch (err){
            console.log(err);
        }
    }

    return (
        <div>
            {!showForm && (
                <button  style={{
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
                }} onClick={() => setShowForm(true)}>Update</button>
            ) }
            {showForm ? (
                <form onSubmit={handleUpdateForum}>
                    <label>What's the new title?</label>
                    <input 
                        type="text" 
                        name="title"
                        value={title}
                        placeholder='title goes here'
                        onChange={handleChange}
                    />
                    <label>What's the new description</label>
                    <textarea 
                        name="description"
                        value={description}
                        placeholder='description goes here'
                        onChange={handleChange}
                    />
                    <button type='submit'>submit update</button>
                </form>
            ) : null}
        </div>
    );
    
}


// click the button,
// then render a form
// then handle that update