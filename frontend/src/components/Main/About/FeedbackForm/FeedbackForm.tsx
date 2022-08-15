import { FC, useState } from "react";
import { Validation } from "../../../../utils/Validation";
import "./FeedbackForm.scss";

interface FormProps {
  buttonText: string;
  handleFeedback: (values: any) => void;
}

const FeedbackForm: FC<FormProps> = ({ buttonText, handleFeedback }) => {
  const { values, handleChange, errors, isValid } = Validation();

  function handleSubmit(evt: any) {
    evt.preventDefault();
    handleFeedback(values);
  }

  return (
    <form className="feedback" onSubmit={handleSubmit}>
      <div className="feedback__header-container">
        <div className="feedback__user-info">
          <div className="feedback__input-container">
            <input
              type="text"
              name="title"
              autoComplete="off"
              minLength={1}
              maxLength={150}
              placeholder="Имя"
              className={`feedback__input ${errors.title && "feedback__input_error"}`}
              required
              onChange={handleChange}
            />
            <span className="feedback__input-error">{errors.title}</span>
          </div>

          <div className="feedback__input-container">
            <input
              type="email"
              name="return_address"
              autoComplete="off"
              minLength={1}
              maxLength={30}
              placeholder="Email"
              className={`feedback__input ${errors.return_address && "feedback__input_error"}`}
              required
              onChange={handleChange}
            />
            <span className="feedback__input-error">{errors.return_address}</span>
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
          name="message"
          autoComplete="off"
          minLength={1}
          maxLength={150}
          placeholder="Текст..."
          className={`feedback__input feedback__input_text ${
            errors.message && "feedback__input_text-error"
          }`}
          required
          onChange={handleChange}
        ></textarea>
        <span className="feedback__input-error">{errors.message}</span>
      </div>
    </form>
  );
};

export default FeedbackForm;
