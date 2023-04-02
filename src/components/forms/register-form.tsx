import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { passwordStrength } from "check-password-strength";
import { floatingLabels } from "../../helpers";
import { CSSTransition } from "react-transition-group";
import hideIcon from "../../assets/hide.png";
import showIcon from "../../assets/show.png";
import RegisterError from "./register-error";
import "./register-form.css";

interface FormInputsInterface {
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormInputsInterface>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showError, setShowError] = useState<boolean>(false);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const [passwordCheck, setPasswordCheck] = useState<boolean>(false);
  const nodeRef = useRef(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const emailRegister = register("email", {
    required: {
      value: true,
      message: `Can't leave this field empty`,
    },
    pattern: {
      value:
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      message: "Wrong email format",
    },
  });

  const passRegister = register("password", {
    required: {
      value: true,
      message: `You can't leave that field empty`,
    },
    minLength: {
      value: 6,
      message: "Password needs to have at least 6 characters",
    },
  });

  const fillingBaseClass = "pass-str-check-container-filling";

  const emailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowError(false);
    floatingLabels(event, ".register-form__email-input-label");
  };

  const passwordOnFocusLose = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setPasswordCheck(false);
    }
    return;
  };

  const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowError(false);
    setValue("password", event.target.value);
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
          fillRef.current.className = `${fillingBaseClass} password-very-weak`;
          break;
        case "Weak":
          fillRef.current.className = `${fillingBaseClass} password-weak`;
          break;
        case "Medium":
          fillRef.current.className = `${fillingBaseClass} password-medium`;
          break;
        case "Strong":
          fillRef.current.className = `${fillingBaseClass} password-strong`;
          break;
        default:
          console.log("default");
          break;
      }
    }
    console.log(errors);
  };

  const togglePassHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const icon = event.target as HTMLImageElement;

    if (passwordRef.current?.getAttribute("type") === "password") {
      passwordRef.current?.setAttribute("type", "text");
      icon.setAttribute("src", `${hideIcon}`);
    } else {
      passwordRef.current?.setAttribute("type", "password");
      icon.setAttribute("src", `${showIcon}`);
    }
  };

  const onSubmit = () => {
    console.log(watch("email"));
  };

  const onError = () => {
    setShowError(true);

    // if (emailRef.current?.value === "") {
    //   setError("email", {
    //     message: `Email input can't be empty`,
    //   });
    // }
    console.log(errors);
  };

  return (
    <>
      <div className="register-form-container">
        <form
          className="register-form"
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
        >
          <div className="input-container register-form_email-container">
            <input
              className="register-form__email-input"
              {...emailRegister}
              type="email"
              onChange={emailOnChange}
              ref={(e) => {
                emailRegister.ref(e);
                emailRef.current = e;
              }}
            />
            <span className="register-form__email-input-label">
              Email address
            </span>
          </div>

          <div className="input-container register-form-pass-container">
            <input
              className="register-form__pass-input"
              {...passRegister}
              type="password"
              onFocus={() => setPasswordCheck(true)}
              autoComplete="off"
              onChange={passwordOnChange}
              onBlur={passwordOnFocusLose}
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
          <input type="submit" value="Submit" />
        </form>
        {showError && <RegisterError errors={errors} />}
      </div>
    </>
  );
};

export default RegisterForm;
