import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../../utils/mutations';
import Auth from '../../../utils/auth';
import { useParams } from 'react-router-dom';

export default function CommentForm() {
    const { postId } = useParams();
    const [text, setText] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'text') {
            setText(value);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addComment({
                variables: {
                    text,
                    postId: postId,
                    userID: Auth.getProfile().data._id,
                },
            });
            console.log(data, text, Auth.getProfile().data._id );
        } catch (err) {
            console.log(err);
        }
        window.location.reload();
        setText("");
        setShowForm(false);
    }
    if(Auth.loggedIn()) {
        return (
            <div>
                {!showForm && (
                <button  style={{
                    marginTop: '40px'
                }} onClick={() => setShowForm(true)}>comment</button>
            ) }
            {showForm ? (
                <form style={{border: '2px solid black'}} onSubmit={handleFormSubmit}>
                    <input 
                        type="text"
                        name="text"
                        placeholder='what a cool post!'
                        value={text}
                        onChange={handleChange}
                    />
                    <button type="submit">
                        add
                    </button>
                </form>
            ) : null}
            </div>
        )
    } else {
        return (
            <div style={{marginTop: '50px'}}>
                <p style={{fontSize: '14px'}}>Please <a href='/login'>login</a> to add comments or like posts!</p>
            </div>
        )
    }
}