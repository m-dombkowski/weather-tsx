import { FieldError } from "react-hook-form";
import { useEffect, useRef } from "react";

interface RegisterMessageProps {
  errors?: {
    email?: FieldError | undefined;
    password?: FieldError | undefined;
  };
  success?: boolean;
  loginError?: string;
}

const LoginMessage: React.FC<RegisterMessageProps> = ({
  errors,
  success,
  loginError,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      if (
        containerRef.current?.children.length < 2 &&
        containerRef.current?.children.length !== 0
      ) {
        containerRef.current.style.bottom = "-30%";
      } else {
        containerRef.current.style.bottom = "-45%";
      }
    }
  });

  return (
    <div
      ref={containerRef}
      className="flex justify-center flex-col items-center gap absolute transition-all duration-300 gap-5 text-center"
    >
      {errors?.email && (
        <p className="py-3 px-6 rounded-md font-bold bg-[#ff444f] text-[#383838]">
          {errors?.email?.message}
        </p>
      )}

      {errors?.password && (
        <p className="py-3 px-6 rounded-md font-bold bg-[#ff444f] text-[#383838]">
          {errors?.password?.message}
        </p>
      )}

      {success === true && (
        <p className="py-3 px-6 rounded-md font-bold bg-[#077a22]">
          Logged in successfully.
          <br />
          You will be redirected in few seconds...
        </p>
      )}
      {loginError !== "" && loginError != undefined && (
        <p className="py-3 px-6 rounded-md font-bold bg-[#ff444f] text-[#383838]error-message ">
          {loginError}
        </p>
      )}
    </div>
  );
};

export default LoginMessage;
