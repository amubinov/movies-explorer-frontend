import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormValidation } from '../../utils/useFormValidation';
import '../Form/Form.css';


const Login = ({ onLogin, isLogged }) => {
  const { values, errors, handleChange } = useFormValidation();
  const errorClassName = (name) => `form__error form__error-login ${errors[name] ? 'form__error_visible' : ''}`
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate('/movies', { replace: true });
    }
  }, [isLogged, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values)
  }

  return (
    <section className="login form">
      <Link to="/" className="form__logo" alt="Логотип сайта"></Link>
      <h2 className="form__title">Рады видеть!</h2>
      <form className="form__container" onSubmit={handleSubmit}>
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
        <button className='form__button form__button-login'>Войти</button>
      </form>
      <p className="form__text">Ещё не зарегистрированы?
        <Link to="/signup" className="form__link">Регистрация</Link>
      </p>
    </section>
  );
};

export default Login;
