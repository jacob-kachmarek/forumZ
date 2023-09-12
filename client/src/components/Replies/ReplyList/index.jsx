import ReplyDelete from "../ReplyDelete";

const ReplyList = ({replies, commentId}) => {
    return (
        <div>
            <h3>Replies</h3>
            {replies.map((reply) => {
                return (
                <div key={reply._id}>
                    <p>{reply.text}</p>
                     <ReplyDelete commentId={commentId} replyId={reply._id} />
                </div>
            )})}
        </div>
    );
} ;

export default ReplyList;