import { signIn } from "next-auth/react";

const App = () => {
  return (
    <div>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
};

export default App;
