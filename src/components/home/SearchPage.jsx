import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchPage({ authState, setSymbol }) {
  const [input, setInput] = useState({ body: '', authState });
  const [match, setMatch] = useState(null);

  const changeHandler = (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // const clickHandler = (e) => {
  //   setSymbol;
  // };

  const signInHandler = async (event) => {
    event.preventDefault();
    if (input.body.length >= 3) {
      const response = await fetch('/api/v1/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      setMatch(data);
      console.log(data);
    } else { alert('Input requires minimum 3 letters'); }
  };
  return (
    <div className="mx-auto mt-5 pt-3">
      <form className="container w-50 zalupa rounded-3 mt-3 py-3 item" align="center" onSubmit={signInHandler}>
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
      <div className="container w-75">
        <div className="row">
          {match === null ? <></>
            : match.length === 0 ? (
              <div className="container zalupa rounded-3 mt-3 py-3 item">
                Unfortunately, no matches were found for your request, please check your request.
              </div>
            )
              : (
                match.map((el) => (
                  <div className="col-sm" key={el.id}>
                    <div className="zalupa rounded-3 mt-3 py-3 mx-auto item">
                      <h2 className="text-center">{el.name}</h2>
                      <Link to="/" onClick={() => setSymbol(el.symbol)}><h2 className="text-center">{el.symbol}</h2></Link>
                    </div>
                  </div>
                ))
              )}
        </div>
      </div>

    </div>
  );
}
