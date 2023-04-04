import { FieldError } from "react-hook-form";
import "./register-error.css";

interface RegisterErrorProps {
  errors?: {
    email?: FieldError | undefined;
    password?: FieldError | undefined;
  };
}

const RegisterError: React.FC<RegisterErrorProps> = ({ errors }) => {
  return (
    <div className="error-message-container">
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
    </div>
  );
};

export default RegisterError;
