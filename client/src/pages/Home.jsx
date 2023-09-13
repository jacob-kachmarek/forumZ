import ForumList from '../components/Forum/ForumList';
import Auth from '../utils/auth';
import './Home.css';
import ForumForm from '../components/Forum/ForumForm';

export default function Home() {
    if (!Auth.loggedIn()){
        return (
          <div>
              <div style={{padding: '40px',marginBottom: '30px'}}>
                  <h1 >Join The Conversation</h1>
                  <p className='para'>The all encompassing Reddit-like platform where you can explore different forumZ, make a post with an embedded video or picture, comment on others' posts and even reply to comments!</p>
                  <button
                  className='button'
                  onClick={() => {
                      window.location.assign('/login');
                  }}
                  >
                  Create!
                  </button>
              </div>

              <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{width: '70%'}}>
                    <ForumList />
                </div>
              </div>
          </div>
        );
    }

    else{
        return (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-around', padding: '30px', marginBottom: '20px'}}>
                <div style={{marginLeft: '20px'}}>
                    <ForumForm />
                </div>
                <div style={{width: '70%', marginRight: '20px'}}>
                    <ForumList />
                </div>
              </div>
            </div>
        );
    }
}

