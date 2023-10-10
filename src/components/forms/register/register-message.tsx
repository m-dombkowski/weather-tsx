import { FieldError } from "react-hook-form";
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
    if (containerRef.current) {
      if (
        containerRef.current?.children.length < 2 &&
        containerRef.current?.children.length !== 0
      ) {
        containerRef.current.style.bottom = "-25%";
      } else {
        containerRef.current.style.bottom = "-40%";
      }
    }
  });

  return (
    <div
      ref={containerRef}
      className="flex justify-center flex-col items-center gap absolute transition-all duration-300 gap-5"
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
          Registered successfully.
          <br />
          You will be redirected in few seconds...
        </p>
      )}
      {registerError !== "" && registerError != undefined && (
        <p className="py-3 px-6 rounded-md font-bold bg-[#ff444f] text-[#383838]error-message ">
          {registerError}
        </p>
      )}
    </div>
  );
};

export default RegisterMessage;
