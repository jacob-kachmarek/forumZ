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
                }} onClick={() => setShowForm(true)}>update</button>
            ) }
            {showForm ? (
                <form onSubmit={handleUpdateForum}>
                    <input 
                        type="text" 
                        name="title"
                        value={title}
                        placeholder='new title'
                        onChange={handleChange}
                    />
                    <textarea 
                        name="description"
                        value={description}
                        placeholder='new description'
                        onChange={handleChange}
                    />
                    <button type='submit'>update</button>
                </form>
            ) : null}
        </div>
    );
}
