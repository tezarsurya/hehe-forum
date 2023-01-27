import { useSession } from "next-auth/react";
import { FormEvent } from "react";
import Image from "next/image";

const UserInput = () => {
  const { data } = useSession();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            placeholder="Write something..."
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
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInput;
