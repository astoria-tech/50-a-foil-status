import React from "react";
import { ResponsiveTreeMap } from "@nivo/treemap";


const FoiaStatusTreeGraph = (props) => {
  // Temporary treemap data.
  // Delete this call and associated file when statusGraphData is done.
  // See file for data structure the graph expects.
  const tmpdata = require("./temp-treemap-data.json");

  const statusGraphData = () => {
    // Sweet math here. Return result when done.
    return tmpdata;
  };

  return (
    <div className = "treeMapGraph">
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
    </div>
  );
}

export default FoiaStatusTreeGraph;