import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Registration({ authState, setAuthState }) {
  // console.log(authState);

  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '', name: '', password: '', repeat: '',
  });
  const changeHandler = (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const signUpHandler = async (event) => {
    event.preventDefault();
    if (input.email !== '' && input.password !== '') {
      if (input.password === input.repeat) {
        const response = await fetch('/api/v1/registration', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });
        if (response.ok) {
          const data = await response.json();
          setAuthState(data);
          navigate('/');
        }
      } else {
        alert('Повторите ввод');
        setInput({
          email: '', name: '', password: '', repeat: '',
        });
      }
    } else {
      alert('Введи хоть че-нибудь!');
      setInput({
        email: '', name: '', password: '', repeat: '',
      });
    }
  };

  return (
    <div className="mx-auto mt-5" style={{ width: '400px' }}>
      <div style={{ height: '150px' }} />
      <form onSubmit={signUpHandler} className="container zalupa rounded-3 py-3 item" align="center">
        <div className="mb-3">
          <h2>Email</h2>
          <input
            onChange={changeHandler}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <h2>Your Name</h2>
          <input
            value={input.name}
            onChange={changeHandler}
            type="name"
            name="name"
            className="form-control"
            id="exampleInputName1"
            placeholder="Name"
          />
        </div>
        <div className="mb-3">
          <h2>Your Password</h2>
          <input
            value={input.password}
            onChange={changeHandler}
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="mb-3">
          <h2>Please repeat password</h2>
          <input
            value={input.repeat}
            onChange={changeHandler}
            type="password"
            name="repeat"
            className="form-control"
            id="exampleInputPassword2"
            placeholder="Repeat Password"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-danger">Sign Up!</button>
          <div className="pt-3">
            <Link to="/" className="btn btn-outline-danger float-left">←Back to Auth</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
