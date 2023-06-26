import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { passwordStrength } from "check-password-strength";
import { floatingLabels } from "../../../helpers";
import { CSSTransition } from "react-transition-group";
import hideIcon from "../../../assets/hide.png";
import showIcon from "../../../assets/show.png";
import arrowBackSvg from "../../../assets/arrow-go-back-svgrepo-com.svg";
import mountainPhoto from "../../../assets/mountain-near-green-tress-at-night.jpg";
import RegisterMessage from "./register-message";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./register-form.css";
import { auth } from "../../../services/firebase/firebase-auth";
import { handleSubmitError } from "./submit-error";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FormInputsInterface {
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputsInterface>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const fillRef = useRef<HTMLDivElement | null>(null);
  const [passwordCheck, setPasswordCheck] = useState<boolean>(false);
  const nodeRef = useRef(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passStrengthRef = useRef<HTMLParagraphElement | null>(null);
  const isFocused = document.activeElement === passwordRef.current;
  const [loggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string | undefined>("");
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const emailRegister = register("email", {
    required: {
      value: true,
      message: `E-mail field can't be empty`,
    },
    pattern: {
      value:
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      message: "Wrong email format",
    },
  });

  const passwordRegister = register("password", {
    required: {
      value: true,
      message: `Password field can't be empty`,
    },
    minLength: {
      value: 6,
      message: "Password needs to have at least 6 characters",
    },
  });

  const fillingBaseClass = "pass-str-check-container-filling";

  const emailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    floatingLabels(event, ".register-form__email-input-label");
  };

  const passwordOnFocusLose = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setPasswordCheck(false);
    }
    return;
  };

  const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("password", event.target.value);
    floatingLabels(event, ".register-form__pass-input-label");

    if (fillRef.current && event.target.value === "") {
      setPasswordCheck(false);
    }

    if (
      fillRef.current &&
      passStrengthRef.current &&
      isFocused &&
      event.target.value === ""
    ) {
      setPasswordCheck(true);
      fillRef.current.className = `${fillingBaseClass} password-empty`;
      passStrengthRef.current.innerHTML = "";
      return;
    }

    if (event.target.value.length >= 1) {
      setPasswordCheck(true);
    }

    if (fillRef.current && passStrengthRef.current) {
      switch (passwordStrength(event.target.value).value) {
        case "Too weak":
          fillRef.current.className = `${fillingBaseClass} password-very-weak`;
          passStrengthRef.current.innerHTML = "Too weak";
          break;
        case "Weak":
          fillRef.current.className = `${fillingBaseClass} password-weak`;
          passStrengthRef.current.innerHTML = "Could be better";
          break;
        case "Medium":
          fillRef.current.className = `${fillingBaseClass} password-medium`;
          passStrengthRef.current.innerHTML = "Almost there!";
          break;
        case "Strong":
          fillRef.current.className = `${fillingBaseClass} password-strong`;
          passStrengthRef.current.innerHTML = "Your password is amazing!";
          break;
        default:
          break;
      }
    }
  };

  const togglePassHandler = () => {
    setTogglePassword((prevState) => !prevState);

    if (passwordRef.current?.getAttribute("type") === "password") {
      passwordRef.current?.setAttribute("type", "text");
    } else {
      passwordRef.current?.setAttribute("type", "password");
    }
  };

  const onSubmit = () => {
    setRegisterError(undefined);
    setIsLoggedIn(false);
    if (emailRef.current && passwordRef.current) {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          setIsLoggedIn(true);
          const user = userCredential.user;
          setTimeout(() => {
            navigate("/");
          }, 5000);
        })
        .catch((error) => {
          const errorCode = error.code;
          setRegisterError(handleSubmitError(errorCode));
        });
    }
  };

  const onError = () => {
    setIsLoggedIn(false);
    setRegisterError(undefined);
  };

  return (
    <div className="register-form-main-container">
      <div className="register-form__img-container">
        <img
          loading="lazy"
          className="register-form__img"
          src={mountainPhoto}
          alt=""
        />
      </div>
      <div className="register-form-container">
        <Link to={"/"} className="register-form arrow-back-container">
          <img src={arrowBackSvg} alt="icon of arrow" />
        </Link>
        <form
          className="register-form"
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
        >
          <div>
            <FontAwesomeIcon size={"3x"} icon={["fas", "pen-to-square"]} />
          </div>
          <h1 className="register-form-title">
            New here?{" "}
            <span className="register-form-title subtitle">
              No worries{" "}
              <span className="register-form-title subtitle emoji">=)</span>
            </span>
          </h1>

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
            <div className="input-icon">
              <FontAwesomeIcon size={"lg"} icon={["fas", "envelope"]} />
            </div>
            <span className="register-form__email-input-label">
              Email address
            </span>
          </div>

          <div className="input-container register-form_pass-container">
            <input
              className="register-form__pass-input"
              {...passwordRegister}
              type="password"
              onFocus={() => setPasswordCheck(true)}
              autoComplete="off"
              onChange={passwordOnChange}
              onBlur={passwordOnFocusLose}
              ref={(e) => {
                passwordRegister.ref(e);
                passwordRef.current = e;
              }}
            />
            <div className="input-icon">
              <FontAwesomeIcon size={"lg"} icon={["fas", "lock"]} />
            </div>
            <span className="register-form__pass-input-label">Password</span>
            <button
              type="button"
              onClick={togglePassHandler}
              className="show-hide-button"
            >
              {/* <img
                className="show-hide-button__icon"
                src={showIcon}
                alt="eye button for showing/hiding password"
              /> */}
              {togglePassword ? (
                <FontAwesomeIcon
                  size={"lg"}
                  icon={["fas", "eye-slash"]}
                  title="Hide Password"
                />
              ) : (
                <FontAwesomeIcon
                  size={"lg"}
                  icon={["fas", "eye"]}
                  title="Show Password"
                />
              )}
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
              <p
                ref={passStrengthRef}
                className="pass-str-check-filling-description"
              ></p>
            </div>
          </CSSTransition>
          <div className="register-form__bottom-buttons">
            <input className="submit-button" type="submit" value="Submit" />
            <Link to={"/"} className="login-redirect-button"></Link>
          </div>
          {
            <RegisterMessage
              success={loggedIn}
              errors={errors}
              registerError={registerError}
            />
          }
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
