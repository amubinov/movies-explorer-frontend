import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import moviesApi from '../../utils/MoviesApi';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile';
import Preloader from '../Movies/Preloader/Preloader';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound'
import Popup from "../Popup/Popup";
import { ProtectedRoutes } from '../ProtectedRoute/ProtectedRoutes';
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CurrentSavedMoviesContext } from '../../contexts/CurrentSavedMoviesContext';
import { useNavigate } from 'react-router-dom';
import "./App.css";


function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentMovies, setCurrentMovies] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (isLogged) {
      mainApi.getUserInfo()
        .then((data) => setCurrentUser(data))
        .catch(error => console.log(error));
    }
  }, [isLogged]);


  // Получение сохраненных фильмов
  useEffect(() => {
    if (isLogged) {
      moviesApi.getSavedMovies()
        .then((savedMovies) => setCurrentMovies(savedMovies))
        .catch(error => console.log(error));
    }
  }, [isLogged]);


  useEffect(() => {
    checkToken();
  }, []);


  const checkToken = () => {
    mainApi.checkToken()
      .then((res) => {
        if (res) {
          setIsLogged(true);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleLogin = (data) => {
    mainApi.logIn(data)
      .then((res) => {
        if (res._id) {
          localStorage.setItem('_id', res._id);
          setIsLogged(true);
          setIsPopupOpen(true);
          setPopupMessage(`Вы вошли в аккаунт!`);
          navigate("/movies", { replace: true });
        };
      })
      .catch(err => {
        if (err) {
          setIsPopupOpen(true);
          setPopupMessage("Неправильный e-mail или пароль");
        }
      })
  };

  const handleRegister = (data) => {
    mainApi.register(data)
      .then(res => {
        if (res._id) {
          handleLogin(data);
          setIsPopupOpen(true);
          setPopupMessage(`Регистрация прошла успешно!`);
          navigate("/movies", { replace: true });
        }
      })
      .catch(err => {
        if (err) {
          setIsPopupOpen(true);
          setPopupMessage("Пользователь с таким email уже зарегистрирован");
        }
        else {
          setPopupMessage(`Ошибка регистрации: ${err}`);
        }
      });
  };

  const onUpdateUser = (items) => {
    mainApi.updateUserInfo(items)
      .then((data) => {
        setCurrentUser(data);
        setIsPopupOpen(true);
        setPopupMessage("Вы обновили профиль!")

      })
      .catch((err) => {
        if (err) {
          setIsPopupOpen(true);
          setPopupMessage("Ошибка! Данный e-mail уже используется")
        }
      });
  };


  const logOut = () => {
    mainApi.logOut()
      .then(() => {
        localStorage.clear();
        setIsLogged(false);
        setCurrentUser({});
        setCurrentMovies([]);
        setIsPopupOpen(true);
        setPopupMessage("Вы вышли из аккаунта!");
        navigate("/", { replace: true });
      })
      .catch(() => {
        setIsPopupOpen(true);
        setPopupMessage("На сервере произошла ошибка!")
      });
  }


  const closePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  }

  function onClickDeleteMovie(id) {
    moviesApi.deleteMovie(id)
      .then((result) => {
        if (result._id) setCurrentMovies((prev) => prev.filter((item) => item._id !== id));
      })
      .catch(err => console.log(err))
  };


  function onClickSaveMovie(movie, action, id) {
    if (action === 'delete') {
      onClickDeleteMovie(id);
      return;
    }
    const savedMovie = {
      ...movie,
      image: movie.image ? `https://api.nomoreparties.co${movie.image.url}` : '',
      thumbnail: movie.image && movie.image.formats.thumbnail
        ? `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
        : '',
    };
    savedMovie.movieId = savedMovie.id;
    delete savedMovie.created_at;
    delete savedMovie.updated_at;
    delete savedMovie.id;
    moviesApi.saveMovie(savedMovie)
      .then((result) => {
        if (result._id) setCurrentMovies((prev) => [...prev, result]);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  };



  if (loading) {
    return <Preloader />;
  }

  const updateSavedMovies = (movieId, movie) => {
    if (movieId) {
      const updatedMovies = currentMovies.filter(item => item.movieId !== movieId);
      setCurrentMovies(updatedMovies);
    } else {
      setCurrentMovies([...currentMovies, movie]);
    }
  };


  const handleMovieButtonClick = (movie, action, movieId) => {

    if (action === 'save') {
      moviesApi.saveMovie({

      })
        .then((savedMovie) => {
          updateSavedMovies(savedMovie._id, savedMovie); // Передаем savedMovie
        })
        .catch((error) => {
        });
    } else if (action === 'delete') {
      moviesApi.deleteMovie(movieId)
        .then(() => {
          updateSavedMovies(movieId); // Вызов функции обновления
        })
        .catch((error) => {

        });
    }
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentSavedMoviesContext.Provider value={currentMovies}>
        <div className="app">
          <Routes>
            <Route
              exact
              path="/"
              element={<Main isLogged={!isLogged} />}
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoutes isLogged={isLogged}>
                  <Movies
                    isLogged={isLogged}
                    onClickSaveMovie={onClickSaveMovie}
                    updateSavedMovies={updateSavedMovies}
                    handleMovieButtonClick={handleMovieButtonClick}
                  />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoutes isLogged={isLogged}>
                  <SavedMovies
                    isLogged={isLogged}
                    onClickDeleteMovie={onClickDeleteMovie}
                  />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes isLogged={isLogged}>
                  <Profile
                    isLoading={isLoading}
                    isLogged={isLogged}
                    updateUser={onUpdateUser}
                    logOut={logOut}
                  />
                </ProtectedRoutes>

              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  isLogged={isLogged}
                  isLoading={isLoading}
                  handleRegister={handleRegister}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  isLogged={isLogged}
                  isLoading={isLoading}
                  handleLogin={handleLogin}
                />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          {isPopupOpen && <Popup
            isOpen={isPopupOpen}
            popupMessage={popupMessage}
            onClick={closePopup}
          />}
        </div>
      </CurrentSavedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
