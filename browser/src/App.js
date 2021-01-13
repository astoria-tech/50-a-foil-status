import React from "react";
import { useAsync } from "react-async";
import FoiaList from "./components/FoiaList";
import { Bar } from "@nivo/bar";
import { DateTime } from "luxon";
import "normalize.css";
import "astoria-tech-design";
import "./styles.css";

async function getMuckrockData() {
  // When in production, the API is at the same domain as the frontend
  let latest;
  if (process.env.REACT_APP_DEPLOYMENT_MODE === "production") {
    latest = "/v1/latest";
  } else {
    latest = "http://localhost:3000/v1/latest";
  }

  return await fetch(latest)
    .then((response) => (response.ok ? response : Promise.reject(response)))
    .then((response) => response.json());
}

function App() {
  const { data, error, isLoading } = useAsync({ promiseFn: getMuckrockData });
  if (isLoading) return <p>Loading…</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (!data) return <p>No data</p>;

  const uniquePrices = new Set();
  const turnaroundTimes = new Map();
  turnaroundTimes.set('1–10', 0);
  turnaroundTimes.set('11–30', 0);
  turnaroundTimes.set('31–50', 0);
  turnaroundTimes.set('51–100', 0);
  turnaroundTimes.set('101–150', 0);
  turnaroundTimes.set('151+', 0);

  data.foiaList.forEach((item) => {
    if (item.foiaReq.datetime_done) {
      const start = DateTime.fromISO(item.foiaReq.datetime_submitted);
      const end = DateTime.fromISO(item.foiaReq.datetime_done);
      const diff = Math.floor(end.diff(start, 'days').toObject().days);
      if (diff > 150) {
        const prev = turnaroundTimes.get('151+');
        turnaroundTimes.set('151+', prev + 1);
      }
      else if (diff > 100) {
        const prev = turnaroundTimes.get('101–150');
        turnaroundTimes.set('101–150', prev + 1);
      }
      else if (diff > 50) {
        const prev = turnaroundTimes.get('51–100');
        turnaroundTimes.set('51–100', prev + 1);
      }
      else if (diff > 30) {
        const prev = turnaroundTimes.get('31–50');
        turnaroundTimes.set('31–50', prev + 1);
      }
      else if (diff > 10) {
        const prev = turnaroundTimes.get('11–30');
        turnaroundTimes.set('11–30', prev + 1);
      }
      else {
        const prev = turnaroundTimes.get('1–10');
        turnaroundTimes.set('1–10', prev + 1);
      }
    }
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

  const times = Array.from(turnaroundTimes)
    .map((item) => {
      return {
        value: item[1],
        id: item[0]
      }
    });

  return (
    <div className="App">
      <h2 className="headline__turnaround">Turnaround times</h2>
      <Bar
        width={800}
        height={500}
        data={times}
        isInteractive={false}
        margin={{ top: 0, right: 100, bottom: 50, left: 100 }}
        padding={0.3}
        layout="vertical"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Days to complete',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Amount of requests',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        colors={{ scheme: "nivo" }}
      />
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
