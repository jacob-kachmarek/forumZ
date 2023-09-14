import { ADD_REPLY } from "../../../utils/mutations";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from '../../../utils/auth';

export default function ReplyForm({commentId}) {

    const [text, setText] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [addReply] = useMutation(ADD_REPLY);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'text') {
            setText(value);
        }
    };
    const handleFormSubmit = async (event) => {

        event.preventDefault();
        console.log("commentID", commentId)
        // console.log("POST ID",postId)
        console.log("USER ID", Auth.getProfile().data._id)

        try {
            const { data } = await addReply({
                variables: {
                    text,
                    commentId: commentId,
                    userID: Auth.getProfile().data._id,
                },
            });
            console.log("data: ", data, text, Auth.getProfile().data._id );
        } catch (err) {
            console.log(err);
        } 
        window.location.reload();   
        setText("");
        setShowForm(false);
    }

    if (Auth.loggedIn()) {
        return (
            <div>
                {!showForm && (
                    <button  style={{
                        padding: '0px',
                        backgroundColor: '#f0f0f0',
                        fontWeight: 'less',
                        color: 'grey',
                        fontSize: '12px',
                        cursor: 'pointer',
                        marginBottom: '20px',
                        borderBottom: '2px solid grey',
                        borderRadius: '0px',
                        paddingBottom: '1px'
                    }} onClick={() => setShowForm(true)}>Reply</button>
                ) }
                {showForm ? (
                <form style={{border: '2px solid black'}} onSubmit={handleFormSubmit}>
                    <input 
                        type="text"
                        placeholder="nice comment!"
                        name="text"
                        value={text}
                        onChange={handleChange}
                    />
                    <button type="submit">
                        reply
                    </button>
                </form>
                ) : null}
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}
