import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import CommentList from "../components/Comments/CommentList/index.jsx";
import CommentForm from '../components/Comments/CommentForm/index.jsx';
import { GET_POST } from "../utils/queries";



export default function Post() {
    const { postId } = useParams();


    const { loading, error, data } = useQuery(GET_POST, {
        variables: { postId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log("data:", data);

    const post = data.getSinglePost; 

    if (post.image == null) {
        return (
            <>
                <div style={{display: 'flex', justifyContent: 'center'}}>

                    <div style={{ padding: '10px', margin: '40px 20px', backgroundColor: '#f0f0f0', borderRadius: '5px',
                    color: '#852cde', border: '3px solid black', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '80%'  }}> 

                        <div>
                            <h1 style={{marginBottom: '10px',}}>{post.title}</h1>
                            <p style={{ width: '90%',lineHeight: '22px', color: 'black' }}>{post.description}</p>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                                <p style={{color: 'grey', fontSize: '16px',}}>Made by: {post.createdBy ? post.createdBy.username : 'Unknown'}</p>
                                <p style={{color: 'grey', fontSize: '16px',}}>{post.createdAt}</p>
                                <p style={{color: 'grey', fontSize: '16px',}}>{post.likes} likes</p>
                            </div>

                        </div>

                        <div>
                            <CommentList postId={postId} />
                            <CommentForm postId={postId} />
                        </div>

                    </div>


                </div>
            </>
        );
    }


    // Check if the image URL is for an image or an mp4 video
    const isImage = post.image.match(/\.(jpeg|jpg|gif|png)$/) !== null;
    const isMp4Video = post.image.toLowerCase().endsWith('.mp4');

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center'}}>

                <div style={{ padding: '10px', margin: '40px 20px', backgroundColor: '#f0f0f0', borderRadius: '5px',
                    color: '#852cde', border: '3px solid black', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '80%'  }}> 
                    <div>
                        <h1 style={{marginBottom: '10px', marginTop: '10px'}}>{post.title}</h1>
                        {isImage ? (
                                <img
                                    src={post.image}
                                    alt="Post Image"
                                    style={{ width: '40%', height: 'auto', marginBottom: '20px' }}
                                />
                            ) : isMp4Video ? (
                                <video
                                    width="100%"
                                    height="auto"
                                    controls
                                    style={{ width: '40%', height: 'auto' }}
                                >
                                    <source src={post.image} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <p>Unsupported video format</p>
                            )}
                        <p style={{ width: '90%',lineHeight: '22px', color: 'black' }}>{post.description}</p>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                            <p style={{color: 'grey', fontSize: '16px',}}>Made by: {post.createdBy ? post.createdBy.username : 'Unknown'}</p>
                            <p style={{color: 'grey', fontSize: '16px',}}>{post.createdAt}</p>
                            <p style={{color: 'grey', fontSize: '16px',}}>{post.likes} likes</p>
                        </div>
                    </div>

                    <div>
                        <CommentList postId={postId} />
                        <CommentForm postId={postId} />
                    </div>


                    
                </div>

            </div>

        </>
    );
}
