import { useState } from 'react';
import { useInput } from '../../utils/FormValidation.js';
import { EMAIL_NOT_FOUND, EMAIL_INCORRECT, PASSWORD_NOT_FOUND } from '../../utils/constants.js';

function Login(props) {

  const [fieldDisabled, setFieldDisabled] = useState(false);

  const email = useInput('', {empty: true, email: true})
  const password = useInput('', {empty: true})

  function handleButtonDisabled() {
    return email.inputValid && password.inputValid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFieldDisabled(true)
    props.onLogin(email.value, password.value, setFieldDisabled)
  }

  return(
    <main className="auth">
      <section className="auth__container">
        <h2 className="auth__title">Рады видеть!</h2>
        <form onSubmit={handleSubmit} className="auth__form">

          <div className="auth__input-container">
            <input className={`auth__input ${(email.email && email.isDirty) ? `auth__input_type_error` : ``}`} required id="email" name="email" type="email" placeholder="E-mail" value={email.value} onChange={email.handleChange} onBlur={email.handleDirty} disabled={fieldDisabled ? true : ``}/>
            <label className="auth__label" htmlFor="email" title="E-mail"></label>
            <span className={`error auth__span-error ${(email.email && email.isDirty) ? `visible` : ``}`}>{email.empty ? EMAIL_NOT_FOUND : EMAIL_INCORRECT}</span>
          </div>

          <div className="auth__input-container">
            <input className={`auth__input ${(password.empty && password.isDirty) ? `auth__input_type_error` : ``}`} required id="password" name="password" type="password" placeholder="Пароль" value={password.value} onChange={password.handleChange} onBlur={password.handleDirty} disabled={fieldDisabled ? true : ``}/>
            <label className="auth__label" htmlFor="password" title="Пароль"></label>
            <span className={`error auth__span-error ${(password.empty && password.isDirty) ? `visible` : ``}`}>{PASSWORD_NOT_FOUND}</span>
          </div>

          <span className="error auth__error">{props.message}</span>
          <button type="submit" className={`auth__button button-hovered ${!handleButtonDisabled() || fieldDisabled ? `auth__button_disable` : ``}`} disabled={!handleButtonDisabled() || fieldDisabled ? true : ``}>Войти</button>
        </form>

        <p className="auth__switch">Ещё не зарегистрированы? <button className="auth__switch-link button-without-styles button-hovered" onClick={props.onClickNavigateSignUp}>Регистрация</button>
        </p>
      </section>
    </main>
  );
}

export default Login;
