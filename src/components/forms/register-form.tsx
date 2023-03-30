import { useForm, SubmitHandler } from "react-hook-form";
import { floatingLabels } from "../../helpers";
import "./register-form.css";

interface FormInputs {
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const emailLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    floatingLabels(event, ".register-form__email-input-label");
  };

  const passLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    floatingLabels(event, ".register-form__pass-input-label");
    console.log(errors.password);
  };

  const onSubmit = () => {
    console.log(watch("email"));
    // watch input value by passing the name of it
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container register-form_email-container">
          <input
            className="register-form__email-input"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            })}
            type="email"
            onChange={emailLabel}
          />
          <span className="register-form__email-input-label">
            Email address
          </span>
        </div>
        <div className="input-container register-form-pass-container">
          <input
            className={
              !errors.password
                ? "register-form__pass-input valid"
                : "register-form__pass-input"
            }
            {...register("password", {
              required: true,
              minLength: 4,
              maxLength: 16,
            })}
            type="password"
            onChange={passLabel}
          />
          <span className="register-form__pass-input-label">Password</span>
        </div>
        {errors.email && <span>Wrong email format</span>}
        {errors.password && (
          <span>Passwords needs between 4 and 10 characters</span>
        )}
        <input type="submit" />
      </form>
    </div>
  );
};

export default RegisterForm;
