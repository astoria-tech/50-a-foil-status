import React, { useState, useEffect } from "react";

const FoiaList = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/v1/latest")
      .then((data) => data.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return data ? (
    <p>Data length: {data && data.foiaList.length}</p>
  ) : (
    <p>No data.</p>
  );
};

export default FoiaList;
