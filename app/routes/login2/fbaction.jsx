import { createUserSession } from "~/utils/session.server";

export let action = async ({ request }) => {
  console.log();
  console.log("fb action");
  console.log();
  const idToken = (await request.formData()).get("accessToken");
  return createUserSession(idToken, "/posts");
};
