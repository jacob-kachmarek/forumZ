import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import Forum from './pages/Forum.jsx';
import Post from './pages/Post.jsx';
import Comment from './components/CommentList'
import Reply from './components/PostList'



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