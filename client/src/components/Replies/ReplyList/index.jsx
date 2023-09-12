
import { useQuery } from "@apollo/client";
import { GET_REPLIES } from "../../../utils/queries";
import { useParams } from 'react-router-dom';
import ReplyDelete from "../ReplyDelete";


const ReplyList = ({commentId}) => {

    // {forumId, postId}  not sure if i need this with commentId
    const { postId} = useParams();
    console.log("comment parameter",postId)
    const { loading, error, data } = useQuery(GET_REPLIES, {
        variables: { postId, commentId },
    });
  

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const replies = data.getRepliesByComment[0].comments[0].replies;

    // console.log('replyText', data.getRepliesByComment[0].comments[0].replies[0].text)



    return (
        <div>
            <h3>Replies</h3>
            {replies.map((reply) => {
            
                return (
                <div key={reply._id}>
                    <p>{reply.text}</p>
                    {/* <p>Created by: {reply.createdBy.username}</p> */}
                    {/* <deleteReply commentId={commentId} replyId={reply._id}  />
                     */}
                     <ReplyDelete commentId={commentId} replyId={reply._id} />
                </div>
            )})}
        </div>
    );
} ;

export default ReplyList;