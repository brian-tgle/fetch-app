import { useEffect, useState } from "react";
import Header from "../components/business/Header";

const Simple = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        setData([]);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <ul>
        {data?.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </>
  );
};

export default Simple;
