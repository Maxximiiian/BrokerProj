import React, { useState } from 'react';

export default function SearchPage({ authState }) {
  const [input, setInput] = useState({ body: '', authState });

  const changeHandler = (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const signInHandler = async (event) => {
    event.preventDefault();
    if (input.body !== '') {
      const response = await fetch('/api/v1/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
    }
  };
  return (
    <div className="mx-auto mt-5" style={{ width: '500px' }}>
      <div style={{ height: '50px' }} />
      <form className="container zalupa rounded-3 py-3 item" align="center" onSubmit={signInHandler}>
        <div className="mb-3">
          <h2>Enter the name of the company for which you want to find data.</h2>
          <input
            onChange={changeHandler}
            type="text"
            name="body"
            className="form-control"
            id="exampleInputBody1"
            placeholder="Enter your request"
          />
        </div>
        <button type="submit" className="btn btn-danger">Search!</button>
      </form>
    </div>
  );
}
