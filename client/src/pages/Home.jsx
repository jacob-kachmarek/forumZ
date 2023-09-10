import './Home.css';
import '../utils/auth';

const loggedIn = false; // change later // change to Auth.loggedIn() eventually;

export default function Home() {
    
    if (!loggedIn){
        return (
            <h1>Not logged in home</h1>
        );
    }
    
    return (
        <>
            <h1>Logged In home</h1>
        </>
    )
}


// NOT logged In 
    // render all forums 
    // search for one

// Logged IN 
    // render all forums by User
    // allow creation of a new forum 