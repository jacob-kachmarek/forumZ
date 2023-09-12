// pass in the forum ID (from props)(from forum page) and return a delete button 
// handle the logic to delete that forum by forum ID
import {DELETE_FORUM} from '../../../utils/mutations';
import { useMutation } from '@apollo/client';

export default function ForumDelete({forumId}){
    const [DeleteForum, { error }] = useMutation(DELETE_FORUM);
    console.log(error);
    const handleDeleteForum = async () =>{
        try {
        const { data } = await DeleteForum({
            variables: {forumId},
        });
        window.location.reload();
        } catch (err) {
        console.error(err);
        }
    }
    return (
        <button onClick={handleDeleteForum}>Delete This Forum</button>
    );
}

