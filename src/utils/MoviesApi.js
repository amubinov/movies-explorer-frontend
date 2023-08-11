class MoviesApi {

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialMovies() {
    return fetch(`${baseUrl}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => this._checkResponse(res));
  }


  getSavedMovies() {
    return fetch(`${baseUrl2}/movies`, {
      method: "GET",
      credentials: 'include',
      headers: {
        // "Origin": "https://amubinov.nomoredomains.xyz",
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => this._checkResponse(res));
  }

  // Добавление фильма в сохраненные
  saveMovie = (movie) => {
    return fetch(`${baseUrl2}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
      .then((result) => this._handlingResponse(result));
  }

  deleteMovie = (_id) => {
    return fetch(`${baseUrl2}/movies/${_id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        // "Origin": "https://amubinov.nomoredomains.xyz",
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => this._checkResponse(res));
  }
}
const moviesApi = new MoviesApi({
  // baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

const baseUrl = "https://api.nomoreparties.co/beatfilm-movies";
const baseUrl2 = "https://api.amubinov.nomoredomains.xyz";

export default moviesApi;
