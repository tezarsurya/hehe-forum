import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

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
            rows={screen.width < 640 ? 2 : 3}
            placeholder="Write something..."
            required
            className="w-full resize-none rounded-md border border-lightGray px-3 py-2 text-sm text-darkBlue outline-none focus:ring-1 focus:ring-grayishBlue md:px-5 md:text-base"
          />
          <div className="flex items-center justify-between pt-4 md:ml-4 md:items-start md:py-0">
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
              className="rounded-lg bg-moderateBlue py-3 px-8 font-bold uppercase text-white outline-none transition-colors duration-100 ease-in hover:bg-lightGrayishBlue"
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
