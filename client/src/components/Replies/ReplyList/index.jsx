import { useQuery } from "@apollo/client";
import { GET_REPLIES } from "../../../utils/queries";
import { useParams } from 'react-router-dom';

const ReplyList = () => {

    // {forumId, postId}  not sure if i need this with commentId
    const { postId, commentId} = useParams();
    console.log("comment parameter",postId)
    const { loading, error, data } = useQuery(GET_REPLIES, {
        variables: { postId: postId, commentId:commentId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const replies = data.getRepliesByComment[0].comments[0].replies;

    console.log('replyText', data.getRepliesByComment[0].comments[0].replies[0].text)


    return (
        <div>
            <h3>Replies</h3>
            {replies.map((reply) => (
                <div key={reply._id}>
                    <p>{reply.text}</p>
                    {/* <p>Created by: {reply.createdBy.username}</p> */}
                </div>
            ))}
        </div>
    );
} ;

export default ReplyList;