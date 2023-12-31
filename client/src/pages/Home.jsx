import ForumList from '../components/Forum/ForumList';
import Auth from '../utils/auth';
import './Home.css';
import ForumForm from '../components/Forum/ForumForm';

export default function Home() {
    if (!Auth.loggedIn()){
        return (
          <div>
              <div style={{padding: '40px',marginBottom: '0px'}}>
                  <h1 >Join the Conversation</h1>
                  <p className='para'>The all encompassing Reddit-like platform where you can explore different forumZ, make a post with an embedded video or picture and interact with others' posts with likes, replies, or comments!</p>
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
                <h3 style={{padding: '40px'}}>Explore some forumZ or create a new one!</h3>
                <div style={{display: 'flex', justifyContent: 'space-around', padding: '0px 30px 30px 30px',}}>
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

