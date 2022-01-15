import { createCookie, createCookieSessionStorage, redirect } from "remix";

import { getSessionToken, adminAuth } from "~/utils/db/db.server";
import { signOutFirebase } from "./db/db.server";

require("dotenv").config();

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set!");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export const usrId = createCookieSessionStorage({
  cookie: {
    name: "id",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

async function createUserSession(idToken, redirectTo) {
  const token = await getSessionToken(idToken);
  const session = await storage.getSession();
  const usrSession = await usrId.getSession();
  usrSession.set("userId", "1234");
  session.set("token", token);
  let headers = new Headers();
  headers.append("Set-Cookie", await storage.commitSession(session));
  headers.append("Set-Cookie", await usrId.commitSession(usrSession));

  // headers.append("Set-Cookie", cookie);
  return redirect(redirectTo, { headers });
  // return redirect(redirectTo, {
  //   headers: {
  //     "Set-Cookie": await storage.commitSession(session),
  //   },
  // });
}

async function getUserSession(request) {
  const cookieSession = await storage.getSession(request.headers.get("Cookie"));
  const token = cookieSession.get("token");
  if (!token) return null;

  try {
    const tokenUser = await adminAuth.verifySessionCookie(token, true);
    return tokenUser;
  } catch (error) {
    return null;
  }
}

async function destroySession(request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const newCookie = await storage.destroySession(session);

  return redirect("/login", { headers: { "Set-Cookie": newCookie } });
}

async function signOut(request) {
  await signOutFirebase();
  return await destroySession(request);
}

export { createUserSession, signOut, getUserSession };
