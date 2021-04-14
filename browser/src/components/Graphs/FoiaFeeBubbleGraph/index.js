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
      id: item.jurisdiction.jurisdictionName,
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
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          padding={6}
          colorBy='id'
          labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.5 ] ] }}
          animate={false}
          isZoomable={false}
          motionStiffness={50}
          motionDamping={30}
          leavesOnly={true}
          enableLabel={true}
          colors={{ scheme: 'pastel1' }}
          tooltipFormat={value =>
            new Intl.NumberFormat(navigator.language, {style: "currency", currency: "USD"}).format(value)
          }
          labelSkipRadius={24}
        />
      </div>
    </div>
  );
};

export default FoiaFeeBubbleGraph;