import { useFetchReplies } from "@/hooks/useFetchReplies";
import { sanityClient } from "@/sanity";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Post from "./Post";
import ReplyContainer from "./ReplyContainer";

const query = `
  *[_type == 'post' && isReply == false] | order(_createdAt desc) {
    _id,
    content,
    vote,
    isReply,
    _createdAt,
    "authorName":author->name,
    "authorEmail":author->email,
    replyTo->{
      _id,
      "author":author->name
    },
    parent->{_id}
  }`;

const PostContainer = () => {
  const [postIDs, setPostIDs] = useState<Array<string>>([]);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const posts = await sanityClient.fetch(query);
      return posts;
    },
    onSuccess(data) {
      let IDs: Array<string> = [];
      data.forEach((post: any) => {
        IDs.push(post._id);
      });
      setPostIDs([...IDs]);
    },
  });
  const replies = useFetchReplies(postIDs);

  if (isLoading) {
    return <div className="grid h-full place-items-center">Loading...</div>;
  }

  if (isError) {
    return <div className="grid h-full place-items-center">Error</div>;
  }

  return (
    <div className="flex h-full flex-col-reverse gap-4 overflow-y-auto">
      {data.map((post: any) => {
        if (post.isReply) {
          return;
        }
        const currentReplies = replies.filter(
          (postFilter: any) => postFilter.parent._id === post._id
        );

        return (
          <div className="post-block" key={post._id}>
            <Post data={post} />
            {currentReplies.length > 0 ? (
              <ReplyContainer>
                {currentReplies.map((filtered: any) => (
                  <Post key={filtered._id} data={filtered} />
                ))}
              </ReplyContainer>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default PostContainer;
