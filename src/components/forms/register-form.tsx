import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { passwordStrength } from "check-password-strength";
import { floatingLabels } from "../../helpers";
import "./register-form.css";
import { CSSTransition } from "react-transition-group";
import hideIcon from "../../assets/hide.png";
import showIcon from "../../assets/show.png";
import RegisterError from "./register-error";

interface FormInputsInterface {
  email: string;
  password: string;
  showPassword: boolean;
}

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormInputsInterface>();
  const fillRef = useRef<HTMLDivElement>(null);
  const [passwordCheck, setPasswordCheck] = useState<boolean>(false);
  const nodeRef = useRef(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register("password");

  const emailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    floatingLabels(event, ".register-form__email-input-label");
  };

  const passLoseFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setPasswordCheck(false);
    }
    return;
  };

  const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    floatingLabels(event, ".register-form__pass-input-label");

    if (fillRef.current && event.target.value === "") {
      setPasswordCheck(false);
    }

    if (event.target.value.length >= 1) {
      setPasswordCheck(true);
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

  const togglePassHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(passwordRef.current);

    const icon = event.target as HTMLImageElement;

    if (passwordRef.current?.getAttribute("type") === "password") {
      passwordRef.current?.setAttribute("type", "text");
      icon.setAttribute("src", `${hideIcon}`);
    } else {
      passwordRef.current?.setAttribute("type", "password");
      icon.setAttribute("src", `${showIcon}`);
    }
  };

  const onFormSubmit = () => {
    console.log(watch("email"));
  };

  return (
    <>
      <div className="register-form-container">
        <form className="register-form" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="input-container register-form_email-container">
            <input
              className="register-form__email-input"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                onChange: emailOnChange,
              })}
              type="email"
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
              {...rest}
              aria-required={true}
              type="password"
              onFocus={() => setPasswordCheck(true)}
              autoComplete="off"
              minLength={4}
              required={true}
              onChange={passwordOnChange}
              onBlur={passLoseFocus}
              ref={(e) => {
                ref(e);
                passwordRef.current = e;
              }}
            />
            <span className="register-form__pass-input-label">Password</span>
            <button
              type="button"
              onClick={togglePassHandler}
              className="show-hide-button"
            >
              <img className="show-hide-button__icon" src={showIcon} />
            </button>
          </div>
          <CSSTransition
            in={passwordCheck}
            nodeRef={nodeRef}
            classNames="pass-str-check-container"
            timeout={500}
            unmountOnExit
            onEnter={() => setPasswordCheck(true)}
            onExited={() => setPasswordCheck(false)}
          >
            <div ref={nodeRef} className="pass-str-check-container">
              <div ref={fillRef} className="pass-str-check-container-filling" />
            </div>
          </CSSTransition>

          <input type="submit" />
        </form>
        <RegisterError />
      </div>
    </>
  );
};

export default RegisterForm;
