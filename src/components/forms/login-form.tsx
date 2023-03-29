import { useForm, SubmitHandler } from "react-hook-form";

interface FormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = () => {
    console.log(watch("email")); //watch input value by passing the name of it
  };

  return (
    <div>
      {/* handleSubmit will validate your inputs before invoking onSubmit */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="" {...register("email")} type="email" />
        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("password", { required: true })} type="password" />
        {/* errors will return when field validation fails */}
        {errors.password && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default LoginForm;
