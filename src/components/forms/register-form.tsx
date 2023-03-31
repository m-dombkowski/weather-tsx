import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { passwordStrength } from "check-password-strength";
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
  const [passStrengthCheck, setPassStrengthCheck] = useState<boolean>(false);

  const emailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    floatingLabels(event, ".register-form__email-input-label");
  };

  const passOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    floatingLabels(event, ".register-form__pass-input-label");

    switch (passwordStrength(event.target.value).value) {
      case "Too weak":
        console.log("za slabe");
        console.log(passwordStrength(event.target.value));
        break;
      case "Weak":
        console.log("slabe");
        console.log(passwordStrength(event.target.value));
        break;
      case "Medium":
        console.log("sredniawka");
        console.log(passwordStrength(event.target.value));
        break;
      case "Strong":
        console.log("dobre");
        console.log(passwordStrength(event.target.value));
        break;
      default:
        console.log("default");
        break;
    }
  };

  const onSubmit = () => {
    // console.log(watch("email"));
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container register-form_email-container">
          <input
            className="register-form__email-input"
            {...register("email", {
              pattern:
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            })}
            type="email"
            onChange={emailOnChange}
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
              minLength: 8,
            })}
            type="password"
            onChange={passOnChange}
          />
          <span className="register-form__pass-input-label">Password</span>
        </div>
        {!passStrengthCheck && <div className="pass-str-check-container"></div>}
        {errors.email && <span>Wrong email format</span>}
        {errors.password && (
          <span>Passwords needs to have more than 8 characters</span>
        )}
        <input type="submit" />
      </form>
    </div>
  );
};

export default RegisterForm;
