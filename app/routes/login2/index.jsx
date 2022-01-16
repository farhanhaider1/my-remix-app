import { async } from "@firebase/util";
import { useEffect } from "react";
import { useFetcher } from "remix";
import {
  getRedRes,
  getUser,
  signInWithFb,
  signInWithFbRed,
  signInWithGoogle,
  signInWithGoogleRedirect,
} from "~/utils/db/db.google";
import { createUserSession } from "~/utils/session.server";

export let action = async ({ request }) => {
  console.log();
  console.log("outlet action");
  console.log();
  const idToken = (await request.formData()).get("accessToken");
  return createUserSession(idToken, "/posts");
};

export default function index() {
  const fetcher = useFetcher();
  const fb = useFetcher();
  async function googleSignIn(params) {
    try {
      const result = await signInWithGoogleRedirect();

      // const user = await getUser(result);

      // fetcher.submit(user, { method: "post", action: "/login2?index" });
    } catch (error) {
      console.error("outlet google auth error", error);
    }
  }
  async function fbSignIn() {
    console.log("fb");
    const result = await signInWithFb();
    console.log(result.user);
    fb.submit(result.user, { method: "post", action: "/login2/fbaction" });
  }
  useEffect(() => {
    async function getRes(params) {
      const result = await getRedRes();
      if (result) {
        console.log("res", result.user);
        fb.submit(result.user, { method: "post", action: "/login2/fbaction" });
      }
    }
    getRes();
  }, []);
  async function fbSignInRed() {
    console.log("fb");
    const result = await signInWithFbRed();
    // console.log(result.user);
    // fb.submit(result.user, { method: "post", action: "/login2/fbaction" });
  }
  return (
    <div>
      <div>
        <fetcher.Form method="post" action="/login2?index"></fetcher.Form>
        <button onClick={googleSignIn}>Sign In with google</button>
      </div>

      <div>
        <br />
        <fb.Form method="post" action="/login2/fbaction"></fb.Form>
        <button onClick={fbSignIn}>Sign In with FB</button>
      </div>
      <div>
        <br />
        <fb.Form method="post" action="/login2/fbaction"></fb.Form>
        <button onClick={fbSignInRed}>Sign In with FB redirect</button>
      </div>
    </div>
  );
}
