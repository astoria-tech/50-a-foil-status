import React from "react";
import { useAsync } from "react-async";
import FoiaList from "./components/FoiaList";
import { Bar } from "@nivo/bar";
import "normalize.css";
import "astoria-tech-design";
import "./styles.css";

async function getMuckrockData() {
  let latest = "/v1/latest";
  process.env.NODE_ENV === "development" &&
    (latest = "http://localhost:3000" + latest);

  return await fetch(latest)
    .then((response) => (response.ok ? response : Promise.reject(response)))
    .then((response) => response.json());
}

function App() {
  const { data, error, isLoading } = useAsync({ promiseFn: getMuckrockData });
  if (isLoading) return <p>Loading…</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (!data) return <p>No data</p>;

  let uniquePrices = new Set();

  data.foiaList.forEach((item) => {
    const price = parseFloat(item.foiaReq.price);
    if (price <= 0) return false;
    uniquePrices.add(price);
  });

  const prices = Array.from(uniquePrices)
    .sort((first, second) => second - first)
    .map((item) => {
      return {
        value: item,
        id: new Intl.NumberFormat(navigator.language, {
          style: "currency",
          currency: "USD",
        }).format(item),
      };
    });

  return (
    <div className="App">
      <h2 className="headline__costs">Range of 50a request costs</h2>
      <Bar
        width={800}
        height={500}
        isInteractive={false}
        margin={{ top: 0, right: 100, bottom: 50, left: 100 }}
        layout="horizontal"
        enableLabel={false}
        data={prices}
      />
      <FoiaList data={data} />
    </div>
  );
}

export default App;
