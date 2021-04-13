import React from 'react';
import { ResponsiveBubble } from '@nivo/circle-packing';
import { FoiaStatus } from '../../../utils/FoiaStatus';

const FoiaFeeBubbleGraph = (props) => {
  const paidStatuses = [
    FoiaStatus.Partial,
    FoiaStatus.Lawsuit,
    FoiaStatus.NoDocs,
    FoiaStatus.Done,
    FoiaStatus.Processed,
  ];

  const unpaidStatuses = [
    FoiaStatus.Ack,
    FoiaStatus.Fix,
    FoiaStatus.Appealing,
    FoiaStatus.Abandoned,
    FoiaStatus.Rejected,
    FoiaStatus.Payment,
  ];

  const statusColors = Map([
    [FoiaStatus.Ack.value, "black"],
    [FoiaStatus.Processed.value, "blue"],
    [FoiaStatus.Done.value, "green"],
    [FoiaStatus.Rejected.value, "red"],
    [FoiaStatus.Fix.value, "pink"],
    [FoiaStatus.Payment.value, "yellow"],
    [FoiaStatus.NoDocs.value, "orange"],
    [FoiaStatus.Partial.value, "cyan"],
    [FoiaStatus.Appealing.value, "purple"],
    [FoiaStatus.Lawsuit.value, "pink"],
    [FoiaStatus.Abandoned.value, "gray"],
  ]);

  const feeStatuses = props.data.foiaList.filter(item.foiaReq.price > 0).map((item) => {
    const status = FoiaStatus.parse(item.foiaReq.status);
    return {
      id: item.agency.agencyName,
      color: statusColors.get(status.value),
      value: item.foiaReq.price,
    };
  });

  const fees = {
    id: "total",
    color: "white",
    children: feeStatuses,
  }

  return(
    <div className="feeGraph">
      <h3>Fees Charged by agency</h3>
      <p>
        Most agencies have not charged fees for their requests and it is not
        clear how the fees are calculated when there is a required payment.
      </p>
      <div className="graph">
        <ResponsiveBubble
          root={fees}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          colors={{ scheme: 'nivo' }}
          padding={6}
          labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
          borderWidth={2}
          borderColor={{ from: 'color' }}
          animate={true}
          motionStiffness={90}
          motionDamping={12}
        />
      </div>
    </div>
  );
};