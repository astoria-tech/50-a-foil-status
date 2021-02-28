import React, { useState } from "react";
import { useAsync } from "react-async";
import FoiaList from "./components/FoiaList";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveTreeMap } from "@nivo/treemap";
import { DateTime } from "luxon";
import HamburgerMenu from "react-hamburger-menu";
import Drawer from "./components/Toolbar/Drawer/Drawer";
import "normalize.css";
import "astoria-tech-design";
import "./styles.css";

async function getMuckrockData() {
  // When in production, the API is at the same domain as the frontend
  let latest;
  if (process.env.REACT_APP_DEPLOYMENT_MODE === "production") {
    latest = "/v1/latest";
  } else {
    latest = "http://localhost:3001/v1/latest";
  }

  return await fetch(latest)
    .then((response) => (response.ok ? response : Promise.reject(response)))
    .then((response) => response.json());
}

function App() {
  const { data, error, isLoading } = useAsync({ promiseFn: getMuckrockData });
  const [menuOpen, setMenuOpen] = useState(false);
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
      <header>
        <div
          className={
            menuOpen
              ? "hamburger_menu_container open"
              : "hamburger_menu_container"
          }
        >
          <HamburgerMenu
            isOpen={menuOpen}
            menuClicked={() =>
              setMenuOpen((prev) => {
                return !prev;
              })
            }
            width={30}
            height={15}
            strokeWidth={2}
            rotate={0}
            color="black"
            borderRadius={0}
            animationDuration={0.1}
          />
        </div>
        <h1>
          <svg
            className="torch-icon"
            fill="none"
            viewBox="0 0 71 150"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#000">
              <path d="m33 0v14.0625h4.6875v-4.6875h4.6875v-4.6875h4.6875v9.375h4.6875v9.375h4.6875v4.6875h4.6875v4.6875h4.6875v14.0625h-4.6875v4.6875h-4.6875v4.6875h-9.375c0-1.4063 0-2.9063 0-4.6875h4.6875v-14.0625h-4.6875v-4.6875h-4.6875v-4.6875c-1.5938 0-3.0937 0-4.6875 0v4.6875h-4.6875v-4.6875h-4.6875v-4.6875h-4.6875v14.0625h-4.6875v14.0625h4.6875v4.6875h-9.375v-4.6875h-4.6875v-4.6875h-4.6875v-18.75h4.6875v-9.375h4.6875v-4.6875h4.6875v-4.6875h4.6875v-4.6875h4.6875v-4.6875z" />
              <path d="m42.375 145.312v4.407h-.2812-13.7813v-4.407h-4.6875v-56.2495h-4.6875v-4.6875h-4.6875v-4.6875h-4.6875v-4.6875h-9.375c0-4.6875 0-9.375 0-14.0625h70.3125v14.0625h-9.375v4.6875h-4.6875v-4.6875h-4.6875c-1.5 0-3.0469 0-4.6875 0v4.6875h-4.6875v4.6875h-4.6875c-.4219 10.4063-.2344 58.359 0 60.937zm4.6875-79.687h-4.6875v4.6875h4.6875zm9.375 0h-4.6875v4.6875h4.6875zm9.375 0h-4.6875v4.6875h4.6875z" />
              <path d="m56.4375 79.6875v4.6875h-4.6875v4.6875h-4.6875v56.2495h-4.6875v-60.937h4.6875v-4.6875z" />
              <path d="m33 42.1875v9.375h-4.6875v-9.375z" />
              <path d="m37.6875 42.1875h4.6875v9.375h-4.6875z" />
              <path d="m33 42.1875v-4.6875h4.6875v4.6875z" />
            </g>
          </svg>
          <span>Tracking Officer Misconduct and Disciplinary Materials</span>
        </h1>
        <Drawer open={menuOpen} closeMenu={()=> setMenuOpen(false)}/>
      </header>
      <main>
        <p>
          Visualizing the process of requesting Freedom of Information Law
          Requests from New York State Police Departments
        </p>
        <h2>Explore the data</h2>
        <h3>Status of Requests</h3>
        <div className="graph graph--tree-map">
          <ResponsiveTreeMap
            data={statusGraphData()}
            identity="name"
            value="loc"
            valueFormat=".02s"
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            labelSkipSize={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.2]] }}
            parentLabelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            borderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
          />
        </div>
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
        <h2>Links and References</h2>
        <ul>
          <li>All Requests</li>
          <li>Materials and Articles</li>
          <li>Github for this project</li>
          <li>FOIL Requests in New York State</li>
        </ul>
        <FoiaList data={data} />
      </main>
      <footer>
        <p className="copyright">
          <small>
            <a href="https://astoria.digital">© Astoria Digital 2021</a>
          </small>
        </p>
      </footer>
    </>
  );
}

export default App;
