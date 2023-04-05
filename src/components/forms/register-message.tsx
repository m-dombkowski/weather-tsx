import { FieldError } from "react-hook-form";
import "./register-message.css";
import { useEffect, useRef } from "react";

interface RegisterMessageProps {
  errors?: {
    email?: FieldError | undefined;
    password?: FieldError | undefined;
  };
  success?: boolean;
  registerError?: string;
}

const RegisterMessage: React.FC<RegisterMessageProps> = ({
  errors,
  success,
  registerError,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(containerRef.current?.children.length);
    if (containerRef.current) {
      if (
        containerRef.current?.children.length < 2 &&
        containerRef.current?.children.length !== 0
      ) {
        containerRef.current.style.bottom = "-35%";
      } else {
        containerRef.current.style.bottom = "-55%";
      }
    }
  });

  return (
    <div ref={containerRef} className="error-message-container">
      {errors?.email && (
        <p className="error-message error-message__email">
          {errors?.email?.message}
        </p>
      )}

      {errors?.password && (
        <p className="error-message error-message__password">
          {errors?.password?.message}
        </p>
      )}

      {success && (
        <p className="registered-message">
          Registered successfully.
          <br />
          You will be redirected in few seconds...
        </p>
      )}
      {registerError && (
        <p className="error-message error-message__password">{registerError}</p>
      )}
    </div>
  );
};

export default RegisterMessage;
