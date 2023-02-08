import Header from "../components/business/Header";
import useFetchWithIndexedDb from "../hooks/useFetchWithIndexedDb";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const HomePage = () => {
  const { data, error, isLoading } = useFetchWithIndexedDb<Post[]>(
    "http://jsonplaceholder.typicode.com/posts"
  );

  if (error) return <p>There is an error.</p>;
  if (!data && isLoading) return <p>Loading...</p>;
  return (
    <>
      <Header />
      <ul>
        {data?.map(({ id, title }: Post) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
