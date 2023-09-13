import React, { useState } from 'react';
import { useLazyQuery, useApolloClient } from '@apollo/client';
import { SEARCH_FORUMS } from '../../../utils/queries';
import { GET_FORUMS } from '../../../utils/queries';

const ForumSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchForums, { loading, data }] = useLazyQuery(SEARCH_FORUMS);
  const client = useApolloClient();

  const handleSearch = () => {
    searchForums({ variables: { searchTerm } });
    if (data?.searchForums) {
      client.writeQuery({
        query: GET_FORUMS,
        data: {
          getForums: data.searchForums,
        },
      });
    }
  };

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
