import { signIn } from "next-auth/react";

const App = () => {
  return (
    <div>
      <button onClick={() => signIn("github")}>Sign In With Github</button>
    </div>
  );
};

export default App;
