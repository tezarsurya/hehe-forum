const ReplyContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-11 pt-4">
      <div className="col-span-1 grid place-items-center">
        <span className="h-full w-1 bg-lightGray"></span>
      </div>
      <div className="col-span-10 flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default ReplyContainer;
