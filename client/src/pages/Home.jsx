import ForumList from '../components/ForumList';
import '../utils/auth';
import './Home.css';

const loggedIn = true;

export default function Home() {


    if (!loggedIn){
        return (
          <div className='containerMain'>
            <div className='leftPanel'>
              <ForumList />
            </div>
            <div className='intro'>
              <div style={{width: '50%'}}>
                  <h1 className='heading'>Join The Conversation</h1>
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
            </div>
          </div>
        );
    }

    else{
        return (
            <div className='containerMain'>
              <div className='leftPanel'>
                <ForumList />
              </div>
              <div className='intro'>
                <div style={{width: '50%'}}>
                    {/* <h1 className='heading'>Join The Conversation</h1>  welcome back User.getProfile */}
                    <p className='para'>Your forums:</p>
                    {/* Profile Component HERE // not created yet // just a component with all their forums */}
                </div>
              </div>
            </div>
        );
    }
}



// if logged in, we need to see their currently owned forums (with profile component)
// and they can add a new forum with a modal (refetch queries)