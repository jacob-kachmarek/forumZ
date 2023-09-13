import { ADD_REPLY } from "../../../utils/mutations";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from '../../../utils/auth';

export default function ReplyForm({commentId}) {

    const [text, setText] = useState('');
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
    }
    return (
        <div>
            <h4>Add a Reply!</h4>
            <form onSubmit={handleFormSubmit}>
                <label>Reply</label>
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
