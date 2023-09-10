import './Home.css';
import '../utils/auth';
import { Link } from 'react-router-dom';

const loggedIn = false; // change later // change to Auth.loggedIn() eventually;

export default function Home() {
    return (
        <>
            <div className='leftPanel'>
                <div>
                    <div className='card'>
                        <div className='title'>Title</div>
                        <div className='description'>Description goes here for every forum</div>
                    </div>
                </div>
                <div>
                    <div className='card'>
                        <div className='title'>Title</div>
                        <div className='description'>Description goes here for every forum</div>
                    </div>
                </div>
                <div>
                    <div className='card'>
                        <div className='title'>Title</div>
                        <div className='description'>Description goes here for every forum</div>
                    </div>
                </div>
                <div>
                    <div className='card'>
                        <div className='title'>Title</div>
                        <div className='description'>Description goes here for every forum</div>
                    </div>
                </div>
                <div>
                    <div className='card'>
                        <div className='title'>Title</div>
                        <div className='description'>Description goes here for every forum</div>
                    </div>
                </div>
            </div>
        </>
    );
}


// NOT logged In 
    // render all forums in left side menu with searchbar
    // center text with description of what forums is

// Logged IN 
    // render all forums for specific User
    // allow creation of a new forum 