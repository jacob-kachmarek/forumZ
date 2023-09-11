import ForumList from '../components/ForumList';
import '../utils/auth';
import './Home.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const loggedIn = true;

export default function Home() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    else{       //logged In = true
        return (
            <div className='containerMain'>
              <div className='leftPanel'>
                <ForumList />
              </div>
              <div className='intro'>
                <div style={{width: '50%'}}>
                    {/* <h1 className='heading'>Join The Conversation</h1>  welcome back User.getProfile */}
                    <p className='para'>Your forums:</p>
                    <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

                    {/* Profile Component HERE // not created yet // just a component with all their forums */}
                </div>
              </div>
            </div>
        );
    }
}



// if logged in, we need to see their currently owned forums (with profile component)
// and they can add a new forum with a modal (refetch queries)