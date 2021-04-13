import React from "react";
import FoiaStatusTreeGraph from "../components/Graphs/FoiaStatusTreeGraph";
import FoiaStatusFunnelGraph from "../components/Graphs/FoiaStatusFunnelGraph";
import FoiaStatusPieGraph from "../components/Graphs/FoiaStatusPieGraph";
import FoiaStatusSankeyGraph from "../components/Graphs/FoiaStatusSankeyGraph";
import FoiaFeeBubbleGraph from "../components/Graphs/FoiaFeeBubbleGraph";


const Sandbox = (props) => {
  return (
    <main>
      <FoiaFeeBubbleGraph
        data = {props.data}
      />
      <FoiaStatusPieGraph 
        data = {props.data}
      />
      <FoiaStatusFunnelGraph 
        data = {props.data}
      />
      <FoiaStatusSankeyGraph 
        data = {props.data}
      />
      <FoiaStatusTreeGraph 
        data = {props.data}
      />
    </main>
  );
};

export default Sandbox;