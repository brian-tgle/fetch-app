import Header from "../components/business/Header";
import useFetchWithObject from "../hooks/useFetchWithObject";
import useToggle from "../hooks/useToggle";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts = () => {
  const { data, error, isLoading } = useFetchWithObject<Post[]>(
    "http://jsonplaceholder.typicode.com/posts"
  );
  if (error) return <p>There is an error.</p>;
  if (!data && isLoading) return <p>Loading...</p>;
  return (
    <ul>
      {data?.map(({ id, title }: Post) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
};
const PostsPage = () => {
  const { isExpanded, toggle } = useToggle();

  return (
    <>
      <Header />
      <div>
        <button onClick={toggle}>{isExpanded ? "hide" : "show"}</button>
        {isExpanded && <Posts />}
      </div>
    </>
  );
};

export default PostsPage;
