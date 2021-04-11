import React from "react";
import { useAsync } from "react-async";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { DateTime } from "luxon";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Sandbox from "./pages/Sandbox";
import getMuckrockData from "./utils/getMuckrockData";
import "normalize.css";
import "./astoria-tech-design.css";
import "./styles.css";


function App() {
  const { data, error, isLoading } = useAsync({ promiseFn: getMuckrockData });
  if (isLoading) return <p>Loading…</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (!data) return <p>No data</p>;

  const uniquePrices = new Set();
  const turnaroundTimes = new Map();
  turnaroundTimes.set("1–10", 0);
  turnaroundTimes.set("11–30", 0);
  turnaroundTimes.set("31–50", 0);
  turnaroundTimes.set("51–100", 0);
  turnaroundTimes.set("101–150", 0);
  turnaroundTimes.set("151+", 0);

  data.foiaList.forEach((item) => {
    if (item.foiaReq.datetime_done) {
      const start = DateTime.fromISO(item.foiaReq.datetime_submitted);
      const end = DateTime.fromISO(item.foiaReq.datetime_done);
      const diff = Math.floor(end.diff(start, "days").toObject().days);
      if (diff > 150) {
        const prev = turnaroundTimes.get("151+");
        turnaroundTimes.set("151+", prev + 1);
      } else if (diff > 100) {
        const prev = turnaroundTimes.get("101–150");
        turnaroundTimes.set("101–150", prev + 1);
      } else if (diff > 50) {
        const prev = turnaroundTimes.get("51–100");
        turnaroundTimes.set("51–100", prev + 1);
      } else if (diff > 30) {
        const prev = turnaroundTimes.get("31–50");
        turnaroundTimes.set("31–50", prev + 1);
      } else if (diff > 10) {
        const prev = turnaroundTimes.get("11–30");
        turnaroundTimes.set("11–30", prev + 1);
      } else {
        const prev = turnaroundTimes.get("1–10");
        turnaroundTimes.set("1–10", prev + 1);
      }
    }
    const price = parseFloat(item.foiaReq.price);
    if (price > 0) uniquePrices.add(price);
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

  const times = Array.from(turnaroundTimes).map((item) => {
    return {
      value: item[1],
      id: item[0],
    };
  });

  // Temporary treemap data.
  // Delete this call and associated file when statusGraphData is done.
  // See file for data structure the graph expects.
  const tmpdata = require("./temp-treemap-data.json");

  const statuses = new Map();
  data.foiaList.forEach((item) => {
    if (statuses.has(item.foiaReq.status)) {
      statuses.set(item.foiaReq.status, statuses.get(item.foiaReq.status) + 1);
    } else {
      statuses.set(item.foiaReq.status, 1);
    }
  });

  const statusGraphData = function statusGraphData() {
    // Sweet math here. Return result when done.
    return tmpdata;
  };

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path = "/sandbox">
            <Sandbox 
              data = {data}
              treeData = {statusGraphData()}
            />
          </Route>
          <Route path = "/">
            <Home 
              data = {data}
              prices = {prices}
              times = {times}
            />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
