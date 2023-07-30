import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound'


function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);


  const checkToken = () => {

  };

  const handleLogin = (data) => {

  };

  const handleRegister = (data) => {
  };


  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main isLogged={!isLogged} />} />
        <Route path="/movies" element={<main><Movies isLogged={isLogged} /></main>} />
        <Route path="/saved-movies" element={<main><SavedMovies isLoggen={isLogged} /></main>} />
        <Route path="/profile" element={<main><Profile /></main>} />
        <Route path="/signin" element={isLogged ? <Navigate to="/" /> : <main><Login onLogin={handleLogin} /></main>} />
        <Route path="/signup" element={isLogged ? <Navigate to="/" /> : <main><Register onRegister={handleRegister} /></main>} />
        <Route path="*" element={<main><PageNotFound /></main>} />
      </Routes>
    </div>
  );
}

export default App;
