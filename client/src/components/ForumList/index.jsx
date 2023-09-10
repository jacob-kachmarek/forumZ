import { useQuery } from '@apollo/client';
import { GET_FORUMS } from '../../utils/queries';
import { Link } from 'react-router-dom'; 

function ForumList() {
    const { data, loading, error } = useQuery(GET_FORUMS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {data.getForums.map(forum => (
                <div key={forum._id}>
                    <Link to={`/forum/${forum._id}`}>
                        <h2>{forum.title}</h2>
                    </Link>
                    <p>{forum.description}</p>
                    <p>Created At: {forum.createdAt}</p>
                    <p>Created By: {forum.createdBy.username}</p>
                </div>
            ))}
        </div>
    );
}

export default ForumList;
