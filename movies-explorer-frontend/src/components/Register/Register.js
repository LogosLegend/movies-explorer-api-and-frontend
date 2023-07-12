import { useState } from 'react';
import { useInput } from '../../utils/FormValidation.js';
import { NAME_WRONG_LENGTH, EMAIL_NOT_FOUND, EMAIL_INCORRECT, PASSWORD_NOT_FOUND } from '../../utils/constants.js';

function Register(props) {

  const [fieldDisabled, setFieldDisabled] = useState(false);

  const name = useInput('', {minMaxLength: {min: 2, max: 30}})
  const email = useInput('', {empty: true, email: true})
  const password = useInput('', {empty: true})

  function handleButtonDisabled() {
    return name.inputValid && email.inputValid && password.inputValid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFieldDisabled(true)
    props.onRegister(name.value, email.value, password.value, setFieldDisabled)
  }

  return(
    <main className="auth">
      <section className="auth__container">
        <h2 className="auth__title">Добро пожаловать!</h2>
        <form onSubmit={handleSubmit} className="auth__form">

          <div className="auth__input-container">
            <input className={`auth__input ${(name.minMaxLength && name.isDirty) ? `auth__input_type_error` : ``}`} required id="name" name="name" type="text" placeholder="Имя" minLength="2" maxLength="30" value={name.value} onChange={name.handleChange} onBlur={name.handleDirty} disabled={fieldDisabled ? true : ``}/>
            <label className="auth__label" htmlFor="name" title="Имя"></label>
            <span className={`error auth__span-error ${(name.minMaxLength && name.isDirty) ? `visible` : ``}`}>{NAME_WRONG_LENGTH}</span>
          </div>

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
          <button type="submit" className={`auth__button button-hovered ${!handleButtonDisabled() || fieldDisabled ? `auth__button_disable` : ``}`} disabled={!handleButtonDisabled() || fieldDisabled ? true : ``}>Зарегистрироваться</button>
        </form>

        <p className="auth__switch">Уже зарегистрированы? <button className="auth__switch-link button-without-styles button-hovered" onClick={props.onClickNavigateSignIn}>Войти</button>
        </p>
      </section>
    </main>
  );
}

export default Register;
