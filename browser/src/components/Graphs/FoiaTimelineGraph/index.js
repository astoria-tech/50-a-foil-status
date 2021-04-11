import React from "react";
import { TurnaroundTime } from "../../../utils/TurnaroundTime";
import { ResponsiveBar } from "@nivo/bar";


const FoiaTimelineGraph = (props) => {
  const turnaroundAggregate = TurnaroundTime.all.reduce((acc, time) => {
    return acc.set(time, 0);
  }, new Map());

  props.data.foiaList.forEach((item) => {
    const turnaround = TurnaroundTime.parse(item.foiaReq.datetime_submitted, item.foiaReq.datetime_done);

    turnaroundAggregate.set(turnaround, turnaroundAggregate.get(turnaround) + 1);
  });

  const times = Array.from(turnaroundAggregate).map((time) => {
    return {
      value: time[1],
      id: time[0].shortLabel
    }
  });

  return (
    <div className="timelineGraph">
      <h3>Timeline of the Request Process</h3>
      <p>
        Agencies have five days to confirm a FOIL request, but are not held to
        any timeline for how long it takes them to complete the request.
      </p>
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
    </div>
  );
};

export default FoiaTimelineGraph;