import { useMutation } from "@apollo/client";
import { DELETE_REPLY} from "../../../utils/mutations";
import { GET_REPLIES } from "../../../utils/queries";
import Auth from '../../../utils/auth';


export default function ReplyDelete ({commentId, replyId}){
    console.log('commentID', commentId)
    console.log('replyID', replyId)
    const[deleteReply, {deleteError}] = useMutation(DELETE_REPLY) 
    
    const handleDeleteReply = async () => {
       if (Auth.loggedIn()){
        try{
        console.log('commentID', commentId)
        console.log('replyID', replyId)
        const{data}= await deleteReply({
            variables: {
                replyId, 
                 commentId
            },
            refetchQueries: [{query: GET_REPLIES, variables:{commentId}}],
        });
    } catch (err) {
        console.log(err);
    }
    window.location.reload()
}}
    return(
        <button onClick={handleDeleteReply}>Delete</button>
    )
    
}





