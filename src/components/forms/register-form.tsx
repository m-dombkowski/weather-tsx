import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { passwordStrength } from "check-password-strength";
import { floatingLabels } from "../../helpers";
import "./register-form.css";
import { CSSTransition } from "react-transition-group";

interface FormInputsInterface {
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputsInterface>();
  const [passStrengthCheck, setPassStrengthCheck] = useState<boolean>(false);
  const fillRef = useRef<HTMLDivElement>(null);
  const [passCheck, setPassCheck] = useState<boolean>(false);
  const nodeRef = useRef(null);

  const emailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    floatingLabels(event, ".register-form__email-input-label");
  };

  const passLoseFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setPassCheck(false);
    }
    return;
  };

  const passOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    floatingLabels(event, ".register-form__pass-input-label");

    if (fillRef.current && event.target.value === "") {
      setPassCheck(false);
      return;
    }

    if (event.target.value.length >= 1) {
      setPassCheck(true);
    }

    if (fillRef.current) {
      switch (passwordStrength(event.target.value).value) {
        case "Too weak":
          fillRef.current.style.width = "25%";
          fillRef.current.style.backgroundColor = "#ff444f";
          break;
        case "Weak":
          fillRef.current.style.width = "50%";
          fillRef.current.style.backgroundColor = "#ffc107";
          break;
        case "Medium":
          fillRef.current.style.width = "75%";
          fillRef.current.style.backgroundColor = "#17a2b8";
          break;
        case "Strong":
          fillRef.current.style.width = "100%";
          fillRef.current.style.backgroundColor = "#28a745";
          break;
        default:
          console.log("default");
          break;
      }
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
              required: true,
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
            onFocus={() => setPassCheck(true)}
            onBlur={passLoseFocus}
          />
          <span className="register-form__pass-input-label">Password</span>
        </div>
        <CSSTransition
          in={passCheck}
          nodeRef={nodeRef}
          classNames="pass-str-check-container"
          timeout={500}
          unmountOnExit
          onEnter={() => setPassCheck(true)}
          onExited={() => setPassCheck(false)}
        >
          <div ref={nodeRef} className="pass-str-check-container">
            <div ref={fillRef} className="pass-str-check-container-filling" />
          </div>
        </CSSTransition>

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
