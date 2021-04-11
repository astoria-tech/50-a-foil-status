import React from "react";
import { ResponsiveTreeMap } from "@nivo/treemap";


const Sandbox = (props) => {
  return (
    <main>
      <p>
        In response to the Freedom of Information Law Requests, New York State
        police departments have claimed to have no records (“no documents”) of
        officer misconduct from the past 50 years.
      </p>
      <h2 className="headline__treemap">Statuses</h2>
      <div className="graph">
        <ResponsiveTreeMap
          data={props.treeData}
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
      <p>
        The done status may not mean that the request was successful, Muckrock
        is restarting some requests from the beginning after having previous
        requests rejected. The appealing process means that the initial
        request was rejected and that they are rewriting their argument and a
        copy of the letter must go to the Committe on Open Government. A
        lawsuit status indicates that the process has escalated to the
        courtroom.
      </p>
    </main>
  );
};

export default Sandbox;