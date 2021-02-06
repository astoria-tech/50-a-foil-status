import React from "react";
import { useAsync } from "react-async";
import FoiaList from "./components/FoiaList";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveTreeMap } from "@nivo/treemap";
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

  // Temporary treemap data.
  // Delete this call and associated file when statusGraphData is done.
  // See file for data structure the graph expects.
  const tmpdata = require("./temp-treemap-data.json");

  const statuses = new Map();
  data.foiaList.forEach(item => {
    if (statuses.has(item.foiaReq.status)) {
      statuses.set(item.foiaReq.status, statuses.get(item.foiaReq.status) + 1);
    }
    else {
      statuses.set(item.foiaReq.status, 1);
    }
  });

  const statusGraphData = function statusGraphData() {
    // Sweet math here. Return result when done.
    return tmpdata;
  };

  return (
    <div className="App">
      <h2 className="headline__treemap">Statuses</h2>
      <div className="graph">
        <ResponsiveTreeMap
          data={statusGraphData()}
          identity="name"
          value="loc"
          valueFormat=".02s"
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          labelSkipSize={12}
          labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.2 ] ] }}
          parentLabelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.1 ] ] }}
        />
      </div>
      <h2 className="headline__turnaround">Turnaround times</h2>
      <div className="graph">
        <ResponsiveBar
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
      </div>
      <h2 className="headline__costs">Range of 50a request costs</h2>
      <div className="graph">
        <ResponsiveBar
          isInteractive={false}
          margin={{ top: 0, right: 100, bottom: 50, left: 100 }}
          layout="horizontal"
          enableLabel={false}
          data={prices}
        />
      </div>
      <FoiaList data={data} />
    </div>
  );
}

export default App;
