import { signIn } from "next-auth/react";

const Welcome = () => {
  return (
    <div className="grid min-h-screen w-full place-items-center bg-lightGray md:items-start md:justify-center">
      <div className="grid place-items-center gap-6 md:mt-52">
        <h1 className="text-2xl text-gray-800">Welcome to hehe forum</h1>
        <button
          onClick={() => signIn("github")}
          className="rounded-md bg-moderateBlue/20 px-4 py-2 text-gray-800 outline-none ring ring-moderateBlue transition-all hover:bg-moderateBlue/40 active:translate-y-1"
        >
          Sign in with Github
        </button>
      </div>
    </div>
  );
};

export default Welcome;
