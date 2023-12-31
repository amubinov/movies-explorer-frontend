import { Link } from 'react-router-dom';
import { useFormValidation } from '../../utils/useFormValidation';
import '../Form/Form.css';


function Register({ onRegister }) {

  const { values, errors, handleChange } = useFormValidation();
  const errorClassName = (name) => `form__error ${errors[name] ? 'form__error_visible' : ''}`

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values)
  }


  return (
    <section className="register form">
      <Link to="/" className="form__logo" alt="Логотип сайта"></Link>
      <h1 className="form__title">Добро пожаловать!</h1>
      <form className="form__container" onSubmit={handleSubmit}>
        <fieldset className="form__wrapper">
          <label className="form__label">
            <p className="form__text-label">Имя</p>
            <input
              className="form__input"
              id='nameInput'
              name="name"
              type="text"
              placeholder="Имя"
              minLength={2}
              maxLength={30}
              required={true}
              value={values.name || ''}
              onChange={handleChange}
              pattern="^[a-zA-ZА-Яа-яЁё\s\-]+$"
            />
            <span className={errorClassName('name')} id="nameInput-error">{errors['name']}</span>

          </label>
          <label className="form__label">
            <p className="form__text-label">E-mail</p>
            <input
              className={'form__input'}
              id='emailInput'
              name="email"
              type="email"
              placeholder="E-mail"
              value={values.email || ''}
              onChange={handleChange}
              required={true}
              pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$"
            />
            <span className={errorClassName('email')} id="emailInput-error">{errors['email']}</span>

          </label>
          <label className="form__label">
            <p className="form__text-label">Пароль</p>
            <input
              className={'form__input form__input_error'}
              name="password"
              id='passwordInput'
              type="password"
              minLength={4}
              maxLength={40}
              placeholder="Пароль"
              value={values.password || ''}
              onChange={handleChange}
              required={true}
            />
            <span className={errorClassName('password')} id="passwordInput-error">{errors['password']}Что-то пошло не так...</span>

          </label>
        </fieldset>

        <button
          className="form__button"
          type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="form__text">Уже зарегистрированы?
        <Link to="/signin" className='form__link'>Войти</Link></p>
    </section>
  );
};

export default Register;
