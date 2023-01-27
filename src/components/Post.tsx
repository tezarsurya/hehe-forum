const Post = ({ data }: any) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <p>{data.content}</p>
      <p>author: {data.author}</p>
    </div>
  );
};

export default Post;
