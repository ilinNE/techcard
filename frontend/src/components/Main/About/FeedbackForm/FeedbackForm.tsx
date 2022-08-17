import { FC } from "react";
import { useForm } from "react-hook-form";
import { regExp } from "../../../../utils/constants";
// import { Validation } from "../../../../utils/Validation";
import { errorMessages } from "../../../../utils/textConstants";

import "./FeedbackForm.scss";

interface FormProps {
  buttonText: string;
  handleFeedback: (values: any) => void;
}

type FormInputs = {
  feedbackTitle: string;
  feedbackEmail: string;
  feedbackMessage: string;
};

const FeedbackForm: FC<FormProps> = ({ buttonText, handleFeedback }) => {
  // const { values, handleChange, errors, isValid } = Validation();
  // function handleSubmit(evt: any) {
  //   evt.preventDefault();
  //   handleFeedback(values);
  // }

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm<FormInputs>();


  const onSubmit = (data: FormInputs) => {
    const feedback = JSON.stringify({
      title: data.feedbackTitle,
      return_address: data.feedbackEmail,
      message: data.feedbackMessage
    });
    handleFeedback(feedback)
    console.log(feedback)
  }

  console.log(errors)

  return (
    <form className="feedback" onSubmit={handleSubmit(onSubmit)}>
      <div className="feedback__header-container">
        <div className="feedback__user-info">
          <div className="feedback__input-container">
            <input
              type="text"
              {...register("feedbackTitle", {
                required: `${errorMessages.RequeredField}`,
                maxLength: {
                  value: 150,
                  message: `${errorMessages.FeedbackMaxLength}`
                },
                minLength: {
                  value: 1,
                  message: `${errorMessages.FeedbackMinLength}`
                },
              }
              )}
              autoComplete="off"
              placeholder="Имя"
              className={`feedback__input ${errors?.feedbackTitle && "feedback__input_error"}`}
            />
            {errors?.feedbackTitle && <span className="feedback__input-error">{errors?.feedbackTitle?.message || "Error!"}</span>}
          </div>

          <div className="feedback__input-container">
            <input
              type="email"
              {...register("feedbackEmail", {
                required: `${errorMessages.RequeredField}`,
                maxLength: {
                  value: 30,
                  message: `${errorMessages.FeedbackMaxLength}`
                },
                minLength: {
                  value: 1,
                  message: `${errorMessages.FeedbackMinLength}`
                },
                pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA_Z]{2,63}$/, //${regExp}
              }
              )}
              className={`feedback__input ${errors?.feedbackEmail && "feedback__input_error"}`}
              autoComplete="off"
              placeholder="Email"
            />
            {errors?.feedbackEmail && <span className="feedback__input-error">{errors?.feedbackEmail?.message || "Error!"}</span>}
          </div>
        </div>

        <button
          type="submit"
          className={`feedback__submit-button ${!errors && "feedback__submit-button_enabled"}`}
        >
          {buttonText}
        </button>
      </div>

      <div className="feedback__input-container feedback__input-container_text">
        <textarea
          {...register("feedbackMessage", {
            required: `${errorMessages.RequeredField}`,
            maxLength: {
              value: 150,
              message: `${errorMessages.FeedbackMaxLength}`
            },
            minLength: {
              value: 1,
              message: `${errorMessages.FeedbackMinLength}`
            },
          }
          )}
          autoComplete="off"
          placeholder="Текст..."
          className={`feedback__input feedback__input_text ${errors?.feedbackMessage && "feedback__input_text-error"}`}
        ></textarea>
        {errors?.feedbackMessage && <span className="feedback__input-error">{errors?.feedbackMessage?.message || "Error!"}</span>}
      </div>
    </form>
  );
};

export default FeedbackForm;
