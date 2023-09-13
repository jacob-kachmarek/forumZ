import { useQuery } from '@apollo/client';
import { GET_REPLIES } from '../../../utils/queries';
import ReplyDelete from "../ReplyDelete";
import Auth from '../../../utils/auth'



const ReplyList = ({ commentId }) => {
    const { loading, error, data } = useQuery(GET_REPLIES, {
      variables: { commentId }
    });
    if (loading) return 'Loading...';
    if (error) return `Error: ${error.message}`;
    const loggedInUserId = Auth.loggedIn() ? Auth.getProfile().data._id : <></>;

    return (
      <div>
        {data.getRepliesByComment.map((reply) => (
          <div key={reply._id}>
            <p>{reply.text}</p>
            <p>Likes: {reply.likes}</p>
            <p>Created At: {reply.createdAt}</p>
            <p>Created By: {reply.createdBy.username}</p>
            {loggedInUserId === reply.createdBy._id && (
              <ReplyDelete commentId={commentId} replyId={reply._id} />
            )}
          </div>
        ))}
      </div>
    );
  };
  export default ReplyList;




// import ReplyDelete from "../ReplyDelete";
// import { useQuery, useMutation } from '@apollo/client';
// import { GET_REPLIES } from "../../../utils/queries";


// export default function ReplyList({commentId}) {

//     const {loading, error, data } = useQuery(GET_REPLIES, {
//         variables: {commentId},
//     });

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;

//     const replies = data.getRepliesByComment;

    
//         return (
//             <div>
//               <h3>Replies</h3>
//               {replies.map((reply) => (
//                 <div key={reply._id}>
//                   <p>{reply.text}</p>
//                   <ReplyDelete commentId={commentId} replyId={reply._id} />
//                 </div>
//               ))}
//             </div>
//           );
//         }





// const ReplyList = ({replies, commentId}) => {
//     return (
//         <div>
//             <h3>Replies</h3>
//             {replies.map((reply) => {
//                 console.log("replies", replies);
//                 return (
//                 <div key={reply._id}>
//                     <p>{reply.text}</p>
//                      <ReplyDelete commentId={commentId} replyId={reply._id} />
//                 </div>
//             )})}
//         </div>
//     );
// } ;

// export default ReplyList;