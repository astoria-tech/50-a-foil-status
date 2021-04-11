import React from 'react';
import { ResponsiveFunnel } from '@nivo/funnel';
import { FoiaStatus } from '../../../utils/FoiaStatus';


const FoiaStatusFunnelGraph = (props) => {

  const communicationAggregate = FoiaStatus.all.reduce((acc, status) => {
    return acc.set(status.value, 0);
  }, new Map());

  props.data.foiaList.forEach((item) => {
    const itemStatusSet = new Set();
    itemStatusSet.add(FoiaStatus.Ack);

    // Add status from each communication
    item.foiaReq.communications.forEach((communication) => {
      if (communication.status) {
        itemStatusSet.add(FoiaStatus.parse(communication.status));
      }
    });

    // Add current status
    itemStatusSet.add(FoiaStatus.parse(item.foiaReq.status));
    itemStatusSet.forEach((status) => {
      communicationAggregate.set(status.value, communicationAggregate.get(status.value) + 1);
    });
  });

  const extractAggregateStatusData = (aggregate, status) => {
    const statusCount = aggregate.get(status.value);

    return {
      id: status.value,
      value: statusCount,
      label: status.label
    }
  };

  const happyFunnel = (aggregate) => {
    return [FoiaStatus.Ack, FoiaStatus.Processed, FoiaStatus.Done].map((status) => extractAggregateStatusData(aggregate, status));
  };

  const bumpyFunnel = (aggregate) => {
    return [FoiaStatus.Ack, FoiaStatus.Fix, FoiaStatus.Payment, FoiaStatus.Done].map((status) => extractAggregateStatusData(aggregate, status));
  };

  return (
    <div className="statusFunnel">
      <div className="graph">
        <ResponsiveFunnel
          data={happyFunnel(communicationAggregate)}
          margin={{ top: 10, right: 0, bottom: 50, left: 35 }}
          isInteractive={true}
          padding={0.3}
          borderWidth={20}
          beforeSeparatorLength={100}
          beforeSeparatorOffset={20}
          afterSeparatorLength={100}
          afterSeparatorOffset={20}
          currentPartSizeExtension={10}
          currentBorderWidth={40}
          labelColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          colors={{ scheme: "nivo" }}
        />
      </div>
      <div className="graph">
        <ResponsiveFunnel
          data={bumpyFunnel(communicationAggregate)}
          margin={{ top: 10, right: 0, bottom: 50, left: 35 }}
          isInteractive={true}
          padding={0.3}
          borderWidth={20}
          beforeSeparatorLength={100}
          beforeSeparatorOffset={20}
          afterSeparatorLength={100}
          afterSeparatorOffset={20}
          currentPartSizeExtension={10}
          currentBorderWidth={40}
          labelColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          colors={{ scheme: "nivo" }}
        />
      </div>
    </div>
  );
};

export default FoiaStatusFunnelGraph;