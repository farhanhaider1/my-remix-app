import {
  Link,
  redirect,
  useLoaderData,
  useMatches,
  useTransition,
} from "remix";

import { getPosts } from "~/post";
import { usrId } from "~/utils/session.server";

export let loader = async ({ request }) => {
  const cookieSession = await usrId.getSession(request.headers.get("Cookie"));
  const id = cookieSession.get("userId");
  // if (!id) {
  //   console.log("no id");
  //   return redirect("/login");
  // }
  console.log(id);
  return getPosts(request);
};

export default function Posts() {
  let posts = useLoaderData();

  return (
    <div>
      <h1>Posts!</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
