import { Link, useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';
import './navbar.css';

const loggedIn = true; // delete this eventually

export default function Navbar () {
   const currentPage = useLocation().pathname;

   const handleLogout = (e) =>{
      e.preventDefault();
      Auth.logout();
   }

    return(
      <>
         {loggedIn ? (        // change to Auth.loggedIn() eventually;
            <div>
               {(currentPage === "/") ? (<Link className='activeLink' to="/" > Home </Link>) : (<Link className='inactiveLink' to="/" > Home </Link>)}
               <button onClick={handleLogout}> Logout </button>
            </div>
         ) : (
            <div>
               {(currentPage === "/") ? (<Link className='activeLink' to="/" > Home </Link>) : (<Link className='inactiveLink' to="/" > Home </Link>)}
               {(currentPage === "/login") ? (<Link className='activeLink' to="/login" > Login </Link>) : (<Link className='inactiveLink' to="/login" > Login </Link>)}
               {(currentPage === "/signup") ? (<Link className='activeLink' to="/signup" > Signup </Link>) : (<Link className='inactiveLink' to="/signup" > Signup </Link>)}
            </div>
         )}
      </>
    );
}
    
    
        
    
