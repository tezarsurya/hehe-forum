import { replyAtom } from "@/lib/jotai/atoms";
import { sanityClient } from "@/sanity";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

const query = `
  *[_type == 'post' && isReply == true && references($IDs)] | order(_createdAt asc) {
    _id,
    content,
    vote,
    isReply,
    _createdAt,
    "authorName":author->name,
    "authorEmail":author->email,
    "authorImage":author->image,
    replyTo->{
      _id,
      "author":author->name
    },
    parent->{_id}
  }`;

export const useFetchReplies = (IDs: Array<string>) => {
  const setReplies = useSetAtom(replyAtom);

  useEffect(() => {
    const fetchReplies = async () => {
      const params = { IDs };
      const result = await sanityClient.fetch(query, params);
      setReplies([...result]);
    };

    if (IDs.length > 0) {
      fetchReplies();
    }
  }, [IDs, setReplies]);
};
