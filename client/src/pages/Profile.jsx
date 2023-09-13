import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { GET_USER_CONTENT } from '../utils/queries';
import Auth from '../utils/auth';
import './Profile.css';

// Define the getMediaType function
const getMediaType = (url) => {
    if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png')) {
        return 'image';
    }
    if (url.endsWith('.mp4')) {
        return 'video';
    }
    return 'unknown';
};

function Profile() {
    // Check if the user is logged in
    const isLoggedIn = Auth.loggedIn();

    if (!isLoggedIn) {
        return <p>Please log in to view your profile.</p>;
    }

    // If the user is logged in, fetch the user's data
    const username = Auth.getProfile().data.username;

    const { loading, error, data } = useQuery(GET_USER_CONTENT, {
        variables: { username: username },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const user = data.getSingleUser;

    return (
        <div className='profile-container'>
            <div className='profile-header'>
                <h2>User Profile: {user.username}</h2>
                <p>Joined at: {user.createdAt}</p>
            </div>
            <div className='sections-container'>
                <div className='forum-section'>
                    <h3>Forums ({user.forums.length}):</h3>
                    <ul>
                        {user.forums.map((forum) => (
                            <li key={forum._id} className='card forum-card'>
                                <p>Title: {forum.title}</p>
                                <p>Description: {forum.description}</p>
                                <p>Created by: {forum.createdBy.username}</p>
                                <p>Created at: {forum.createdAt}</p>

                            </li>
                        ))}
                    </ul>
                </div>
                <div className='post-section'>
                    <h3>Posts ({user.posts.length}):</h3>
                    <ul>
                        {user.posts.map((post) => (
                            <li key={post._id} className='card post-card'>
                                <p>
                                    Title: {post.title}
                                </p>
                                <p>Description: {post.description}</p>
                                <p>Likes: {post.likes}</p>
                                <p>Created at: {post.createdAt}</p>
                                {post.image && (
                                    <div>
                                        {getMediaType(post.image) === 'image' && (
                                            <img src={`${post.image}?format=auto`} alt={post.title} width="300" />
                                        )}
                                        {getMediaType(post.image) === 'video' && (
                                            <video width="300" controls>
                                                <source src={post.image} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='comments-section'>
                <h3>You have also posted {user.comments.length} comments! </h3>
            </div>
        </div>
    );
}

export default Profile;
