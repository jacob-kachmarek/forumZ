// import React, { useState } from 'react';
// import { useLazyQuery, useApolloClient } from '@apollo/client';
// import { SEARCH_POSTS, GET_FORUM_POSTS } from '../../../utils/queries';
// import { useSearch } from '../../../contexts/SearchContext';

// const PostSearchBar = ({ forumId }) => {
//     const { searchTerm, setSearchTerm } = useSearch();
//     const [searchPosts, { loading, data }] = useLazyQuery(SEARCH_POSTS);
//     const client = useApolloClient();

//     const handleSearch = () => {
//         setSearchTerm(searchTerm);
//         searchPosts({ variables: { forumId, searchTerm } });
//     };

//     // Write to the cache if searchPosts returns data
//     if (data?.searchPosts) {
//         client.writeQuery({
//             query: GET_FORUM_POSTS,
//             variables: { forumId },
//             data: {
//                 getPosts: data.searchPosts,
//             },
//         });
//     }

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search posts..."
//             />
//             <button onClick={handleSearch}>Search</button>

//             {loading && <p>Loading...</p>}
//         </div>
//     );
// };

// export default PostSearchBar;
