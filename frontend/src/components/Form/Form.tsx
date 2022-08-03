import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { Validation } from "../../utils/Validation";
import "./Form.scss";

interface FormProps {
  buttonText: string;
  textDescription: string;
  textLink: string;
  handleSubmitForm: ({}) => void;
}

const Form: FC<FormProps> = ({ buttonText, textDescription, textLink, handleSubmitForm }) => {
  const { values, handleChange, errors, isValid } = Validation();
  const { pathname } = useLocation();

  function handleSubmit(evt: any) {
    evt.preventDefault();
    handleSubmitForm(values);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__input-container">
        <input
          type="text"
          name="username"
          autoComplete="off"
          minLength={2}
          maxLength={150}
          placeholder="Логин"
          className="form__input"
          required
          onChange={handleChange}
        />
        <span className="form__input-error">{errors.username}</span>
      </div>

      {pathname === "/signup" && (
        <div className="form__input-container">
          <input
            type="email"
            name="email"
            autoComplete="off"
            minLength={2}
            maxLength={30}
            placeholder="Email"
            className="form__input"
            required
            onChange={handleChange}
          />
          <span className="form__input-error">{errors.email}</span>
        </div>
      )}

      <div className="form__input-container">
        <input
          type="password"
          name="password"
          autoComplete="off"
          minLength={2}
          maxLength={30}
          placeholder="Пароль"
          className="form__input"
          required
          onChange={handleChange}
        />
        <span className="form__input-error">{errors.password}</span>
      </div>

      <button
        type="submit"
        className={`form__submit-button ${isValid && "form__submit-button_enabled"}`}
        disabled={!isValid}
      >
        {buttonText}
      </button>

      <p className="form__subtitle">
        {textDescription}
        <Link to={pathname === "/signin" ? "/signup" : "/signin"} className="form__link">
          {textLink}
        </Link>
      </p>
    </form>
  );
};

export default Form;
