import { Form, Link, useFetcher } from "remix";

import { signIn } from "~/utils/db/db.server";
import { createUserSession } from "~/utils/session.server";
import { signInWithGoogleRedirect } from "~/utils/db/db.google";
import { signInWithRedirect } from "firebase/auth";

export let action = async ({ request }) => {
  console.log("login action");

  let formData = await request.formData();

  let email = formData.get("email");
  let password = formData.get("password");

  const { user } = await signIn(email, password);
  console.log(
    "🚀 ~ file: login.jsx ~ line 13 ~ action ~ user",
    user.emailVerified,
    user.email
  );

  const token = await user.getIdToken();
  return createUserSession(token, "/posts");
};

export default function Login() {
  return (
    <div>
      <div className="login">
        <h1>Login Page</h1>

        <Form method="post">
          <p>
            <label>
              Email
              <input type="email" name="email" />
            </label>
          </p>
          <p>
            <label>
              Password
              <input type="password" name="password" />
            </label>
          </p>

          <button type="submit">Login</button>
        </Form>

        <Link to="/signup">Create Account</Link>
      </div>
      <Link to="/googlesignin">popup</Link>
    </div>
  );
}
