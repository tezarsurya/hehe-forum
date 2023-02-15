import { useFetchReplies } from "@/hooks/useFetchReplies";
import {
  countPosts,
  paginationAtom,
  postIDs,
  replyAtom,
} from "@/lib/jotai/atoms";
import { sanityClient } from "@/sanity";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { UIEvent, useState } from "react";
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
    "authorImage":author->image
  }[$from...$to]`;

const countQuery = `count(*[_type == 'post' && isReply == false])`;

const PostContainer = () => {
  const [IDs, setPostIDs] = useAtom(postIDs);
  const [postCount, setPostCount] = useAtom(countPosts);
  const [pagination, setPagination] = useAtom(paginationAtom);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const replies = useAtomValue(replyAtom);
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error, isRefetching } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const params = { from: 0, to: pagination.to };
      const posts = await sanityClient.fetch(query, params);
      const count = await sanityClient.fetch(countQuery);
      return { posts, count };
    },
    onSuccess(data) {
      const { posts, count } = data;
      let IDs: Array<string> = [];
      posts.forEach((post: any) => {
        IDs.push(post._id);
      });

      setPostCount(count);
      setPostIDs([...IDs]);
    },
  });

  useFetchReplies(IDs);

  const handleScroll = async (e: UIEvent<HTMLDivElement>) => {
    const scrollHeight = e.currentTarget.scrollHeight;
    const scrollY = e.currentTarget.scrollTop;
    const elementHeight = e.currentTarget.clientHeight;

    let scrollDiff = scrollHeight - elementHeight + scrollY;

    if (scrollDiff === 0) {
      if (postCount > pagination.to) {
        setIsLoadMore(true);
        const params = { from: pagination.to, to: pagination.to + 7 };
        setPagination((current) => ({
          from: current.to,
          to: current.to + 7,
        }));

        await sanityClient
          .fetch(query, params)
          .then((morePosts) => {
            let IDs: Array<string> = [];
            morePosts.forEach((post: any) => {
              IDs.push(post._id);
            });

            setPostIDs([...IDs]);
            queryClient.setQueryData(["posts"], {
              ...data,
              posts: [...data?.posts, ...morePosts],
            });
          })
          .finally(() => {
            setIsLoadMore(false);
          });
      }
    }
  };

  if (isLoading || isRefetching) {
    return <div className="grid h-full place-items-center">Loading...</div>;
  }

  if (isError) {
    return <div className="grid h-full place-items-center">Error</div>;
  }

  return (
    <div
      onScroll={handleScroll}
      className="flex h-full flex-col-reverse gap-4 overflow-y-auto text-sm md:text-base"
    >
      {data.posts.map((post: any) => {
        const currentReplies = replies.filter(
          (postFilter: any) => postFilter.parent._id === post._id
        );

        return (
          <div className="post-block" key={post._id}>
            <Post data={post} />
            {currentReplies.length > 0 ? (
              <ReplyContainer>
                {currentReplies.map((reply: any) => (
                  <Post key={reply._id} data={reply} />
                ))}
              </ReplyContainer>
            ) : null}
          </div>
        );
      })}
      {isLoadMore ? <div className="w-full text-center">Loading...</div> : null}
    </div>
  );
};

export default PostContainer;
