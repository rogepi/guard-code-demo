import * as React from "react";
import type { api } from "~/utils/api";
import { useAuthContext } from "../auth-provider";
import { useRouter } from "next/router";

type LoginType = "password" | "code";

interface ILoginFormProps {
  signInByPasswordMutation: ReturnType<
    typeof api.user.signInByPassword.useMutation
  >;
  signInByCodeMutation: ReturnType<typeof api.user.signInByCode.useMutation>;
}

const LoginForm = ({
  signInByPasswordMutation,
  signInByCodeMutation,
}: ILoginFormProps) => {
  const { setCodeSalt } = useAuthContext();

  const [activeTab, setActiveTab] = React.useState<LoginType>("password");

  const handleTabClick = (tab: LoginType) => {
    setActiveTab(tab);
  };

  const router = useRouter();
  const handlePasswordLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;
    await signInByPasswordMutation.mutateAsync({ username, password });
    if (signInByPasswordMutation.isError) {
      alert("Error: " + signInByPasswordMutation.error?.message);
    }
    if (signInByPasswordMutation.isSuccess) {
      setCodeSalt(signInByPasswordMutation.data.codeSalt as string);
      await router.push("/code");
    }
  };

  const handleCodeLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      code: { value: string };
    };
    const username = target.username.value;
    const code = target.code.value;
    await signInByCodeMutation.mutateAsync({ username, code });
    if (signInByCodeMutation.isError) {
      alert("Error: " + signInByCodeMutation.error?.message);
    }
    if (signInByCodeMutation.data?.ok) {
      setCodeSalt(signInByCodeMutation.data.codeSalt as string);
      await router.push("/code");
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold text-white">Login Form</h1>
      <div className="mb-4 flex">
        <button
          className={`rounded-bl-lg rounded-tl-lg px-4 py-2 font-bold uppercase ${
            activeTab === "password"
              ? "bg-purple-500 text-white"
              : "bg-gray-200 text-gray-600"
          } focus:outline-none`}
          onClick={() => handleTabClick("password")}
        >
          Password
        </button>
        <button
          className={`rounded-br-lg rounded-tr-lg px-4 py-2 font-bold uppercase ${
            activeTab === "code"
              ? "bg-purple-500 text-white"
              : "bg-gray-200 text-gray-600"
          } focus:outline-none`}
          onClick={() => handleTabClick("code")}
        >
          Code
        </button>
      </div>
      {activeTab === "password" && (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form className="space-y-6" onSubmit={handlePasswordLogin}>
          <div>
            <label
              htmlFor="username"
              className="mb-2 block font-bold text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full rounded-lg border border-gray-300 p-2"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-bold text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-lg border border-gray-300 p-2"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-3xl bg-purple-500 px-6 py-2 text-xl font-medium uppercase text-white"
            >
              Login
            </button>
          </div>
        </form>
      )}
      {activeTab === "code" && (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form className="space-y-6" onSubmit={handleCodeLogin}>
          <div>
            <label
              htmlFor="username"
              className="mb-2 block font-bold text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full rounded-lg border border-gray-300 p-2"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="code" className="mb-2 block font-bold text-white">
              Code
            </label>
            <input
              type="password"
              id="code"
              name="code"
              className="w-full rounded-lg border border-gray-300 p-2"
              placeholder="Enter Code"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-3xl bg-purple-500 px-6 py-2 text-xl font-medium uppercase text-white"
            >
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
