import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

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

const UserInput = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const rawData = new FormData(e.currentTarget);
    const data = {
      content: rawData.get("content"),
    };
    e.preventDefault();
    e.currentTarget.reset();
    setIsLoading(true);

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/createPost`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    )
      .then(async (res) => {
        await queryClient.invalidateQueries({
          queryKey: ["posts"],
          refetchType: "all",
        });

        return res;
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (!result.ok) {
      alert(result.status);
      return;
    }
  };

  return (
    <div className="grid rounded-lg bg-white p-6 shadow-md md:grid-cols-12">
      <div className="col-span-1 hidden justify-start md:grid">
        {data?.user?.image ? (
          <Image
            src={data.user.image}
            alt="user avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : null}
      </div>
      <div className="col-span-11">
        <form onSubmit={handleSubmit} className="grid grid-rows-2 md:flex">
          <textarea
            name="content"
            rows={3}
            cols={30}
            placeholder="Write something..."
            required
            className="w-full resize-none rounded-md border border-lightGray px-5 py-2 outline-none focus:ring-1 focus:ring-grayishBlue"
          />
          <div className="flex items-center justify-between md:ml-4 md:items-start">
            {data?.user?.image ? (
              <Image
                src={data.user.image}
                alt="user avatar"
                width={40}
                height={40}
                className="rounded-full md:hidden"
              />
            ) : null}
            <button
              type="submit"
              className="rounded-lg bg-moderateBlue py-3 px-8 text-lg font-bold uppercase text-white outline-none transition-colors duration-100 ease-in hover:bg-lightGrayishBlue md:text-base"
            >
              {isLoading ? "loading..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInput;
