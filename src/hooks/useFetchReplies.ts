import { sanityClient } from "@/sanity";
import React, { useEffect } from "react";

const query = `
  *[_type == 'post' && isReply == true && references($ids)] | order(_createdAt asc) {
    _id,
    content,
    vote,
    isReply,
    _createdAt,
    author->{
      _id,
      name,
      email
    },
    replyTo->{
      _id,
      "author":author->name
    },
    parent->{_id}
  }`;

export const useFetchReplies = (ids: Array<string>) => {
  const [replies, setReplies] = React.useState<Array<any>>([]);

  const fetchReplies = async (ids: Array<string>) => {
    const params = { ids };
    const result = await sanityClient.fetch(query, params);
    return setReplies([...result]);
  };

  useEffect(() => {
    if (ids.length > 0) {
      fetchReplies(ids);
    }
  }, [ids]);

  return replies;
};
