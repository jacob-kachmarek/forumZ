import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './main.css';

import App from './App.jsx'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import Forum from './pages/Forum.jsx';
import Post from './pages/Post.jsx';
import Profile from './pages/Profile';
import Comment from './components/Comments/CommentList'
import Reply from './components/Replies/ReplyList'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/login',
        element: <Login />
      }, 
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/profile',
        element: <Profile/>
      },
      {
        path: '/forum/:forumId',
        element: <Forum/>
      },
      {
        path: 'forum/:forumId/post/:postId',
        element: <Post/>
      },
      {
        path: 'forum/:forumId/post/:postId/comment/:commentId',
        element: <Comment/>
      },
      {
        path: 'forum/:forumId/post/:postId/comment/:commentId/reply/:replyId',
        element: <Reply/> 
      }

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)