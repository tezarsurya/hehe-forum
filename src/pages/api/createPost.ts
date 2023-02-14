import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { createClient } from "next-sanity";

const query = `
  *[_type == 'post' && isReply == false] | order(_createdAt desc) {
    _id,
    content,
    vote,
    isReply,
    _createdAt,
    "authorName":author->name,
    "authorEmail":author->email,
  }`;

const client = createClient({
  projectId: "0i0lc7l1",
  dataset: "production",
  apiVersion: "2021-03-25",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    res.status(400);
  }

  const token = await getToken({ req });
  if (!token) {
    res.status(401);
  }

  const { content } = JSON.parse(req.body);
  const doc = {
    _type: "post",
    author: {
      _type: "reference",
      _ref: token?.sub,
    },
    vote: 0,
    isReply: false,
    content,
  };
  const post = await client.create(doc).catch((err) => res.status(500));

  res.send(post);
  res.end();
}
