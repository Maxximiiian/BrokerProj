import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Main({ authState, symbol }) {
  const [companyData, setCompanyData] = useState('');

  console.log(symbol);

  useEffect(() => {
    fetch('/api/v1/companydata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol }),
    });
    // .then((res) => res.json())
    // .then((data) => setCompanyData(data));
  }, []);

  return (
    <div className="mx-auto mt-5" style={{ width: '400px' }}>
      <div style={{ height: '50px' }} />

      {authState ? (
        <>
          <div className="mx-auto mt-5" style={{ width: '400px' }}>
            <form className="container zalupa rounded-3 py-3 item" align="center">
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
