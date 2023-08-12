
class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse = res =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);

  register = (items) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: 'include',
      headers: {
        // "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: items.name,
        email: items.email,
        password: items.password,
      })

    })
      .then(res => this._checkResponse(res))
  };

  logIn = ({ email, password }) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: {
        // "Origin": "https://amubinov.nomoredomains.xyz",
        // "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
      .then(res => this._checkResponse(res))
  }

  logOut = () => {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      credentials: "include",
      headers: {
        // "Origin": "https://amubinov.nomoredomains.xyz",
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(res => this._checkResponse(res))
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        // "Origin": "https://amubinov.nomoredomains.xyz",
        "Content-Type": "application/json",
      },
    })
      .then(res => this._checkResponse(res))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    }).then(this._checkResponse).then((res) => res);
  }

  updateUserInfo(items) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: items.name,
        email: items.email
      }),
    }).then(res => this._checkResponse(res));
  }

}

const mainApi = new MainApi({
  // baseUrl: 'http://localhost:3001',
  baseUrl: 'https://api.amubinov.nomoredomains.xyz',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default mainApi;
