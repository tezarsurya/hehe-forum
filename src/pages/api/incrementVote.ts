import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { createClient } from "next-sanity";

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

  const { id } = JSON.parse(req.body);
  const patched = await client
    .patch(id)
    .inc({ vote: 1 })
    .commit()
    .catch((error) => res.status(500).send(error));

  res.send(patched);
  res.end();
}
