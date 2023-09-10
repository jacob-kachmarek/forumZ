import { Link, useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';


export default function Navbar () {
    const currentPage = useLocation().pathname;
    return(
        
      <div className='d-flex justify-content-center navbar navbar-expand-lg navbar-light bg-light'>
         
      <ul className='nav d-flex justify-content-between m-80'>

      <li className='nav-item'>
      <li className='nav-item'>
         <Link
            to="/"
            className={`nav-link ${currentPage === '/' ? 'nav-link active' : 'nav-link'}`}
         >
            Home
         </Link>
         </li>

         <Link
            to="/login"
            className={`nav-link ${currentPage === '/login' ? 'nav-link active' : 'nav-link'}`}
         >
            Login
         </Link>
         </li>

         <li className='nav-item'>
         <Link
            to="/signup"
            className={`nav-link ${currentPage === '/signup' ? 'nav-link active' : 'nav-link'}`}
         >
            Signup
         </Link>
         </li>





      </ul>

   </div>
    )
}
    
    
        
    
