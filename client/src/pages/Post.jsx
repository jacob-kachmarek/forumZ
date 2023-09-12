import CommentList from "../components/Comments/CommentList/index.jsx"
import CommentForm from '../components/Comments/CommentForm/index.jsx';




export default function Post() {
    return (
        <>
            <h1>Post</h1>
            <CommentList />
            <div>
                <CommentForm />
            </div>
           
        </>
    )
}