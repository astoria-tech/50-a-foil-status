import React from "react";
import { useAsync } from "react-async";
import FoiaList from "./components/FoiaList";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveTreeMap } from "@nivo/treemap";
import { DateTime } from "luxon";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
      <Header />
      <main>
        <p>
          Visualizing the process of requesting Freedom of Information Law
          Requests from New York State Police Departments
        </p>
        <h2>Explore the data</h2>
        <p>
          In response to the Freedom of Information Law Requests, New York State
          police departments have claimed to have no records (“no documents”) of
          officer misconduct from the past 50 years.
        </p>
        <p>
          The done status may not mean that the request was successful, Muckrock
          is restarting some requests from the beginning after having previous
          requests rejected. The appealing process means that the initial
          request was rejected and that they are rewriting their argument and a
          copy of the letter must go to the Committe on Open Government. A
          lawsuit status indicates that the process has escalated to the
          courtroom.
        </p>
        <h3>Timeline of the Request Process</h3>
        <div className="graph graph--bar">
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
              legend: "Days to complete",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Amount of requests",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            colors={{ scheme: "nivo" }}
          />
        </div>
        <p>
          Agencies have five days to confirm a FOIL request, but are not held to
          any timeline for how long it takes them to complete the request.
        </p>
        <h3>Fees Charged by agency</h3>
        <div className="graph graph--bar">
          <ResponsiveBar
            isInteractive={false}
            margin={{ top: 0, right: 100, bottom: 50, left: 100 }}
            layout="horizontal"
            enableLabel={false}
            data={prices}
          />
        </div>
        <p>
          Most agencies have not charged fees for their requests and it is not
          clear how the fees are calculated when there is a required payment.
        </p>
        <h2 id="about_these_requests">About These Requests</h2>
        <p>
          In June of 2020, New York’s Governor, Andrew Cuomo signed a bill
          repealing section 50-a of the state’s Civil Rights law that had been
          used to prevent police officer misconduct allegations and
          investiagtions from being subject to freedom of information law
          requests. Muckrock began sending FOIL requests to every police
          department in New York state shortly after, and their site contains
          the documents obtained and provides the data surrounding these
          requests.
        </p>
        <p>
          The team at Astoria Digital is using the data from these request to
          create visualizations to show their process in real time.
        </p>
        <h2 id="links_and_references">Links and References</h2>
        <ul>
          <li><a href="https://www.muckrock.com/foi/list/?projects=778" target="_blank">All Requests</a></li>
          <li><a href="https://www.muckrock.com/project/new-york-officer-misconduct-and-disciplinary-materials-778/" target="_blank">Materials and Articles</a></li>
          <li><a href="https://github.com/astoria-tech/50-a-foil-status" target="_blank">Github for this project</a></li>
          <li><a href="https://foil.astoria.digital/" target="_blank">FOIL Requests in New York State</a></li>
        </ul>
        <FoiaList data={data} />
      </main>
      <Footer />
    </>
  );
}

export default App;
