import React from "react";
import { useAsync } from "react-async";
import FoiaList from "./components/FoiaList";

async function getMuckrockData() {
  return await fetch("http://localhost:3000/v1/latest")
    .then(response => (response.ok ? response : Promise.reject(response)))
    .then(response => response.json());
}

function App() {
  const { data, error, isLoading } = useAsync({ promiseFn: getMuckrockData });
  if (isLoading) return <p>Loading…</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (!data) return <p>No data</p>;

  return (
    <div className="App">
      <FoiaList data={data} />
    </div>
  );
}

export default App;
