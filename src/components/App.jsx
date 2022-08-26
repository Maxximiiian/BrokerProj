import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Auth from './auth/Auth';
import NotAuth from './auth/NotAuth';
import Registration from './auth/Registration';
import Main from './home/Main';
import SearchPage from './home/SearchPage';
import Navbar from './navbar/Navbar';

function App({ userSession }) {
  const [authState, setAuthState] = useState(userSession || null);

  const [symbol, setSymbol] = useState('IVV');

  return (
    <>
      <Navbar authState={authState} setAuthState={setAuthState} />
      <Routes>
        <Route path="/" element={<Main authState={authState} symbol={symbol} />} />
        <Route path="/auth" element={<Auth authState={authState} setAuthState={setAuthState} />} />
        <Route path="/registration" element={<Registration authState={authState} setAuthState={setAuthState} />} />
        <Route path="/notauth" element={<NotAuth authState={authState} />} />
        <Route path="/search" element={<SearchPage authState={authState} setSymbol={setSymbol} />} />
      </Routes>
    </>
  );
}

export default App;
