import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';

export default function Forum() {
    const { forumId } = useParams();

    return (
        <>
            <h1>Forum</h1>
            <PostList forumId={forumId} />
        </>
    );
}
