import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormParams } from "../../utils/Api";
import { regExp } from "../../utils/constants";
import { errorMessages } from "../../utils/textConstants";
import "./Form.scss";

interface FormProps {
  buttonText: string;
  handleSubmitForm: (values: FormParams) => void;
}

type FormInputs = {
  login: string;
  email: string;
  password: string;
};

const Form: FC<FormProps> = ({ buttonText, handleSubmitForm }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormInputs>({ mode: "onChange" });

  const { pathname } = useLocation();

  function onSubmit(data: FormInputs) {
    handleSubmitForm({
      username: data.login,
      email: data.email,
      password: data.password,
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form__input-container">
        <input
          type="text"
          {...register("login", {
            required: `${errorMessages.RequeredField}`,
            maxLength: {
              value: 30,
              message: `${errorMessages.loginMaxLength}`,
            },
            minLength: {
              value: 6,
              message: `${errorMessages.loginMinLength}`,
            },
          })}
          autoComplete="off"
          placeholder="Логин"
          className={`form__input ${errors.login && "form__input_error"}`}
        />
        {errors.login && (
          <span className="form__input-error">{errors.login.message || "Error!"}</span>
        )}
      </div>

      {pathname === "/signup" && (
        <div className="form__input-container">
          <input
            type="email"
            {...register("email", {
              required: `${errorMessages.RequeredField}`,
              pattern: {
                value: new RegExp(regExp),
                message: `${errorMessages.InvalidEmail}`,
              },
            })}
            autoComplete="off"
            placeholder="Email"
            className={`form__input ${errors.email && "form__input_error"}`}
          />
          {errors.email && (
            <span className="form__input-error">{errors.email.message || "Error!"}</span>
          )}
        </div>
      )}

      <div className="form__input-container">
        <input
          type="password"
          {...register("password", {
            required: `${errorMessages.RequeredField}`,
            maxLength: {
              value: 30,
              message: `${errorMessages.passwordMaxLength}`,
            },
            minLength: {
              value: 8,
              message: `${errorMessages.passwordMinLength}`,
            },
          })}
          autoComplete="off"
          placeholder="Пароль"
          className={`form__input ${errors.password && "form__input_error"}`}
        />
        {errors.password && (
          <span className="form__input-error">{errors.password.message || "Error!"}</span>
        )}
      </div>

      <button
        type="submit"
        className={`form__submit-button ${
          !(errors?.login || errors?.email || errors?.password) &&
          isValid &&
          "form__submit-button_enabled"
        }`}
        disabled={!isValid}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
