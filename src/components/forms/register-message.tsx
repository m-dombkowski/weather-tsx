import { FieldError } from "react-hook-form";
import "./register-error.css";
import { useEffect, useRef } from "react";

interface RegisterMessageProps {
  errors?: {
    email?: FieldError | undefined;
    password?: FieldError | undefined;
  };
  success?: boolean;
}

const RegisterMessage: React.FC<RegisterMessageProps> = ({
  errors,
  success,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current?.children.length === 1) {
      containerRef.current.style.bottom = "-40%";
    }
  }, []);

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
    </div>
  );
};

export default RegisterMessage;
