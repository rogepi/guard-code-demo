/* eslint-disable @typescript-eslint/no-misused-promises */
import * as React from "react";
import { type api } from "~/utils/api";

interface IRegisterFormProps {
  signUpMutation: ReturnType<typeof api.user.signUp.useMutation>;
}

const RegisterForm = ({ signUpMutation }: IRegisterFormProps) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;
    await signUpMutation.mutateAsync({ username, password });
    if (signUpMutation.isSuccess) {
      setTimeout(() => {
        target.username.value = "";
        target.password.value = "";
      }, 1000);
    }
    if (signUpMutation.isError) {
      alert("Error: " + signUpMutation.error?.message);
    }
  };
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold text-white">Register Form</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="mb-2 block font-bold text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full rounded-lg border border-gray-300 p-2"
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block font-bold text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full rounded-lg border border-gray-300 p-2"
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full rounded-3xl bg-purple-500 px-6 py-2 text-xl font-medium uppercase text-white"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
