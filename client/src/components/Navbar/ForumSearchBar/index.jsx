import React, { useState } from 'react';
import { useLazyQuery, useApolloClient } from '@apollo/client';
import { SEARCH_FORUMS, GET_FORUMS } from '../../../utils/queries';

const ForumSearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchForums, { loading, data }] = useLazyQuery(SEARCH_FORUMS);
    const client = useApolloClient();

    const handleSearch = () => {
        searchForums({ variables: { searchTerm } });
    };

    // Check if we are at home page ("/")
    const isHome = window.location.pathname === '/';

    // Conditionally render the form only if on the home page
    if (!isHome) {
        return null;
    }

    // Write to the cache if searchForums return data
    if (data?.searchForums) {
        client.writeQuery({
            query: GET_FORUMS,
            data: {
                getForums: data.searchForums,
            },
        });
    }

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search forums..."
            />
            <button onClick={handleSearch}>Search</button>

            {loading && <p>Loading...</p>}
        </div>
    );
};

export default ForumSearchBar;
