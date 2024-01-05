import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  //  const [data, loading, error] = customReactQuery("/api/products")

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // without > then
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get("/api/products?search=" + search, {
          signal: controller.signal,
        });
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        if (axios.isCancel(error)) {
          console.log("Request Canceled ::", error.message);
          return;
        }
      }
    })();
    // Cleanup Code For memoery
    return () => {
      controller.abort();
    };
  }, [search]);

  // if (loading) {
  //   return <h1>Loading data ...</h1>;
  // }
  // if (error) {
  //   return <h1>Something went wrong</h1>;
  // }

  return (
    <>
      <input
        type="text"
        placeholder="Search...."
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      <h1>Axios fetching Data </h1>
      {loading && <h1> Loading....</h1>}
      {error && <h1>Something went Wrong</h1>}
      <h2>Number Of products {data.length} </h2>
    </>
  );
}

export default App;

// Creating Custom React querry
// const customReactQuery = (urlPath) => {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     // without > then
//     (async () => {
//       try {
//         setLoading(true);
//         setError(false);
//         const response = await axios.get(urlPath);
//         setData(response.data);
//         console.log(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//         console.log(error);
//       }
//     })();
//   }, []);

//   return [data, loading, error];
// };
