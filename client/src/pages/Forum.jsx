import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import PostList from '../components/Posts/PostList/index.jsx';
import { GET_SINGLE_FORUM } from "../utils/queries";
import PostForm from '../components/Posts/PostForm/index.jsx';
import {useState} from 'react';
import Auth from '../utils/auth.js';


export default function Forum() {
    const [show, setShow] = useState(false);
    const { forumId } = useParams();

    const { loading, error, data } = useQuery(GET_SINGLE_FORUM, {
        variables: { forumId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log("data:", data);

    return (
        <>
            <div style={{padding: '10px', margin: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px', color: '#852cde', border: '4px solid black'}}>
                <h1>{data.getSingleForum.title}</h1>
                <p style={{width: '50%', marginTop: '20px', lineHeight: '22px', color: 'black'}}>{data.getSingleForum.description}</p>
            </div>
            <PostForm forumId={forumId} /> 
            <PostList forumId={forumId} />
        </>
    );
}


// <div style={{display: 'flex', justifyContent: 'space-between', padding: '0px 30px 30px 30px', marginBottom: '20px'}}>
// <div style={{marginLeft: '20px'}}>
//     <ForumForm />
// </div>
// <div style={{width: '70%', marginRight: '20px'}}>
//     <ForumList />
// </div>
// </div>