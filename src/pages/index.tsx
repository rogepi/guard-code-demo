import { type NextPage } from "next";
import Head from "next/head";
import UserForm from "~/components/userForm";

const Home: NextPage = () => {
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
          <UserForm />
        </div>
      </main>
    </>
  );
};

export default Home;
