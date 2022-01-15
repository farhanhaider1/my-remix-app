import { useLoaderData, useMatches } from "remix";
import { getPost } from "~/post";
import invariant from "tiny-invariant";
import { useEffect } from "react";

const parseBody = (str) => {
  return str.replace(/\n/g, "<br />");
};

export let loader = async ({ params, request }) => {
  invariant(params.slug, "expected params.slug");

  return getPost({ request, slug: params.slug });
};

export default function PostSlug() {
  let post = useLoaderData();

  return (
    <div>
      <h2>{post.title}</h2>
      {/* <div dangerouslySetInnerHTML={{ __html: parseBody(post.body) }} /> */}
      <div>{post.body}</div>
    </div>
  );
}
