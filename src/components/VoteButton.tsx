import { useMutation } from "@tanstack/react-query";
import { MouseEvent, useState } from "react";

const VoteButton = ({ vote, id }: { vote: number; id: string }) => {
  const [voteCount, setVoteCount] = useState(vote);
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: ({
      id,
      action,
    }: {
      id: string;
      action: "increment" | "decrement";
    }) =>
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/${
          action === "increment" ? "incrementVote" : "decrementVote"
        }`,
        {
          method: "POST",
          body: JSON.stringify({ id }),
        }
      ),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: async (data) => {
      const json = await data.json();
      setVoteCount(json.vote);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const incrementVote = (e: MouseEvent<HTMLButtonElement>) => {
    mutation.mutate({ id, action: "increment" });
  };

  const decrementVote = async (e: MouseEvent<HTMLButtonElement>) => {
    if (voteCount === 0) {
      return;
    }
    mutation.mutate({ id, action: "decrement" });
  };

  return (
    <div className="flex h-fit w-fit flex-row-reverse items-center justify-between gap-5 rounded-lg bg-veryLightGray py-2 px-4 font-bold md:flex-col md:gap-1">
      <button
        onClick={incrementVote}
        className="text-left text-2xl text-lightGrayishBlue disabled:cursor-not-allowed md:text-center"
        disabled={isLoading}
      >
        +
      </button>
      <span className="text-lg text-moderateBlue">
        {isLoading ? "..." : voteCount}
      </span>
      <button
        onClick={decrementVote}
        className="text-right text-2xl text-lightGrayishBlue disabled:cursor-not-allowed md:text-center"
        disabled={isLoading}
      >
        -
      </button>
    </div>
  );
};

export default VoteButton;
