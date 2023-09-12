import CommentList from "../components/Comments/CommentList/index.jsx"
import CommentForm from '../components/Comments/CommentForm/index.jsx';
import { useParams } from 'react-router-dom';




export default function Post() {
    const { postId } = useParams();
    return (
        <>
            <h1>Post</h1>
            <CommentList postId={postId} />
            <div>
                <CommentForm postID={postId}/>
            </div>
           
        </>
    )
}