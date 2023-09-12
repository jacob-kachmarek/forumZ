import {DELETE_FORUM} from '../../../utils/mutations';
import { useMutation } from '@apollo/client';

export default function ForumDelete({forumId}){
    const [DeleteForum, { error }] = useMutation(DELETE_FORUM);

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
        <button onClick={handleDeleteForum}>Delete</button>
    );
}

