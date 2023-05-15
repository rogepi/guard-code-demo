import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useAuthContext } from "~/components/auth-provider";
import { generateCode } from "~/utils";
import CountDown from "~/components/CountDown";

const Code: NextPage = () => {
  const { codeSalt, setCodeSalt } = useAuthContext();
  const minutes = new Date().getUTCSeconds();
  const [counter, setCounter] = React.useState(minutes);
  const [code, setCode] = React.useState(generateCode(codeSalt));

  const handleLogout = () => {
    setCodeSalt("");
    alert("Logged out");
    location.replace("/");
  };

  React.useEffect(() => {
    if (counter === 0) {
      setCode(generateCode(codeSalt));
    }
  }, [counter]);

  return (
    <>
      <Head>
        <title>Guard Code Demo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Guard <span className="text-[hsl(280,100%,70%)]">Code</span> Demo
          </h1>
          <div className="flex items-center text-8xl font-bold text-white xl:text-9xl">
            {code}
            <CountDown counter={counter} setCounter={setCounter} />
          </div>
          <button
            onClick={handleLogout}
            className="rounded-xl bg-purple-500 p-3 px-5 text-white hover:bg-purple-400"
          >
            Log out
          </button>
        </div>
      </main>
    </>
  );
};

export default Code;
