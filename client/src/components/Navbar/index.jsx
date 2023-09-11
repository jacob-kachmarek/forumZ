import { Link, useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';
import './navbar.css';

export default function Navbar() {
   const currentPage = useLocation().pathname;

   const handleLogout = (e) => {
      e.preventDefault();
      Auth.logout();
      window.location.reload();

   };
   return (

      <nav className='navbar'>
         <div className='container'>
            <Link to='/' className='logo'>
               forumZ
            </Link>

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
      </nav >
   );
}
