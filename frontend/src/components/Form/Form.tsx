import { FC } from "react";
import { useLocation } from "react-router-dom";
import { Validation } from "../../utils/Validation";
import "./Form.scss";
import { regExp } from "../../utils/constants";

interface FormProps {
  buttonText: string;
  handleSubmitForm: ({}) => void;
}

const Form: FC<FormProps> = ({ buttonText, handleSubmitForm }) => {
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
          className={`form__input ${errors.username && "form__input_error"}`}
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
            className={`form__input ${errors.email && "form__input_error"}`}
            pattern={regExp}
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
          className={`form__input ${errors.password && "form__input_error"}`}
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
    </form>
  );
};

export default Form;
