import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import PostList from '../components/PostList';
import { GET_SINGLE_FORUM } from "../utils/queries.js";

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
            <PostList forumId={forumId} />
        </>
    );
}
