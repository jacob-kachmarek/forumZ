import { useQuery } from "@apollo/client";
import { GET_REPLIES } from "../../utils/queries";

const ReplyList = ({ commentId }) => {
    const { loading, error, data } = useQuery(GET_REPLIES, {
        variables: { commentId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const replies = data.getRepliesByComment;




    return (
        <div>
            {replies.map((reply) => (
                <div key={reply._id}>
                    <p>{reply.text}</p>
                    <p>Created by: {reply.createdBy.username}</p>
                </div>
            ))}
        </div>
    );
} ;

export default ReplyList;