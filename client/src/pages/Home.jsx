import ForumList from '../components/ForumList';
import Auth from '../utils/auth';
import './Home.css';
import ForumForm from '../components/ForumForm';




export default function Home() {


    if (!Auth.loggedIn()){
        return (
          <div>
              <div style={{padding: '30px'}}>
                  <h1 >Join The Conversation</h1>
                  <p className='para'>The all-encompassing Reddit-like platform where you can search for existing forumZ or create your own community!</p>
                  <button
                  className='button'
                  onClick={() => {
                      window.location.assign('/signup');
                  }}
                  >
                  Create
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

    else{       //logged In = true
        return (
            <div>
              <div style={{padding: '30px'}}>
                <h1>Welcome back, User </h1>    {/* {Auth.getProfile().data.username} */}
              </div>

              <div style={{display: 'flex', justifyContent: 'space-around'}}>
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

