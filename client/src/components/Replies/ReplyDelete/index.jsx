import { useMutation } from "@apollo/client";
import { DELETE_REPLY } from "../../../utils/mutations";




export default function ReplyDelete (commentId, replyId){
    const[removeReply, {deleteError}] = useMutation(DELETE_REPLY);
    const handleDeleteReply = async () => {
        try{
        console.log('commentID', commentId)
        console.log('replyID', replyId)
        const{data}= await removeReply({
            variables: {
                 commentId,
                 replyId 
            },
        });
    } catch (err) {
        console.log(err);
    }
    window.location.reload()
}

    return(
        
        <>
        <button onClick={handleDeleteReply}>Delete</button>
        </>


    )
}





