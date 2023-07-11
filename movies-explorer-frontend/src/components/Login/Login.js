import { useInput } from '../../utils/FormValidation.js';

function Login(props) {

  const email = useInput('', {empty: true, email: true})
  const password = useInput('', {empty: true})

  function handleButtonDisabled() {
    return email.inputValid && password.inputValid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email.value, password.value)
  }

  return(
    <main className="auth">
      <section className="auth__container">
        <h2 className="auth__title">Рады видеть!</h2>
        <form onSubmit={handleSubmit} className="auth__form">

          <div className="auth__input-container">
            <input className={`auth__input ${(email.email && email.isDirty) ? `auth__input_type_error` : ``}`} required id="email" name="email" type="email" placeholder="E-mail" value={email.value} onChange={email.handleChange} onBlur={email.handleDirty}/>
            <label className="auth__label" htmlFor="email" title="E-mail"></label>
            <span className={`error auth__span-error ${(email.email && email.isDirty) ? `visible` : ``}`}>{email.empty ? `Введите адрес электронной почты` : `Неверный адрес электронной почты`}</span>
          </div>

          <div className="auth__input-container">
            <input className={`auth__input ${(password.empty && password.isDirty) ? `auth__input_type_error` : ``}`} required id="password" name="password" type="password" placeholder="Пароль" value={password.value} onChange={password.handleChange} onBlur={password.handleDirty}/>
            <label className="auth__label" htmlFor="password" title="Пароль"></label>
            <span className={`error auth__span-error ${(password.empty && password.isDirty) ? `visible` : ``}`}>Введите пароль</span>
          </div>

          <span className="error auth__error">{props.message}</span>
          <button type="submit" className={`auth__button button-hovered ${handleButtonDisabled() ? `` : `auth__button_disable`}`} disabled={handleButtonDisabled() ? `` : true}>Войти</button>
        </form>

        <p className="auth__switch">Ещё не зарегистрированы? <button className="auth__switch-link button-without-styles button-hovered" onClick={props.onClickNavigateSignUp}>Регистрация</button>
        </p>
      </section>
    </main>
  );
}

export default Login;