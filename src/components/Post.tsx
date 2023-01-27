const Post = ({ data }: any) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <p>{data.content}</p>
      <p>author: {data.authorName}</p>
    </div>
  );
};

export default Post;
