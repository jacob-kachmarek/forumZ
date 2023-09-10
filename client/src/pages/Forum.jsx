import React from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';

export default function Forum() {
    const { forumID } = useParams();

    return (
        <>
            <h1>Forum</h1>
            <PostList forumID={forumID} />
        </>
    );
}
