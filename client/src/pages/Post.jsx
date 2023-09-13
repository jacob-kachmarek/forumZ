import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import CommentList from "../components/Comments/CommentList/index.jsx";
import CommentForm from '../components/Comments/CommentForm/index.jsx';
import { GET_POST } from "../utils/queries"; // Import your GraphQL query for a single post
import { useState } from 'react';
import Auth from '../utils/auth.js';

export default function Post() {
    const { postId } = useParams();

    // Use useQuery to fetch the single post data
    const { loading, error, data } = useQuery(GET_POST, {
        variables: { postId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log("data:", data);

    const post = data.getSinglePost; // Store the post data in a variable for easier access

    // Check if the image field is null or empty
    if (post.image == null) {
        return (
            <>
                <div style={{ padding: '10px', margin: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px', color: '#852cde', border: '4px solid black' }}>
                    <h1>{post.title}</h1>
                    <p style={{ width: '50%', marginTop: '20px', lineHeight: '22px', color: 'black' }}>{post.description}</p>
                    {/* Display other fields from the post */}
                    <p>Created At: {post.createdAt}</p>
                    <p>Created By: {post.createdBy ? post.createdBy.username : 'Unknown'}</p>
                    <p>Likes: {post.likes}</p>
                    {/* Add more fields here as needed */}
                </div>
                <CommentList postId={postId} />
                <div>
                    <CommentForm postId={postId} />
                </div>
            </>
        );
    }

    // Check if the image URL is for an image or an mp4 video
    const isImage = post.image.match(/\.(jpeg|jpg|gif|png)$/) !== null;
    const isMp4Video = post.image.toLowerCase().endsWith('.mp4');

    return (
        <>
            <div style={{ padding: '10px', margin: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px', color: '#852cde', border: '4px solid black' }}>
                <h1>{post.title}</h1>
                {/* Conditionally render an image or video */}
                {isImage ? (
                    <img
                        src={post.image}
                        alt="Post Image"
                        style={{ maxWidth: '100%' }}
                    />
                ) : isMp4Video ? (
                    <video
                        width="100%"
                        height="auto"
                        controls
                        style={{ maxWidth: '100%' }}
                    >
                        <source src={post.image} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <p>Unsupported video format</p>
                )}
                {/* Display other fields from the post */}
                <p style={{ width: '50%', marginTop: '20px', lineHeight: '22px', color: 'black' }}>{post.description}</p>
                <p>Created At: {post.createdAt}</p>
                <p>Created By: {post.createdBy ? post.createdBy.username : 'Unknown'}</p>
                <p>Likes: {post.likes}</p>
                {/* Add more fields here as needed */}
            </div>
            <CommentList postId={postId} />
            <div>
                <CommentForm postId={postId} />
            </div>
        </>
    );
}
