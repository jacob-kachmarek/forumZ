import CommentList from "../components/CommentList/index.jsx"
import CommentForm from '../components/CommentForm/index.jsx';
import ReplyList from "../components/ReplyList/index.jsx"



export default function Post() {
    return (
        <>
            <h1>Post</h1>
            <CommentList />
            <div>
                <CommentForm />
            </div>
            <ReplyList />
        </>
    )
}