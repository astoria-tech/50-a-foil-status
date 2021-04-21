import React from "react";
import TurnaroundTime from "../../../utils/TurnaroundTime";
import { ResponsiveBar } from "@nivo/bar";
import DonatelloColors from "../../../utils/DonatelloColors";


const FoiaTimelineGraph = (props) => {
  const timelineColors = Array.from({ length: TurnaroundTime.all.length }, (empty, idx) => {
    const ratio = 1.0 * idx / (TurnaroundTime.all.length + 1);
    return DonatelloColors.DeepPurple.lighten(ratio);
  });

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
      id: time[0].shortLabel,
      label: time[0].label,
    }
  });

  return (
    <div className="timelineGraph">
      <h3>Timeline of the Request Process</h3>
      <p>
        Agencies have five days to confirm a FOIL request, but are not held to
        any timeline for how long it takes them to complete the request.
        Since June 2020, only a portion of departments have completed the FOIL process.
      </p>
      <div className="graph graph--bar">
        <ResponsiveBar
          data={times}
          isInteractive={true}
          margin={{ top: 10, right: 0, bottom: 50, left: 35 }}
          padding={0.3}
          layout="vertical"
          colorBy='value'
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Days to Complete",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Requests",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          enableLabel={false}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          colors={timelineColors.reverse().map(color => color.hsl().toString())}
          tooltip={node => (
            <span>
                {node.data.label}: {node.data.value}
            </span>
          )}
        />
      </div>
    </div>
  );
};

export default FoiaTimelineGraph;