import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [customError, setCustomError] = useState(''); // Initialize custom error state

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      if (e.message.includes('is shorter than the minimum allowed length')) {
        // Handle password too short error
        setCustomError('Password must be at least 5 characters long.');
      } else if (e.message.includes('duplicate key error collection')) {
        // Handle duplicate username error
        setCustomError('Username already exists. Please choose a different username.');
      } else {
        console.error(e);
      }
    }
  };

  return (
    <main style={{ display: 'flex', justifyContent: 'center', marginTop: '60px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div>
          <h2 style={{ marginBottom: '20px' }}>Sign Up</h2>
          <form
            style={{ marginRight: '0', border: '4px solid black', boxShadow: '10px 10px 10px black' }}
            onSubmit={handleFormSubmit}
          >
            <input
              placeholder="Your username"
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
            />
            <input
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button style={{ cursor: 'pointer' }} type="submit">
              Submit
            </button>
          </form>

          {data ? (
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : null}
        </div>
        
        {/* Error message container */}
        {customError && (
          <div style={{ color: 'white', marginTop: '10px', textAlign: 'center' }}>
            {customError}
          </div>
        )}

        {error && !customError && (
          <div style={{ color: 'white', marginTop: '10px', textAlign: 'center' }}>
            {error.message}
          </div>
        )}
      </div>
    </main>
  );
};

export default Signup;
