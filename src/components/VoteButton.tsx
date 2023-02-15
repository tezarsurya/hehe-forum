import { sanityClient } from "@/sanity";
import { MouseEvent, useState } from "react";

const VoteButton = ({ vote, id }: { vote: number; id: string }) => {
  const [voteCount, setVoteCount] = useState(vote);
  const [isLoading, setIsLoading] = useState(false);

  // const incrementVote = async (e: MouseEvent<HTMLButtonElement>) => {
  //   setIsLoading(true);
  //   await sanityClient
  //     .patch(id)
  //     .inc({ vote: 1 })
  //     .commit()
  //     .finally(() => {
  //       setIsLoading(false);
  //       setVoteCount((current) => current + 1);
  //     });
  // };

  // const decrementVote = async (e: MouseEvent<HTMLButtonElement>) => {
  //   if (voteCount == 0) {
  //     return;
  //   }

  //   setIsLoading(true);
  //   await sanityClient
  //     .patch(id)
  //     .dec({ vote: 1 })
  //     .commit()
  //     .finally(() => {
  //       setIsLoading(false);
  //       setVoteCount((current) => current + 1);
  //     });
  // };

  return (
    <div className="flex h-fit w-fit items-center justify-between gap-5 rounded-lg bg-veryLightGray py-2 px-4 font-bold md:flex-col md:gap-1">
      <button className="text-left text-2xl text-lightGrayishBlue md:text-center">
        +
      </button>
      <span className="text-lg text-moderateBlue">
        {isLoading ? "..." : voteCount}
      </span>
      <button className="text-right text-2xl text-lightGrayishBlue md:text-center">
        -
      </button>
    </div>
  );
};

export default VoteButton;
