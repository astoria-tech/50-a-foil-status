import React from "react";
import FoiaStatusTreeGraph from "../components/Graphs/FoiaStatusTreeGraph";


const Sandbox = (props) => {
  return (
    <main>
      <p>
        In response to the Freedom of Information Law Requests, New York State
        police departments have claimed to have no records (“no documents”) of
        officer misconduct from the past 50 years.
      </p>
      <FoiaStatusTreeGraph 
        data = {props.data}
      />
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