import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import FoiaStatus from '../../../utils/FoiaStatus';


const FoiaStatusPieGraph = (props) => {
  const statusAggregate = FoiaStatus.all.reduce((acc, status) => {
    return acc.set(status, 0);
  }, new Map());

  props.data.foiaList.forEach((item) => {
    const status = FoiaStatus.parse(item.foiaReq.status);

    statusAggregate.set(status, statusAggregate.get(status) + 1);
  });

  const statuses = Array.from(statusAggregate).filter(status => status[1] > 0).map(status => {
    return {
      id: status[0].value,
      value: status[1],
      label: status[0].label
    }
  });

  return (
    <div className="statusPie">
      <h2 className="headline">Request Status</h2>
      <div className="graph graph--circular">
        <ResponsivePie
          data={statuses}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: 'nivo' }}
          enableRadialLabels={false}
          sortByValue={true}
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
    </div>
  );
};

export default FoiaStatusPieGraph;