import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToHash from './components/ScrollToHash';
import Home from './pages/Home';
import Generate from './pages/Generate';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
