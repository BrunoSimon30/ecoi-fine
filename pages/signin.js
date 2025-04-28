import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";

export default function SignInPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    console.log("chal agaya", { username, password });
    const res = await signIn("credentials", {
        email: username,
        password,
        redirect: false,
      });
    // console.log("res", res);
    // if (res?.error) {
    //   setErrorMessage("Invalid username or password.");
    // } else {
    //   console.log("Successfully signed in");
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        type="text"
        placeholder="Username"
        value={"admin"}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={"password"}
        required
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button type="submit">Sign In</button>
    </form>
  );
}
