/* eslint-disable no-useless-escape */
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { floatingLabels } from "../../../utils";

import arrowBackSvg from "../../../assets/arrow-go-back-svgrepo-com.svg";

import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { supabase } from "../../../services/supabase";
import LoginMessage from "./login-message";

interface FormInputsInterface {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
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

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [loggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | undefined>("");
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
  });

  const emailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    floatingLabels(event, ".register-form__email-input-label");
  };

  const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("password", event.target.value);
    floatingLabels(event, ".register-form__pass-input-label");
  };

  const togglePassHandler = () => {
    setTogglePassword((prevState) => !prevState);

    if (passwordRef.current?.getAttribute("type") === "password") {
      passwordRef.current?.setAttribute("type", "text");
    } else {
      passwordRef.current?.setAttribute("type", "password");
    }
  };

  const onSubmit = async () => {
    setLoginError(undefined);

    console.log("loguje");
    if (emailRef.current && passwordRef.current) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(data, error);
      if (error == null) {
        setIsLoggedIn(true);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        setLoginError(error.message);
      }
    }
  };

  const onError = () => {
    console.log("error");
    setLoginError(undefined);
    setIsLoggedIn(false);
  };

  return (
    <div className="register-form-main-container flex rounded-lg shadow-[6px_6px_18px_-2px_rgba(0,0,0,1)]">
      <div className="register-form-container bg-[#171717] rounded-lg relative p-[100px_75px_50px_75px]">
        <Link
          to={"/"}
          className="absolute top-[5%] left-[5%] rounded-[50%] transition-all duration-300 p-1.5 hover:bg-[#5a5a5a]"
        >
          <img src={arrowBackSvg} alt="icon of arrow" />
        </Link>
        <form
          className="register-form"
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
        >
          <div>
            <FontAwesomeIcon size={"3x"} icon={["fas", "door-open"]} />
          </div>
          <h1 className="text-4xl flex flex-col justify-center items-center">
            Welcome Back
          </h1>

          <div className="relative">
            <input
              className="register-form__email-input w-[400px] py-[14px] pl-[46px] pr-[16px] text-lg rounded-md"
              {...emailRegister}
              type="email"
              onChange={emailOnChange}
              ref={(e) => {
                emailRegister.ref(e);
                emailRef.current = e;
              }}
            />
            <div className="absolute inline top-[25%] left-[4%]">
              <FontAwesomeIcon size={"lg"} icon={["fas", "envelope"]} />
            </div>
            <span className="register-form__email-input-label absolute top-[12px] left-[12%] pointer-events-none transition-all duration-500">
              Email address
            </span>
          </div>

          <div className="relative">
            <input
              className="register-form__pass-input w-[400px] py-[14px] pl-[46px] pr-[16px] text-lg rounded-md"
              {...passwordRegister}
              type="password"
              autoComplete="off"
              onChange={passwordOnChange}
              ref={(e) => {
                passwordRegister.ref(e);
                passwordRef.current = e;
              }}
            />
            <div className="absolute inline top-[25%] left-[4%]">
              <FontAwesomeIcon size={"lg"} icon={["fas", "key"]} />
            </div>
            <span className="register-form__pass-input-label absolute top-[12px] left-[12%] pointer-events-none transition-all duration-500">
              Password
            </span>
            <button
              type="button"
              onClick={togglePassHandler}
              className="p-2 rounded-3xl bg-transparent absolute top-[12.5%] right-[2%] transition-all duration-300 hover:bg-[#171717] hover:border-transparent"
            >
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
          <div className="mt-[-20px] flex w-[100%]">
            <Link
              className="text-white underline hover:text-[#c9c9c9] transition-all duration-300"
              to={"/"}
            >
              Forgot password?
            </Link>
          </div>
          <div className="flex w-[100%] justify-between items-center mt-[30px]">
            <input
              className="w-[150px] bg-[#646464] cursor-pointer px-6 py-3 border-0 font-normal transition-all duration-300 rounded-md hover:bg-[#939393]"
              type="submit"
              value="Sign in"
            />
            <Link
              to={"/register"}
              className="login-redirect-button relative w-[180px] h-[48px] text-[#e6e6e6] bg-[#646464] transition-all duration-300 rounded-md hover:bg-[#939393] before:content-['No_account_yet?'] before:text-[#e6e6e6] before:absolute before:flex before:justify-center before:w-[100%] before:top-[10px] before:transition-all before:duration-300 before:pointer-events-none after:content-['Sign_up'] after:text-[#e6e6e6] after:abosulte after:flex after:justify-center after:w-[100%] after:bottom-[-30px] after:opacity-0 after:pointer-events-none after:transition-all after:duration-300 after:absolute hover:after:bottom-[15px] hover:after:opacity-100 hover:before:top-[-30px] hover:before:opacity-0"
            ></Link>
          </div>
          {
            <LoginMessage
              success={loggedIn}
              errors={errors}
              loginError={loginError}
            />
          }
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
