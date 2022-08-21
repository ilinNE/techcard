import { FC } from "react";
import { useForm } from "react-hook-form";
import { FeedbackParams } from "../../../../utils/Api";
import { regExp } from "../../../../utils/constants";
import { errorMessages } from "../../../../utils/textConstants";
import "./FeedbackForm.scss";

interface FormProps {
  buttonText: string;
  handleFeedback: (values: FeedbackParams) => void;
}

type FormInputs = {
  feedbackTitle: string;
  feedbackEmail: string;
  feedbackMessage: string;
};

const FeedbackForm: FC<FormProps> = ({ buttonText, handleFeedback }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormInputs>({ mode: "onChange" });

  const onSubmit = (data: FormInputs) => {
    handleFeedback({
      title: data.feedbackTitle,
      return_address: data.feedbackEmail,
      message: data.feedbackMessage,
    });
    reset();
  };

  return (
    <form className="feedback" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="feedback__header-container">
        <div className="feedback__user-info">
          <div className="feedback__input-container">
            <input
              type="text"
              {...register("feedbackTitle", {
                required: `${errorMessages.RequeredField}`,
                maxLength: {
                  value: 150,
                  message: `${errorMessages.FeedbackTitleMaxLength}`,
                },
                minLength: {
                  value: 2,
                  message: `${errorMessages.FeedbackTitleMinLength}`,
                },
              })}
              autoComplete="off"
              placeholder="Тема сообщения"
              className={`feedback__input ${errors?.feedbackTitle && "feedback__input_error"}`}
            />
            {errors?.feedbackTitle && (
              <span className="feedback__input-error">
                {errors?.feedbackTitle?.message || "Error!"}
              </span>
            )}
          </div>

          <div className="feedback__input-container">
            <input
              type="email"
              {...register("feedbackEmail", {
                required: `${errorMessages.RequeredField}`,
                pattern: {
                  value: new RegExp(regExp),
                  message: `${errorMessages.InvalidEmail}`,
                },
              })}
              className={`feedback__input ${errors?.feedbackEmail && "feedback__input_error"}`}
              autoComplete="off"
              placeholder="Email"
            />
            {errors?.feedbackEmail && (
              <span className="feedback__input-error">
                {errors?.feedbackEmail?.message || "Error!"}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`feedback__submit-button ${
            !(errors?.feedbackTitle || errors?.feedbackEmail || errors?.feedbackMessage) &&
            isValid &&
            "feedback__submit-button_enabled"
          }`}
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </div>

      <div className="feedback__input-container feedback__input-container_text">
        <textarea
          {...register("feedbackMessage", {
            required: `${errorMessages.RequeredField}`,
            maxLength: {
              value: 5000,
              message: `${errorMessages.FeedbackMessageMaxLength}`,
            },
            minLength: {
              value: 20,
              message: `${errorMessages.FeedbackMessageMinLength}`,
            },
          })}
          autoComplete="off"
          placeholder="Текст..."
          className={`feedback__input feedback__input_text ${
            errors?.feedbackMessage && "feedback__input_text-error"
          }`}
        ></textarea>
        {errors?.feedbackMessage && (
          <span className="feedback__input-error">
            {errors?.feedbackMessage?.message || "Error!"}
          </span>
        )}
      </div>
    </form>
  );
};

export default FeedbackForm;
