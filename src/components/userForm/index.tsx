import * as React from "react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { api } from "~/utils/api";

type FormType = "login" | "register";

const UserForm = () => {
  const [formType, setFormType] = React.useState<FormType>("login");

  const signUpmutation = api.user.signUp.useMutation();
  const signInByPasswordMutation = api.user.signInByPassword.useMutation({
    mutationKey: ["signInByPasswordMutation"],
  });
  const signInByCodeMutation = api.user.signInByCode.useMutation();

  React.useEffect(() => {
    if (signUpmutation.isSuccess) {
      alert("Sign up success");
      setTimeout(() => {
        setFormType("login");
      }, 1000);
    }
  }, [signUpmutation.isSuccess]);

  return (
    <div className="w-full max-w-xl rounded-xl  bg-purple-800/60 p-10 shadow-lg">
      {formType === "login" ? (
        <div>
          <LoginForm
            signInByPasswordMutation={signInByPasswordMutation}
            signInByCodeMutation={signInByCodeMutation}
          />
          <div className="mt-3 text-center text-lg font-semibold text-white">
            No Account?{" "}
            <button
              className="underline hover:text-purple-500"
              onClick={() => setFormType("register")}
            >
              Sign in
            </button>
          </div>
        </div>
      ) : (
        <div>
          <RegisterForm signUpMutation={signUpmutation} />
          <div className="mt-3 text-center text-lg font-semibold text-white">
            Already have an account?{" "}
            <button
              className="underline hover:text-purple-500"
              onClick={() => setFormType("login")}
            >
              Sign up
            </button>
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default UserForm;
