import { FieldError } from "react-hook-form";

interface RegisterErrorProps {
  errors?: {
    email?: FieldError | undefined;
    password?: FieldError | undefined;
  };
}

const RegisterError: React.FC<RegisterErrorProps> = ({ errors }) => {
  return (
    <div className="error-message">
      <p className="error-message__email">{errors?.email?.message}</p>
      <p className="error-message__password">{errors?.password?.message}</p>
    </div>
  );
};

export default RegisterError;
