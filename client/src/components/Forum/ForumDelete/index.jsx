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
        <button
            style={{
                backgroundColor: '#ff3b30',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 10px',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                boxShadow: 'none',
                marginBottom: '5px'
            }}
            onClick={handleDeleteForum}
            >
            Delete
            </button>
    );
}

