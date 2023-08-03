import './Profile.css';
import React, { useState } from 'react';
import Header from '../Header/Header';

function Profile(isLogged) {
  const [isEdit, setIsEdit] = useState(false);

  function handleClick() {
    setIsEdit(!isEdit);
  }

  return (
    <>
      <Header isLogged={isLogged} />
      <section className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form">
          <ul className="profile__form-container">
            <li className="profile__field-wrapper">
              <p className="profile__field-label">Имя</p>
              <input className={`profile__field ${isEdit ? "profile__field_editing" : "profile__field_not-editing"}`}
                placeholder="name"
                id='name'
                name='name'
                required={true}
                minLength={2}
                maxLength={40}
                disabled={!isEdit}
              />
            </li>
            <li className="profile__field-wrapper">
              <p className="profile__field-label">E-mail</p>
              <input className={`profile__field ${isEdit ? "profile__field_editing" : "profile__field_not-editing"}`}
                placeholder="email"
                type='email'
                id='email'
                name='email'
                required={true}
                minLength={2}
                maxLength={40}
                disabled={!isEdit}
              />
            </li>
          </ul>
          <div className="profile__buttons">
            <button className={`profile__button ${isEdit ? "profile__button_save" : "profile__button_edit"}`} type="submit" onClick={handleClick}>
              {isEdit ? "Сохранить" : "Редактировать"}
            </button>
            <button className="profile__button profile__button_signout" type="button">
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section >
    </>
  );
};

export default Profile;
