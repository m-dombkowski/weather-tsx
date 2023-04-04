import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { passwordStrength } from "check-password-strength";
import { floatingLabels } from "../../helpers";
import { CSSTransition } from "react-transition-group";
import hideIcon from "../../assets/hide.png";
import showIcon from "../../assets/show.png";
import RegisterMessage from "./register-error";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./register-form.css";
import { auth } from "../../services/firebase/firebase-auth";

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
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const isFocused = document.activeElement === passwordRef.current;
  const [loggedIn, setIsLoggedIn] = useState<boolean>(false);

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
      descRef.current &&
      isFocused &&
      event.target.value === ""
    ) {
      setPasswordCheck(true);
      fillRef.current.className = `${fillingBaseClass} password-empty`;
      descRef.current.innerHTML = "";
      return;
    }

    if (event.target.value.length >= 1) {
      setPasswordCheck(true);
    }

    console.log(isFocused);
    if (fillRef.current && descRef.current) {
      switch (passwordStrength(event.target.value).value) {
        case "Too weak":
          fillRef.current.className = `${fillingBaseClass} password-very-weak`;
          descRef.current.innerHTML = "Your password sucks fam";
          break;
        case "Weak":
          fillRef.current.className = `${fillingBaseClass} password-weak`;
          descRef.current.innerHTML = "Your password could be better";
          break;
        case "Medium":
          fillRef.current.className = `${fillingBaseClass} password-medium`;
          descRef.current.innerHTML = "Your password is ok";
          break;
        case "Strong":
          fillRef.current.className = `${fillingBaseClass} password-strong`;
          descRef.current.innerHTML = "Your password is amazing";
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
    if (emailRef.current && passwordRef.current) {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed in
          setIsLoggedIn(true);
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          // TODO check firebase auth docs for error codes and make some switch
          // to handle "all" possible outcomes and set some error messages for them
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          console.log(error);
        });
    }
  };

  const onError = () => {
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
              <p
                ref={descRef}
                className="pass-str-check-filling-description"
              ></p>
            </div>
          </CSSTransition>
          <input className="submit-button" type="submit" value="Submit" />
          {<RegisterMessage success={loggedIn} errors={errors} />}
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
