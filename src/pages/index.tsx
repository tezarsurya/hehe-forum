import PostContainer from "@/components/PostContainer";
import TransitionLoading from "@/components/TransitionLoading";
import UserInput from "@/components/UserInput";
import Welcome from "@/components/Welcome";
import { useSession } from "next-auth/react";
import Head from "next/head";

const App = () => {
  const { status, data } = useSession();
  return (
    <>
      <Head>
        <title>Hehe forum</title>
      </Head>

      <div className="grid min-h-screen w-full grid-cols-1 bg-veryLightGray">
        {status === "unauthenticated" ? (
          <Welcome />
        ) : status === "loading" ? (
          <TransitionLoading />
        ) : (
          <div className="mx-auto flex h-screen w-full flex-col justify-between gap-2 py-8 px-6 md:w-10/12 md:gap-3 md:px-0 lg:w-6/12 2xl:w-5/12">
            <PostContainer />
            <UserInput />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
