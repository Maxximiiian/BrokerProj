import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Main({ authState }) {
  const [input, setInput] = useState({ email: '', password: '' });

  const changeHandler = (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const signInHandler = async (event) => {
    event.preventDefault();
    // console.log(input);
    if (input.email !== '' && input.password !== '') {
      const response = await fetch('/api/v1/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
    }
  };
  return (
    <div className="mx-auto mt-5" style={{ width: '400px' }}>
      <div style={{ height: '50px' }} />

      {authState ? (
        <>
          <div className="mx-auto mt-5" style={{ width: '400px' }}>
            <form className="container zalupa rounded-3 py-3 item" align="center" onSubmit={signInHandler}>
              <div className="mb-3">
                <Link to="/search"><h2 className="charnews">Find the company you need</h2></Link>
              </div>
            </form>
          </div>
        </>
      ) : (
        <form className="container zalupa rounded-3 mt-3 item" align="center">
          <h2>To make requests, please log in to the app.</h2>
        </form>
      ) }

    </div>
  );
}
