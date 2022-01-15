import { signInWithRedirect } from "firebase/auth";
import { useEffect } from "react";
import { Form, useSubmit } from "remix";
import { signInWithGoogleRedirect } from "~/utils/db/db.google";

import { createUserSession } from "~/utils/session.server";

export let action = async ({ request }) => {
  console.log("action");
  let params = new URLSearchParams(await request.text());
  let idToken = params.get("user");

  return createUserSession(idToken, "/posts");
};

export default function GoogleSignIn() {
  const submit = useSubmit();
  useEffect(() => {
    googleSignin();
  }, []);
  async function googleSignin() {
    try {
      const result = await signInWithGoogleRedirect();
      console.log(result);
      //   const user = await getRedirect(result);

      //   submit({ user: user.accessToken }, { method: "post" });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Form method="post"></Form>
    </div>
  );
}
