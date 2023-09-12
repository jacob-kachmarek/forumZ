import { useQuery } from '@apollo/client';
import { GET_FORUMS } from '../../../utils/queries';
import { Link } from 'react-router-dom'; 
import ForumDelete from '../ForumDelete';
import Auth from '../../../utils/auth';

const cardStyle = {
    border: '3px solid #000000',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
};

const titleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
};

const descriptionStyle = {
    fontSize: '14px',
    color: '#333333',
};

function ForumList() {
    const { data, loading, error } = useQuery(GET_FORUMS);

    const USERID = () =>{
        try{
            return Auth.getProfile().data._id;
        } catch{
            return 999;
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {data.getForums.map(forum => (
                <div key={forum._id}>
                    <div style={cardStyle}>

                    <div style={titleStyle}>
                    <Link to={`/forum/${forum._id}`}>
                        <h2>{forum.title}</h2>
                    </Link>
                    </div>

                    <div style={descriptionStyle}>{forum.description}</div>
                    <div style={descriptionStyle}>Created At: {forum.createdAt}</div>
                    <div style={descriptionStyle}>Created By: {forum.createdBy.username}</div>
                    {/* <div style={{color: "black"}}>{Auth.getProfile().data._id}</div>
                    <div style={{color: "black"}}>{forum.createdBy._id}</div> */}
                    {(USERID() === forum.createdBy._id) ?  <ForumDelete forumId={forum._id} /> : null}
                    {/* <ForumDelete forumId={forum._id} /> */}

                     {/*<DeleteButtonComponent forumId={forum._id}/> */} {/*CHANGE HERE TO DELETE (we also need an if statement to see if this is the user's forum)*/}
                </div>
            </div>
            ))}
        </>
    );
}

export default ForumList;
