export const handleSubmitError = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Email already used";
    case "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
      return "Api Key not valid, please contact app dev";
    default:
      return "Something went wrong";
  }
};
