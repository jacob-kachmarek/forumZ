import { useMutation } from "@apollo/client";
import { DELETE_REPLY } from "../../../utils/mutations";


export default function ReplyDelete ({commentId, replyId}){
    console.log('commentID', commentId)
    console.log('replyID', replyId)
    const[deleteReply, {deleteError}] = useMutation(DELETE_REPLY) 
    
    const handleDeleteReply = async (e) => {
        e.preventDefault()
        try{
        console.log('commentID', commentId)
        console.log('replyID', replyId)
        const{data}= await deleteReply({
            variables: {
                replyId, 
                 commentId
            },
        });
    } catch (err) {
        console.log(err);
    }
    window.location.reload()
}
    return(
        <button onClick={handleDeleteReply}>Delete</button>
    )
}





