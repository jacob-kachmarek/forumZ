import CommentList from "../components/CommentList/index.jsx"
import ReplyList from "../components/ReplyList/index.jsx"



export default function Post() {
    const commentId = useParams();
    return (
        <>
            <h1>Post</h1>
            <CommentList />
            <ReplyList />
        </>
    )
}