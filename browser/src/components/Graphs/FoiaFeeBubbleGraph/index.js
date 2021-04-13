import React from 'react';
import { ResponsiveBubble } from '@nivo/circle-packing';
import { FoiaStatus } from '../../../utils/FoiaStatus';

const FoiaFeeBubbleGraph = (props) => {
  const paidStatuses = [
    FoiaStatus.Partial,
    FoiaStatus.Lawsuit,
    FoiaStatus.NoDocs,
    FoiaStatus.Done,
    FoiaStatus.Fix,
    FoiaStatus.Rejected,
  ];

  const unpaidStatuses = [
    FoiaStatus.Ack,
    FoiaStatus.Processed,
    FoiaStatus.Appealing,
    FoiaStatus.Abandoned,
    FoiaStatus.Payment,
  ];

  const feeStatuses = props.data.foiaList.filter((item) => item.foiaReq.price > 0).map((item) => {
    const status = FoiaStatus.parse(item.foiaReq.status);
    return {
      id: item.agency.agencyName,
      paid: paidStatuses.find((foiaStatus) => status.value === foiaStatus.value) ? 'paid': 'unpaid',
      value: item.foiaReq.price,
    };
  }).sort((a, b) => { 
    // In order to get the colors right, all the unpaid elements have to be sorted first
    // This ensures that similar sized fee requests get different colors since they're processed iteratively
    if (a.paid === 'unpaid' && b.paid === 'paid') return -1;
    else if (a.paid === 'paid' && b.paid === 'unpaid') return 1;
    else return 0;
  });

  const fees = {
    id: 'total',
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
          padding={6}
          colorBy='id'
          labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
          borderWidth={2}
          borderColor={{ from: 'color' }}
          animate={true}
          motionStiffness={50}
          motionDamping={30}
          leavesOnly={true}
          enableLabel={false}
          colors={{ scheme: 'pastel1' }}
        />
      </div>
    </div>
  );
};

export default FoiaFeeBubbleGraph;