
import '../utils/auth';
import { Link } from 'react-router-dom';

const loggedIn = false; // change later // change to Auth.loggedIn() eventually;

const cardStyle = {
    border: '3px solid #000000',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
};

const titleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
};

const descriptionStyle = {
    fontSize: '14px',
    color: '#333333',
};

const leftPanelStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    width: '200px',
    color: '#000000',
};

export default function Home() {
    return (
        <>
            <div style={leftPanelStyle}>
                <div>
                    <div style={cardStyle}>
                        <div style={titleStyle}>Title</div>
                        <div style={descriptionStyle}>Description goes here for every forum</div>
                    </div>
                </div>
                <div>
                    <div style={cardStyle}>
                        <div style={titleStyle}>Title</div>
                        <div style={descriptionStyle}>Description goes here for every forum</div>
                    </div>
                </div>
                <div>
                    <div style={cardStyle}>
                        <div style={titleStyle}>Title</div>
                        <div style={descriptionStyle}>Description goes here for every forum</div>
                    </div>
                </div>
                <div>
                    <div style={cardStyle}>
                        <div style={titleStyle}>Title</div>
                        <div style={descriptionStyle}>Description goes here for every forum</div>
                    </div>
                </div>
                <div>
                    <div style={cardStyle}>
                        <div style={titleStyle}>Title</div>
                        <div style={descriptionStyle}>Description goes here for every forum</div>
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