import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../utils/useFormValidation';
import '../Form/Form.css';


const Login = ({ handleLogin, isLoading, isLogged }) => {
  const { values, errors, reset, handleChange } = useFormValidation();
  const errorClassName = (name) => `form__error form__error-login ${errors[name] ? 'form__error_visible' : ''}`
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => reset({}, {}, false), []);

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values)
  }

  const handleFormValid = useCallback((event) => {
    setIsFormValid(event.target.closest('form').checkValidity());
  }, []);




  return (
    <section className="login form">
      <Link to="/" className="form__logo" alt="Логотип сайта"></Link>
      <h2 className="form__title">Рады видеть!</h2>
      <form className="form__container" onSubmit={handleSubmit}
        onChange={handleFormValid} isloading={isLoading.toString()}>
        <fieldset className="form__wrapper form__wrapper-login">
          <label className="form__label">
            <p className="form__text-label">E-mail</p>
            <input
              className='form__input'
              id='emailInput'
              name="email"
              type="email"
              placeholder="E-mail"
              value={values.email || ''}
              required={true}
              onChange={handleChange}
              pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$"
            />
            <span className={errorClassName('email')} id="emailInput-error">{errors['email']}</span>
          </label>

          <label className="form__label">
            <p className="form__text-label">Пароль</p>
            <input
              className='form__input'
              id='passwordInput'
              name="password"
              type="password"
              minLength={4}
              maxLength={40}
              placeholder="Пароль"
              value={values.password || ''}
              onChange={handleChange}
              required={true}
            />
            <span className={errorClassName('password')} id="passwordInput-error">{errors['password']}</span>
          </label>
        </fieldset>
        <button
          className={`form__button form__button-login ${isFormValid ? '' : 'form__button_disabled'} `}
          disabled={!isFormValid}>Войти</button>
      </form>
      <p className="form__text">Ещё не зарегистрированы?
        <Link to="/signup" className="form__link">Регистрация</Link>
      </p>
    </section>
  );
};

export default Login;
