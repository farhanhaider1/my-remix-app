import { useEffect } from "react";
import { Form, redirect, useFetcher } from "remix";

import { signOut, getUserSession } from "~/utils/session.server";

// https://remix.run/api/conventions#meta
export let meta = () => {
  return {
    title: "Home",
    description: "Welcome to remix!",
  };
};

export let action = ({ request }) => {
  return signOut(request);
};

export let loader = async ({ request }) => {
  const sessionUser = await getUserSession(request);
  if (!sessionUser) {
    return redirect("/login");
  }

  return null;
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const Loginfetcher = useFetcher();
  useEffect(() => {
    console.log("=============Index=============");
    console.log(Loginfetcher);
    console.log("====================================");
  }, [Loginfetcher]);
  return (
    <div className="remix__page">
      <main>
        <h2>Welcome to Remix Firebase demo</h2>

        <Form method="post">
          <button type="submit">Sign Out</button>
        </Form>
      </main>
    </div>
  );
}
