import React from "react";
import { FeeRange } from "../../../utils/FeeRange";
import { ResponsiveBar } from "@nivo/bar";


const FoiaFeeGraph = (props) => {
  const feeAggregate = FeeRange.all.reduce((acc, range) => {
    return acc.set(range, 0);
  }, new Map());

  props.data.foiaList.forEach((item) => {
    const feeRange = FeeRange.parse(item.foiaReq.price);

    feeAggregate.set(feeRange, feeAggregate.get(feeRange) + 1);
  });

  // We don't want to render no fees on this graph
  feeAggregate.delete(FeeRange.NoFee);

  const fees = Array.from(feeAggregate).map((range) => {
    return {
      value: range[1],
      id: range[0].label
    };
  });

  return (
    <div className="feeGraph">
      <h3>Fees Charged by agency</h3>
      <p>
        Most agencies have not charged fees for their requests and it is not
        clear how the fees are calculated when there is a required payment.
      </p>
      <div className="graph graph--bar">
        <ResponsiveBar
          data={fees}
          isInteractive={false}
          margin={{ top: 10, right: 0, bottom: 50, left: 35 }}
          layout="vertical"
          padding={0.3}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Fee",
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
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          colors={{ scheme: "nivo" }}
        />
      </div>
    </div>
  );
};

export default FoiaFeeGraph;