import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import PostList from '../components/Posts/PostList/index.jsx';
import { GET_SINGLE_FORUM } from "../utils/queries";
import PostForm from '../components/Posts/PostForm/index.jsx';
import Auth from '../utils/auth.js';


export default function Forum() {
    const { forumId } = useParams();

    const { loading, error, data } = useQuery(GET_SINGLE_FORUM, {
        variables: { forumId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log("data:", data);

    return (
        <>
            <h1>Forum: {data.getSingleForum.title}</h1>
            {(Auth.loggedIn()) &&
            <PostForm forumId={forumId} /> 
            }
            <PostList forumId={forumId} />
        </>
    );
}
