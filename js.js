import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormValidation } from '../../utils/useFormValidation';
import Header from '../Header/Header';
import './Profile.css';


function Profile({ isLogged, logOut, changeProfile, isLoading }) {
  const [isEdit, setIsEdit] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, setErrors, isValid, setValue, setIsValid } = useFormValidation();
  // const [isEditing, setIsEditing] = useState(false);
  const [isFormModified, setIsFormModified] = useState(false);

  const errorClassName = (name) => `profile__error ${errors[name] ? 'profile__error_visible' : ''}`


  function handleClick() {
    setIsEdit(!isEdit);
  }


  useEffect(() => {
    setIsFormModified(
      (currentUser.name !== values.userName || currentUser.email !== values.userEmail) &&
      isValid
    );
  }, [values, currentUser, isValid]);


  useEffect(() => {
    if (currentUser) {
      setValue("userName", currentUser.name);
      setValue("userEmail", currentUser.email);

    }
    if (currentUser.name && currentUser.email) {
      setIsValid(true);
    }
  }, [currentUser, setValue, setIsValid]);


  function handleChange(e) {
    const { name, value } = e.target;
    setValue(name, value);
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsFormModified(value !== currentUser[name]);
  }

  function handleLogout(e) {
    e.preventDefault();
    logOut();
  }
  return (
    <>
      <Header isLogged={isLogged} />
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form">
          <ul className="profile__form-container">
            <li className="profile__field-wrapper">
              <p className="profile__field-label">Имя</p>
              <input className={`profile__field ${isEdit ? "profile__field_editing" : "profile__field_not-editing"}`}
                placeholder="name"
                name='name'
                id='nameInput'
                required={true}
                minLength={2}
                maxLength={40}
                disabled={!isEdit}
                onChange={(e) => { handleChange(e) }}
                value={values['userName'] ?? ''}
              />
            </li>
            <span className={errorClassName('userName')} id="nameInput-error">{errors['userName']}</span>
          </ul>
          <div className="profile__buttons">
            <button className={`profile__button ${isEdit ? "profile__button_save" : "profile__button_edit"}`} type="submit" onClick={handleClick}>
              {isEdit ? "Сохранить" : "Редактировать"}
            </button>
            <button className="profile__button profile__button_signout" type="button" onClick={handleLogout}>
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section >
    </>
  );
};

export default Profile;

Привет.нужно сделать так, чтобы при клике на кнопку "Выйти из аккаунта" была переадресация на главную страницу "/"
