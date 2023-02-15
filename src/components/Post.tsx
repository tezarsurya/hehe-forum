import moment from "moment";
import VoteButton from "./VoteButton";
import Image from "next/image";
import ReplyButton from "./ReplyButton";

const Post = ({ data }: any) => {
  return (
    <div className="flex gap-5 rounded-lg bg-white p-6 shadow-sm">
      <div className="hidden items-start justify-center md:flex">
        <VoteButton vote={data.vote} id={data._id} />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={data.authorImage}
              alt="user avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-bold text-darkBlue">{data.authorName}</span>
            <span className="text-grayishBlue">
              {moment(data._createdAt).fromNow()}
            </span>
          </div>
          <span className="hidden md:block">
            <ReplyButton />
          </span>
        </div>
        <p className="whitespace-pre-wrap text-darkBlue">{data.content}</p>
        <div className="flex items-center justify-between md:hidden">
          <VoteButton vote={data.vote} id={data._id} />
          <ReplyButton />
        </div>
      </div>
    </div>
  );
};

export default Post;
