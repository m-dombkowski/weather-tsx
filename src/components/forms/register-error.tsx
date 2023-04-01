interface Errors {
  email?: string | undefined;
  password?: string | undefined;
}

const RegisterError: React.FC<Errors> = ({ email, password }) => {
  return <div></div>;
};

export default RegisterError;
