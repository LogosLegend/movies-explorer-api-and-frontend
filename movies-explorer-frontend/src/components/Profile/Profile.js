import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from '../../context/CurrentUserContext.js';
import { useInput } from '../../utils/FormValidation.js';
import { NAME_WRONG_LENGTH, EMAIL_NOT_FOUND, EMAIL_INCORRECT } from '../../utils/constants.js';

function Profile(props) {

  const currentUser = useContext(CurrentUserContext);
  const [fieldDisabled, setFieldDisabled] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const name = useInput(currentUser.name, {minMaxLength: {min: 2, max: 30}});
  const email = useInput(currentUser.email, {empty: true, email: true});

  useEffect(() => {

    if ((name.value !== currentUser.name || email.value !== currentUser.email) && name.inputValid && email.inputValid) {

      setButtonDisabled(false)

    } else {

      setButtonDisabled(true)
    }
  }, [name, email, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    setFieldDisabled(true)
    props.onProfile(name.value, email.value, setFieldDisabled)
  }

  return (
    <main className="content account">
      <section className="account__container">
        <h2 className="account__title">{`Привет, ${currentUser.name}!`}</h2>

        <form onSubmit={handleSubmit} className="account__form">
          <div className="account__info">
            <p className="account__name">Имя</p>
            <input className={`account__input ${(name.minMaxLength && name.isDirty) ? `account__input_type_error` : ``}`} required id="name" name="name" type="text" placeholder="Имя" minLength="2" maxLength="30" value={name.value} onChange={name.handleChange} onBlur={name.handleDirty} disabled={fieldDisabled ? true : ``}/>
            <span className={`error account__span-error ${(name.minMaxLength && name.isDirty) ? `visible` : ``}`}>{NAME_WRONG_LENGTH}</span>
          </div>

          <div className="account__info">
            <p className="account__name">E-mail</p>
            <input className={`account__input ${(email.email && email.isDirty) ? `account__input_type_error` : ``}`} required id="email" name="email" type="email" placeholder="E-mail" value={email.value} onChange={email.handleChange} onBlur={email.handleDirty} disabled={fieldDisabled ? true : ``}/>
            <span className={`error account__span-error ${(email.email && email.isDirty) ? `visible` : ``}`}>{email.empty ? EMAIL_NOT_FOUND : EMAIL_INCORRECT}</span>
          </div>

          <span className={`error ${props.success ? `account__success` : `account__error`}`}>{props.message}</span>
          <button className={`account__button account__submit-button button-without-styles button-hovered ${buttonDisabled || fieldDisabled ? `account__submit-button_disable` : ``}`} disabled={buttonDisabled || fieldDisabled ? true : ``}>Редактировать</button>
        </form>

        <button className="account__button account__exit-button button-without-styles button-hovered" onClick={props.onExit}>Выйти из аккаунта</button>
      </section>
    </main>
  );
}

export default Profile;
