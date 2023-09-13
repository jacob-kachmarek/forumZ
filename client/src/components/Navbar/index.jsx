import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';
import ForumSearchBar from './ForumSearchBar';
import './navbar.css';

export default function Navbar() {
   const location = useLocation();
   const currentPage = location.pathname;

   // Check if the current location starts with '/forum/' and not with '/forum/.../post/'
   const isForumPage = currentPage.startsWith('/forum/') && !currentPage.includes('/post/');

   const reloadPage = () => {
      history.push('/');  // Navigate to '/'
      window.location.reload();  // Then reload
   };

   const handleLogout = (e) => {
      e.preventDefault();
      Auth.logout();
      reloadPage();
   };


    // Check if we are at home page ("/")
    const isHome = window.location.pathname === '/';

   return (
      <nav className='navbar'>
         <div className='container'>
            {Auth.loggedIn() && (
               <p style={{fontSize: '18px', fontWeight: 'bold' }}>
                  <span style={{ fontSize: '13px', fontWeight: '300' }}>Welcome back,</span>
                  {' '}
                  <Link style={{fontSize: '20px', color: '#c394ee'}} to="/profile">{Auth.getProfile().data.username}</Link>
               </p>
            )}
            <Link to='/' className='logo' onClick={reloadPage}>
               forumZ
            </Link>

            {currentPage === '/' && <ForumSearchBar />}

            <ul className='nav-links'>
               {Auth.loggedIn() ? (
                  <li>
                     <button className='logout-button' onClick={handleLogout}>
                        Logout
                     </button>
                  </li>
               ) : (
                  <>
                     <li>
                        <Link className={currentPage === '/login' ? 'activeLink' : 'inactiveLink'} to='/login'>
                           Login
                        </Link>
                     </li>
                     <li>
                        <Link className={currentPage === '/signup' ? 'activeLink' : 'inactiveLink'} to='/signup'>
                           Signup
                        </Link>
                     </li>
                  </>
               )}
            </ul>
         </div>
      </nav>
   );
}