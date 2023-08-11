import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormValidation } from '../../utils/useFormValidation';
import Header from '../Header/Header';
import './Profile.css';


function Profile({ isLogged, logOut, updateUser }) {
  const [isEdit, setIsEdit] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, setErrors, isValid, setValue, setIsValid } = useFormValidation();
  const [isFormChange, setIsFormChange] = useState(false);

  const errorClassName = (name) => `profile__error ${errors[name] ? 'profile__error_visible' : ''}`

  useEffect(() => {
    setIsFormChange(
      (currentUser.name !== values.name || currentUser.email !== values.email) &&
      isValid
    );
  }, [values, currentUser, isValid]);


  useEffect(() => {
    setIsFormChange(
      (currentUser.name !== values.name || currentUser.email !== values.email) &&
      isValid
    );
  }, [values, currentUser, isValid]);


  function handleSubmit(e) {
    e.preventDefault();
    updateUser({
      name: values['name'],
      email: values['email']
    });
    setIsEdit(false);
  }

  useEffect(() => {
    if (currentUser) {
      setValue("name", currentUser.name);
      setValue("email", currentUser.email);

    }
    if (currentUser.name && currentUser.email) {
      setIsValid(true);
    }
  }, [currentUser, setValue, setIsValid]);

  function handleClick(e) {
    e.preventDefault();
    if (isEdit && isValid) {
      handleSubmit(e);
    } else {
      setIsEdit(!isEdit);
      if (!isEdit) {
        setValue("name", currentUser.name);
        setValue("email", currentUser.email);
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValue(name, value);
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsFormChange(value !== currentUser[name]);
  }

  function handleSignOut(e) {
    e.preventDefault();
    logOut();

  }

  return (
    <>
      <Header isLogged={isLogged} />
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
          <ul className="profile__form-container">
            <li className="profile__field-wrapper">
              <p className="profile__field-label">Имя</p>
              <input className={`profile__field ${isEdit ? "profile__field_edit" : "profile__field_disabled"}`}
                placeholder="name"
                name='name'
                id='nameInput'
                required={true}
                minLength={2}
                maxLength={40}
                disabled={!isEdit}
                onChange={(e) => { handleChange(e) }}
                value={values['name'] ?? ''}
              />
            </li>
            <span className={errorClassName('name')} id="nameInput-error">{errors['name']}</span>

            <li className="profile__field-wrapper">
              <p className="profile__field-label">E-mail</p>
              <input className={`profile__field ${isEdit ? "profile__field_edit" : "profile__field_disabled"}`}
                placeholder="email"
                type='email'
                id='emailInput'
                name='email'
                required={true}
                minLength={2}
                maxLength={40}
                disabled={!isEdit}
                onChange={(e) => { handleChange(e) }}
                value={values['email'] ?? ''}
              />
            </li>
            <span className={errorClassName('email')} id="emailInput-error">{errors['email']}</span>

          </ul>
          <div className="profile__buttons">

            {!isEdit ? (
              <button
                className="profile__button profile__button_edit"
                type="button"
                onClick={handleClick}
              >
                Редактировать
              </button>
            ) : (
              <button
                className={`profile__button ${isFormChange && isValid ? "profile__button_save" : "profile__button_disabled"}`}
                type="submit"
                disabled={!isFormChange || !isValid}
              >
                Сохранить
              </button>
            )}
            <button className="profile__button profile__button_signout" type="button" onClick={handleSignOut}>
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section >
    </>
  );
};

export default Profile;
