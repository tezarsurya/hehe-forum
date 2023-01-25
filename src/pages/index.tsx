import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";

const App = () => {
  const { status, data } = useSession();
  return (
    <div className="min-h-screen w-full bg-lightGray">
      {status === "authenticated" ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : status === "loading" ? (
        <h1>Loading....</h1>
      ) : (
        <button onClick={() => signIn("github")}>Sign In With Github</button>
      )}
      {status === "authenticated" && (
        <>
          <h3>{data?.user?.name || ""}</h3>
          {data.user?.image && (
            <Image
              src={data.user?.image}
              alt="user avatar"
              width={24}
              height={24}
              priority
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
