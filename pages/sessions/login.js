import { signIn } from "next-auth/react";

const LoginPage = () => {
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: e.target.email.value,
      password: e.target.password.value,
      redirect: false,
    });

    if (result.ok) {
      // Redirect the user to the home page after successful login
      window.location.href = "/";
    } else {
      alert("Error to login, please try again.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginPage;