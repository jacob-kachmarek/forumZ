import { useQuery } from '@apollo/client';
import { GET_FORUMS } from '../../../utils/queries';
import { Link } from 'react-router-dom'; 
import ForumDelete from '../ForumDelete';
import ForumUpdate from '../ForumUpdate';
import Auth from '../../../utils/auth';

const cardStyle = {
    border: '4px solid #000000',
    boxShadow: '7px 7px 5px black',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
};

const titleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
};

const descriptionStyle = {
    fontSize: '18px',
    color: '#333333',
    marginTop: '8px'
};
const buttonDiv = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', // Align buttons to the right
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
                        <div>
                            <div style={titleStyle}>
                            <Link style={{textDecoration: 'none', color: '#852cde'}} to={`/forum/${forum._id}`}>
                                <h2>{forum.title}</h2>
                            </Link>
                            </div>
                            <div style={descriptionStyle}>{forum.description}</div>
                        </div>
                        <div>
                            <div style={buttonDiv}>
                                {(USERID() === forum.createdBy._id) ?  
                                    <>
                                    <ForumDelete forumId={forum._id} /> 
                                    <ForumUpdate forumId={forum._id}/>
                                    </>
                                : <></>}
                                <div style={{color: 'grey', fontSize: '16px',}}>Made by: {forum.createdBy.username}</div>
                                <div style={{color: 'grey', fontSize: '16px',}} >{forum.createdAt}</div>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </>
    );
}

export default ForumList;
