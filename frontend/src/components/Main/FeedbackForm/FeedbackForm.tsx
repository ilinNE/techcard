import { FC } from "react";
import { Validation } from "../../../utils/Validation";
import "./FeedbackForm.scss";

interface FormProps {
  buttonText: string;
}

const FeedbackForm: FC<FormProps> = ({ buttonText }) => {
  const { values, handleChange, errors, isValid } = Validation();

  function handleSubmit(evt: any) {
    evt.preventDefault();
    handleSubmitForm(values);
  }

  const handleSubmitForm = (values: any) => {
    // Api.register(values)
    //   .then((data) => {
    //     alert("Регистрация пользователя " + data.username + " прошла успешно");
    //     navigate("/dishes");
    //   })
    //   .catch((error) => console.error(error));
  };

  return (
    <form className="feedback" onSubmit={handleSubmit}>
      <div className="feedback__header-container">
        <div className="feedback__user-info">
          <div className="feedback__input-container">
            <input
              type="text"
              name="username"
              autoComplete="off"
              minLength={2}
              maxLength={150}
              placeholder="Имя"
              className="feedback__input"
              required
              onChange={handleChange}
            />
            <span className="feedback__input-error">{errors.username}</span>
          </div>

          <div className="feedback__input-container">
            <input
              type="email"
              name="email"
              autoComplete="off"
              minLength={2}
              maxLength={30}
              placeholder="Email"
              className="feedback__input"
              required
              onChange={handleChange}
            />
            <span className="feedback__input-error">{errors.email}</span>
          </div>
        </div>

        <button
          type="submit"
          className={`feedback__submit-button ${isValid && "feedback__submit-button_enabled"}`}
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </div>

      <div className="feedback__input-container feedback__input-container_text">
        <textarea
          name="text"
          autoComplete="off"
          minLength={2}
          // maxLength={150}
          placeholder="Текст..."
          className="feedback__input feedback__input_text"
          required
          onChange={handleChange}
        ></textarea>
        <span className="feedback__input-error">{errors.text}</span>
      </div>
    </form>
  );
};

export default FeedbackForm;
