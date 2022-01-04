import { Link, useLoaderData, redirect } from "remix";

import { getPosts } from "~/post";
import { auth } from "~/utils/db.server";

export let loader = async ({ request }) => {
  return getPosts(request);
};

export default function Posts() {
  let posts = useLoaderData();

  return (
    <div>
      <h1>Posts</h1>

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
