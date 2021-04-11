import React from "react";
import FoiaList from "../components/FoiaList";
import { ResponsiveBar } from "@nivo/bar";


const Home = (props) => {
  return (
    <main>
      <p>
        Visualizing the process of requesting Freedom of Information Law
        Requests from New York State Police Departments
      </p>
      <h2>Explore the data</h2>
      <h3>Timeline of the Request Process</h3>
      <div className="graph graph--bar">
        <ResponsiveBar
          data={props.times}
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
          data={props.prices}
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
      <FoiaList data={props.data} />
    </main>
  );
};

export default Home;