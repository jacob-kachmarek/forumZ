import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../../utils/mutations';
import Auth from '../../../utils/auth';
import { useParams } from 'react-router-dom';

export default function CommentForm() {
    const { postId } = useParams();
    const [text, setText] = useState('');
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
    }

    return (
        <div>
            <h4>Add a comment!</h4>
            <form onSubmit={handleFormSubmit}>
                <label>Title</label>
                <input 
                    type="text"
                    name="text"
                    value={text}
                    onChange={handleChange}
                />
                <button type="submit">
                    add
                </button>
            </form>
        </div>
    )
}